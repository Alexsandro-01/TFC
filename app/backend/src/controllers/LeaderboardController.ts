import { Request, Response } from 'express';
import { ILeaderboard } from '../interface/ILeaderBord';

class LeaderboardController {
  constructor(private leaderboardService: ILeaderboard) {}

  public home = async (req: Request, res: Response): Promise<void> => {
    const leaderbord = await this.leaderboardService.home();

    res.status(200).json(leaderbord);
  };
}

export default LeaderboardController;
