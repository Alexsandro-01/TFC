interface IMatchService {
  getAll(): Promise<IMatche[]>
  addNewMatch(newMatchData: ICreateMatche): Promise<ICreateMatche>
  finishMatch(id: IMatche['id']): Promise<void>
}

interface ICreateMatche {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
}
interface IMatche extends ICreateMatche {
  id: number,
  inProgress: boolean,
}

export {
  IMatchService,
  IMatche,
  ICreateMatche,
};
