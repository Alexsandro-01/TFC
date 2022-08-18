import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
import { IUser } from '../interface/IUser';

config();
const SECRET = process.env.JWT_SECRET || 'darkNight';

class Token {
  static makeToken(data: IUser): string {
    const { username, email, role } = data;

    const payload = { data: { username, email, role } };

    const token = sign(payload, SECRET);

    return token;
  }
}

export default Token;
