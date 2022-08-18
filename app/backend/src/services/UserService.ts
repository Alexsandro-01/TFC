import UserModel from '../database/models/Users';
import { IUserService, IUser, Login } from '../interface/IUser';
import Validations from './Validations';
import Token from './Token';

class UserService implements IUserService {
  login = async (data: Login): Promise<string> => {
    await Validations.ValidBodyLogin(data);

    const user: UserModel | null = await UserModel.findOne(
      {
        raw: true, where: { email: data.email },
      },
    );

    const { password } = user as IUser;
    await Validations.ValidPassword(password, data.password);

    const token = Token.makeToken(user as UserModel);
    return token;
  };
}

export default UserService;

// const a = new UserService();
// const b = a.login({ email: 'admin@admin.com', password: 'secret_admin' });
// console.log(b);
// const s = Cript.decript(
//   'secret_admin',
//   '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
// );
// console.log(s);
