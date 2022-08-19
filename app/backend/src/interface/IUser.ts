interface IUserService {
  login(data: Login): Promise<string>
  validateLogin(data: string | undefined): Promise<{ role: string }>
}

interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

interface Login {
  email: string,
  password: string
}

interface tokenData {
  username: string,
  email: string,
  role: string,
}

export {
  IUserService,
  IUser,
  Login,
  tokenData,
};
