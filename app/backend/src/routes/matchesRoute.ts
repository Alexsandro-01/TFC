import { Router } from 'express';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';
import AuthMiddleware from '../middlewares/authMiddleware';
import UserService from '../services/UserService';

const route = Router();

const userService = new UserService();
const authMiddleware = new AuthMiddleware(userService);

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

route.get('/matches', matchesController.getAll);
route.post('/matches', authMiddleware.verifyUser, matchesController.addNewMatch);

export default route;
