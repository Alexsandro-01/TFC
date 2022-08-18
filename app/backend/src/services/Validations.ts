import { IUser } from '../interface/IUser';
import Cript from './Cript';

class Validations {
  static async ValidLogin(user: IUser, reqPassword: string) {
    if (!user) {
      throw new Error('empity user');
    }
    if (!Cript.decript(reqPassword, user.password)) {
      throw new Error('empity user');
    }
  }
}

export default Validations;
