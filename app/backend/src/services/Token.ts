import { config } from 'dotenv';
import { sign, verify } from 'jsonwebtoken';
import { IUser, tokenData } from '../interface/IUser';

config();
const SECRET = process.env.JWT_SECRET || 'jwt_secret';

class Token {
  static makeToken(data: IUser): string {
    const { username, email, role } = data;

    const payload = { data: { username, email, role } };

    const token = sign(payload, SECRET);

    return token;
  }

  static verifyToken(token: string): tokenData {
    const { data }: any = verify(token, SECRET);
    return data as tokenData;
  }
}

export default Token;
