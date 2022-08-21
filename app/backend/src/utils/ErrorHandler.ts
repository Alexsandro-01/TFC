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
}

export default ErrorHandler;
