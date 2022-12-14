import { ILeaderboard, LeaderObj } from '../interface/ILeaderBord';
import { ITeams } from '../interface/ITeams';
import { IMatche } from '../interface/IMatches';

import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

class LeaderboardService implements ILeaderboard {
  private leaderObjModel = (): LeaderObj => {
    const reset: LeaderObj = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '',
    };
    return reset;
  };

  private baseLeaderObj = this.leaderObjModel();

  private getAll = async (): Promise<ITeams[]> => {
    const teams = await Teams.findAll({ raw: true });
    return teams;
  };

  private finishedMatches = async (): Promise<Matches[]> => {
    const response = await Matches.findAll({
      raw: true,
      where: { inProgress: false },
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return response;
  };

  private compareIfHomeTeam = (match: IMatche): void => {
    if (match.homeTeamGoals > match.awayTeamGoals) { // if winner
      this.baseLeaderObj.totalPoints += 3;
      this.baseLeaderObj.totalGames += 1;
      this.baseLeaderObj.totalVictories += 1;
      this.baseLeaderObj.goalsFavor += match.homeTeamGoals;
      this.baseLeaderObj.goalsOwn += match.awayTeamGoals;
    } else if (match.homeTeamGoals < match.awayTeamGoals) { // if loser
      this.baseLeaderObj.totalGames += 1;
      this.baseLeaderObj.totalLosses += 1;
      this.baseLeaderObj.goalsFavor += match.homeTeamGoals;
      this.baseLeaderObj.goalsOwn += match.awayTeamGoals;
    } else { // if drawn
      this.baseLeaderObj.totalPoints += 1;
      this.baseLeaderObj.totalGames += 1;
      this.baseLeaderObj.totalDraws += 1;
      this.baseLeaderObj.goalsFavor += match.homeTeamGoals;
      this.baseLeaderObj.goalsOwn += match.awayTeamGoals;
    }
  };

  private compareIfAwayTeam = (match: IMatche): void => {
    if (match.awayTeamGoals > match.homeTeamGoals) { // if winner
      this.baseLeaderObj.totalPoints += 3;
      this.baseLeaderObj.totalGames += 1;
      this.baseLeaderObj.totalVictories += 1;
      this.baseLeaderObj.goalsFavor += match.awayTeamGoals;
      this.baseLeaderObj.goalsOwn += match.homeTeamGoals;
    } else if (match.awayTeamGoals < match.homeTeamGoals) { // if loser
      this.baseLeaderObj.totalGames += 1;
      this.baseLeaderObj.totalLosses += 1;
      this.baseLeaderObj.goalsFavor += match.awayTeamGoals;
      this.baseLeaderObj.goalsOwn += match.homeTeamGoals;
    } else { // if drawn
      this.baseLeaderObj.totalPoints += 1;
      this.baseLeaderObj.totalGames += 1;
      this.baseLeaderObj.totalDraws += 1;
      this.baseLeaderObj.goalsFavor += match.awayTeamGoals;
      this.baseLeaderObj.goalsOwn += match.homeTeamGoals;
    }
  };

  private multiplyStatus = (): void => {
    const { goalsFavor, goalsOwn, totalPoints, totalGames } = this.baseLeaderObj;
    this.baseLeaderObj.goalsBalance = goalsFavor - goalsOwn;
    const calcEfficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    this.baseLeaderObj.efficiency = calcEfficiency.toString();
  };

  private sortConfig = (a: LeaderObj, b: LeaderObj): number => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    if (a.goalsFavor !== b.goalsFavor) {
      return b.goalsFavor - a.goalsFavor;
    }
    if (a.goalsOwn !== b.goalsOwn) {
      return b.goalsOwn - a.goalsOwn;
    }
    return 0;
  };

  private auxCompareHomeTeam(teamId: ITeams['id'], match: IMatche, teamName: ITeams['teamName']) {
    if (teamId === match.homeTeam) { // se time da casa
      this.compareIfHomeTeam(match); // compara status
      this.baseLeaderObj.name = teamName; // set nome do time
    }
  }

  private auxCompareIfAwayTeam(teamId: ITeams['id'], match: IMatche, teamName: ITeams['teamName']) {
    if (teamId === match.awayTeam) { // se time visitante
      this.compareIfAwayTeam(match); // compara status
      this.baseLeaderObj.name = teamName; // set nome do time
    }
  }

  private filterGame(
    filter: string,
    teamId: ITeams['id'],
    match: IMatche,
    teamName: ITeams['teamName'],
  ) {
    if (filter === 'home') {
      this.auxCompareHomeTeam(teamId, match, teamName);
    }
    if (filter === 'away') {
      this.auxCompareIfAwayTeam(teamId, match, teamName);
    }
    if (filter === 'all') {
      this.auxCompareHomeTeam(teamId, match, teamName);
      this.auxCompareIfAwayTeam(teamId, match, teamName);
    }
  }

  private countStatus = async (filter: string): Promise<LeaderObj[]> => {
    const teams = await this.getAll();
    const matches = await this.finishedMatches();
    let result: LeaderObj[] = [];

    for (let ind = 0; ind < teams.length; ind += 1) {
      for (let index = 0; index < matches.length; index += 1) {
        this.filterGame(filter, teams[ind].id, matches[index], teams[ind].teamName);
      }
      this.multiplyStatus();
      result = [...result, this.baseLeaderObj]; // ad aos results
      this.baseLeaderObj = this.leaderObjModel();
    }
    const sorted = result.sort(this.sortConfig);
    return sorted;
  };

  public home = async (): Promise<LeaderObj[]> => {
    const response = await this.countStatus('home');
    return response;
  };

  public away = async (): Promise<LeaderObj[]> => {
    const response = await this.countStatus('away');
    return response;
  };

  public all = async (): Promise<LeaderObj[]> => {
    const response = await this.countStatus('all');
    return response;
  };
}

export default LeaderboardService;
