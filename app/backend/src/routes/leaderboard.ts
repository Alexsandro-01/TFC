import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const route = Router();

route.get('/leaderboard', leaderboardController.all);
route.get('/leaderboard/home', leaderboardController.home);
route.get('/leaderboard/away', leaderboardController.away);

export default route;
