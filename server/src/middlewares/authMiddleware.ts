import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HttpException from "src/exceptions/HttpException";
import Note, { INoteDocument } from "src/models/Note";

const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      throw new HttpException({
        statusCode: 401,
        status: "error",
        message: "Not authorized to access this resource",
      });

    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    const note = await Note.findOne({
      _id: (data as INoteDocument)._id,
      "tokens.token": token,
    });
    if (!note) {
      throw new HttpException({
        statusCode: 401,
        status: "error",
        message: "Not authorized to access this resource",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
