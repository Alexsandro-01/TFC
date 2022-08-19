interface ITeamsService<> {
  getAll(): Promise<ITeams[]>,
  getById(id: number): Promise<ITeams | Record<string, string>>
}

interface ITeams {
  id: number,
  teamName: string
}

export {
  ITeamsService,
  ITeams,
};
