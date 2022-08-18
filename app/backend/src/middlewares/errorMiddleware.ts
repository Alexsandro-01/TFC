import { Request, Response, NextFunction } from 'express';

class ErrorMiddleware {
  static error(erro: Error, req: Request, res: Response, next: NextFunction) {
    const { name, message } = erro;
    const erros: { [erroName: string]: number } = {
      badRequest: 400,
      unauthorized: 401,
    };

    const status = erros[name];

    if (!status) {
      return res.status(500).json({ message });
    }

    res.status(status).json({ message });
    next();
  }
}

export default ErrorMiddleware;
