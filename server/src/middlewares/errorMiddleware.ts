import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

function errorMiddleware(
  error: HttpException,
  _request: Request,
  response: Response
) {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  response.status(statusCode).json({
    status,
    statusCode,
    message,
  });
}

export default errorMiddleware;
