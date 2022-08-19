import { Router } from 'express';
import TeamsService from '../services/teamsService';
import TeamsController from '../controllers/TeamsController';

const route = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

route.get('/teams', teamsController.getAll);
route.get('/teams/:id', teamsController.getById);

export default route;
