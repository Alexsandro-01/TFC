import { Request, Response } from 'express';
import UserModel from '../database/models/Users';
// import UserService from '../services/UserService';
import { IUserService } from '../interface/IUser';

class UserController {
  constructor(private userService: IUserService<UserModel>) { }

  login = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const token = await this.userService.login(data);
    res.status(200).json({ token });
  };
}

export default UserController;
