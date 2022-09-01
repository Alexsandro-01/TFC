import { ITeamsService } from '../interface/ITeams';
import ErrorHandler from '../utils/ErrorHandler';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { IMatchService, IMatche, ICreateMatche, UpdateMatch } from '../interface/IMatches';

class MatchesService implements IMatchService {
  constructor(private teamsService: ITeamsService) {}

  getAll = async (): Promise<IMatche[]> => {
    const response = await Matches.findAll({
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

    return response as Matches[];
  };

  addNewMatch = async (newMatchData: ICreateMatche): Promise<IMatche> => {
    const { homeTeam, awayTeam } = newMatchData;
    if (homeTeam === awayTeam) ErrorHandler.equalteams();
    await this.teamsService.getByPK(Number(homeTeam));
    await this.teamsService.getByPK(Number(awayTeam));

    const response = await Matches.create(newMatchData);
    return response;
  };

  finishMatch = async (id: IMatche['id']): Promise<void> => {
    await Matches.update(
      {
        inProgress: false,
      },
      {
        where: {
          id,
        },
      },
    );
  };

  filterTypeMatch = async (trueOrFalse: string | undefined): Promise<IMatche[]> => {
    if (trueOrFalse) {
      const bool = trueOrFalse === 'true';
      return this.getMatches(bool);
    }

    return this.getAll();
  };

  getMatches = async (trueOrFalse: boolean): Promise<IMatche[]> => {
    const inProgressMatches = await Matches.findAll({
      where: { inProgress: trueOrFalse },
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

    return inProgressMatches;
  };

  updateMatch = async (goals: UpdateMatch, id: number): Promise<void> => {
    if (!goals.awayTeamGoals || !goals.homeTeamGoals) ErrorHandler.badRequest();

    await Matches.update(
      goals,
      {
        where: {
          id,
        },
      },
    );
  };
}

export default MatchesService;
