interface IMatchService {
  getAll(): Promise<IMatche[]>
}

interface IMatche {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export {
  IMatchService,
  IMatche,
};
