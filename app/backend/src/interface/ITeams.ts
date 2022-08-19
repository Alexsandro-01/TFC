interface ITeamsService<> {
  getAll(): Promise<ITeams[]>
}

interface ITeams {
  id: number,
  teamName: string
}

export {
  ITeamsService,
  ITeams,
};
