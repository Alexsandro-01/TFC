import { Router } from 'express';
import TeamsService from '../services/teamsService';
import TeamsController from '../controllers/TeamsController';

const router = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

router.get('/teams', teamsController.getAll);

export default router;
