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
}

export default ErrorHandler;
