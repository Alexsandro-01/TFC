import { NextFunction, Response } from 'express';
import IRequest from '../interface/IRequest';
import { IUser, IUserService } from '../interface/IUser';
import Token from '../services/Token';

import ErrorHandler from '../utils/ErrorHandler';

class AuthMiddleware {
  constructor(private userService: IUserService) {}
  public verifyUser = async (
    req: IRequest,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { authorization } = req.headers;

    if (!authorization) ErrorHandler.invalidToken();

    const reqUser = Token.verifyToken(authorization as string);
    const user = await this.userService.findUserByNameAndEmail(reqUser);

    if (!user) ErrorHandler.invalidToken();

    req.user = user as IUser;
    next();
  };
}

export default AuthMiddleware;
