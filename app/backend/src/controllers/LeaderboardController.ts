import { Request, Response } from 'express';
import { ILeaderboard } from '../interface/ILeaderBord';

class LeaderboardController {
  constructor(private leaderboardService: ILeaderboard) {}

  public home = async (req: Request, res: Response): Promise<void> => {
    const leaderbord = await this.leaderboardService.home();

    res.status(200).json(leaderbord);
  };

  public away = async (req: Request, res: Response): Promise<void> => {
    const leaderboard = await this.leaderboardService.away();

    res.status(200).json(leaderboard);
  };

  public all = async (req: Request, res: Response): Promise<void> => {
    const leaderboard = await this.leaderboardService.all();

    res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
