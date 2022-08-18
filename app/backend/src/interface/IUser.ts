interface IUserService<T> {
  login(data: Login): Promise<string>
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

export {
  IUserService,
  IUser,
  Login,
};
