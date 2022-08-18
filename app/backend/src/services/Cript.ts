import { compareSync, hashSync } from 'bcryptjs';

class Cript {
  static decript(password: string, hash: string): boolean {
    const response: boolean = compareSync(password, hash); //  verdade
    return response;
  }

  static encript(password: string): string {
    const response: string = hashSync(password, 5);
    return response;
  }
}

export default Cript;
