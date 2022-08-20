import { Request, Response } from 'express';
import { IMatchService } from '../interface/IMatches';

class MatchesController {
  constructor(private matchesService: IMatchService) { }
  getAll = async (req: Request, res: Response): Promise<void> => {
    const response = await this.matchesService.getAll();
    res.status(200).json(response);
  };
}

export default MatchesController;
