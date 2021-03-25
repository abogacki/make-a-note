import { NextFunction, Request, Response } from "express";

import HttpException from "src/exceptions/HttpException";

function errorMiddleware(
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  res.setHeader("Content-Type", "application/json");
  res.status(statusCode).send({ error: message });
}

export default errorMiddleware;
