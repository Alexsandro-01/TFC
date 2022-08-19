import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post('/login', userController.login);
router.get('/login/validate', userController.validateLogin);

export default router;
