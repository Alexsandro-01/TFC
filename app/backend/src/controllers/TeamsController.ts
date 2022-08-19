import { Request, Response } from 'express';
import { ITeams, ITeamsService } from '../interface/ITeams';

class TeamsController {
  constructor(private teamsService: ITeamsService) { }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const teams: ITeams[] = await this.teamsService.getAll();

    res.status(200).json(teams);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const team = await this.teamsService.getById(Number(id));

    res.status(200).json(team);
  };
}

export default TeamsController;
