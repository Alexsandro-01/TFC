interface ILeaderboard {
  home(): Promise<LeaderObj[]>
}

interface LeaderObj {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

export {
  ILeaderboard,
  LeaderObj,
};
