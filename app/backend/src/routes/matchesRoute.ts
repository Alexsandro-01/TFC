import { Router } from 'express';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';

const route = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

route.get('/matches', matchesController.getAll);

export default route;
