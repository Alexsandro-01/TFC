class ErrorHandler {
  static badRequest() {
    const erro = new Error('All fields must be filled');
    erro.name = 'badRequest';
    throw erro;
  }

  static unauthorized() {
    const erro = new Error('Incorrect email or password');
    erro.name = 'unauthorized';
    throw erro;
  }

  static invalidToken() {
    const erro = new Error('Token must be a valid token');
    erro.name = 'unauthorized';
    throw erro;
  }

  static equalteams() {
    const erro = new Error('It is not possible to create a match with two equal teams');
    erro.name = 'unauthorized';
    throw erro;
  }

  static notFound() {
    const erro = new Error('There is no team with such id!');
    erro.name = 'notFound';
    throw erro;
  }
}

export default ErrorHandler;
