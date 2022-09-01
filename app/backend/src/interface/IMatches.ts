interface IMatchService {
  getAll(): Promise<IMatche[]>
  addNewMatch(newMatchData: ICreateMatche): Promise<ICreateMatche>
  finishMatch(id: IMatche['id']): Promise<void>
  filterTypeMatch(trueOrFalse: string | undefined): Promise<IMatche[]>
  getMatches(trueOrFalse: boolean): Promise<IMatche[]>
  updateMatch(goals: UpdateMatch, id: number): Promise<void>
}

interface UpdateMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface ICreateMatche extends UpdateMatch {
  homeTeam: number,
  awayTeam: number,
}
interface IMatche extends ICreateMatche {
  id: number,
  inProgress: boolean,
}

export {
  IMatchService,
  IMatche,
  ICreateMatche,
  UpdateMatch,
};
