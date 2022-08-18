class ErrorHandler {
  static badRequest() {
    const erro = new Error('All fields must be filled');
    erro.name = 'badRequest';
    throw erro;
  }
}

export default ErrorHandler;
