import { Request, Response } from 'express';
// import UserService from '../services/UserService';
import { IUserService } from '../interface/IUser';

class UserController {
  constructor(private userService: IUserService) { }

  login = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const token = await this.userService.login(data);
    res.status(200).json({ token });
  };

  validateLogin = async (req: Request, res: Response): Promise<void> => {
    const { authorization } = req.headers;
    const userRole = await this.userService.validateLogin(authorization);

    res.status(200).json(userRole);
  };
}

export default UserController;
