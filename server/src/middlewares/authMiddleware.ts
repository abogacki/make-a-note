import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Note, { INoteDocument } from "src/models/Note";

declare global {
  namespace Express {
    interface Request {
      token: string | null;
      note: INoteDocument | null;
    }
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw Error("Not authorized to access this resource");

    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    const note = await Note.findOne({
      _id: (data as INoteDocument)._id,
      "tokens.token": token,
    });
    if (!note) {
      throw new Error("Not authorized to acces this resource");
    }

    req.note = note;
    req.token = token;
    next();
  } catch (error) {
    console.log({ error });

    res.status(error.status).send(error.message);
  }
};

export default authMiddleware;
