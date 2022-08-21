import { Request, Response } from 'express';
import { IMatchService } from '../interface/IMatches';

class MatchesController {
  constructor(private matchesService: IMatchService) { }
  getAll = async (req: Request, res: Response): Promise<void> => {
    const response = await this.matchesService.getAll();
    res.status(200).json(response);
  };

  addNewMatch = async (req: Request, res: Response): Promise<void> => {
    const newMatchData = req.body;
    const response = await this.matchesService.addNewMatch(newMatchData);

    res.status(201).json(response);
  };
}

export default MatchesController;
