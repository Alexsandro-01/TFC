interface ITeamsService<> {
  getAll(): Promise<ITeams[]>,
  getById(id: number): Promise<ITeams | Record<string, string>>
  getByPK(id: number): Promise<void>
}

interface ITeams {
  id: number,
  teamName: string
}

export {
  ITeamsService,
  ITeams,
};
