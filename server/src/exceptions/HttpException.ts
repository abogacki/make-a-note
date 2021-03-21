import { Request, Response, NextFunction, RequestHandler } from "express";

interface IError {
  statusCode: number;
  status: string;
  message: string;
}

class HttpException extends Error implements IError {
  status: string;
  message: string;
  statusCode: number;

  constructor({ statusCode, status, message }: IError) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
  }
}

export const handleErrors = (handler: RequestHandler) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default HttpException;
