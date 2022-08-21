import { Request } from 'express';
import { IUser } from './IUser';

interface IRequest extends Request {
  user?: IUser,
}

export default IRequest;
