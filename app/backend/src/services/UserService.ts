import UserModel from '../database/models/Users';
import { IUserService, IUser, Login, tokenData } from '../interface/IUser';
import Validations from './Validations';
import ErrorHandler from '../utils/ErrorHandler';
import Token from './Token';

class UserService implements IUserService {
  login = async (data: Login): Promise<string> => {
    await Validations.ValidBodyLogin(data);

    const user: UserModel | null = await UserModel.findOne(
      {
        raw: true, where: { email: data.email },
      },
    );

    if (!user) ErrorHandler.unauthorized();

    const { password } = user as IUser;
    await Validations.ValidPassword(password, data.password);

    const token = Token.makeToken(user as UserModel);
    return token;
  };

  validateLogin = async (token: string | undefined): Promise<{ role: string; }> => {
    if (!token) {
      ErrorHandler.unauthorized();
    }

    const reqUser = Token.verifyToken(token as string);
    const user = await UserModel.findOne(
      {
        raw: true, where: { email: reqUser.email, username: reqUser.username },
      },
    );

    if (!user) ErrorHandler.unauthorized();

    const { role } = user as IUser;

    return { role };
  };

  findUserByNameAndEmail = async (reqUser: tokenData): Promise<IUser | null> => {
    const user: IUser | null = await UserModel.findOne(
      {
        raw: true, where: { email: reqUser.email, username: reqUser.username },
      },
    );
    return user;
  };
}

export default UserService;

// const a = new UserService();
// const b = a
//   // eslint-disable-next-line max-len
//   .validateLogin('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2NjA5MzI3MDN9.glE1RikKfGUdMV_XHxX0xXp_A-kZg_Ns-O-LD4D8E9o');
// console.log(b);
// const s = Cript.decript(
//   'secret_admin',
//   '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
// );
// console.log(s);
