import { Router } from 'express';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';
import AuthMiddleware from '../middlewares/authMiddleware';
import UserService from '../services/UserService';
import TeamsService from '../services/teamsService';

const route = Router();

const userService = new UserService();
const authMiddleware = new AuthMiddleware(userService);
const teamsService = new TeamsService();

const matchesService = new MatchesService(teamsService);
const matchesController = new MatchesController(matchesService);

route.get('/matches', matchesController.getAll);
route.post('/matches', authMiddleware.verifyUser, matchesController.addNewMatch);
route.patch('/matches/:id/finish', authMiddleware.verifyUser, matchesController.finishMatch);

export default route;
