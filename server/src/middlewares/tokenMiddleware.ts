import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import HttpException from "src/exceptions/HttpException";
import Note, { INoteDocument } from "src/models/Note";

const tokenMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const { noteId } = req.params;

    if (!noteId) {
      throw new HttpException({
        statusCode: 404,
        status: "error",
        message: "Resource not found",
      });
    }
    if (!token)
      throw new HttpException({
        statusCode: 403,
        status: "error",
        message: "Access denied",
      });

    let data;
    try {
      data = jwt.verify(token, process.env.JWT_SECRET as string);
      if (!data) {
        throw new Error();
      }
    } catch (error) {
      throw new HttpException({
        statusCode: 403,
        status: "error",
        message: "Access denied",
      });
    }

    const note = await Note.findOne({
      _id: (data as INoteDocument)._id,
      tokens: token,
    });

    if (!note) {
      throw new HttpException({
        statusCode: 403,
        status: "error",
        message: "Access denied",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default tokenMiddleware;
