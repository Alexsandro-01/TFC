import * as Joi from 'joi';
import { Login } from '../interface/IUser';
import ErrorHandler from '../utils/ErrorHandler';
import Cript from './Cript';

class Validations {
  static async ValidPassword(userPassword: string, reqPassword: string) {
    if (!Cript.decript(reqPassword, userPassword)) {
      throw new Error('empity user');
    }
  }

  static async ValidBodyLogin(data: Login) {
    const schema = Joi.object<Login>({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const result = schema.validate(data);
    if (result.error) {
      ErrorHandler.badRequest();
    }
  }
}

export default Validations;
