import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Model, Schema, Document, LeanDocument } from "mongoose";

import db from "src/database/database";
import HttpException from "src/exceptions/HttpException";

type TJwtToken = string;

export interface INote {
  title: string;
  description: string;
  password: string;
  createdAt: Date;
  expirationDate?: Date;
  tokens: Array<TJwtToken>;
}

export interface INoteDocument extends INote, Document {
  generateHash(password: string): Promise<string>;
  validatePassword(pasword: string): Promise<boolean>;
  generateAuthToken(): Promise<string>;
  toJSON(): LeanDocument<this>;
}

export interface INoteModel extends Model<INoteDocument> {
  findByCredentials(noteId: string, password: string): Promise<INoteDocument>;
}

const noteSchema = new Schema<INoteDocument>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, "Creation date is required is required"],
  },
  expirationDate: {
    type: Date,
    expires: 1,
  },
  password: {
    type: String,
    minLength: 7,
    required: [true, "Password is required"],
  },
  tokens: [String],
});

const SALT_WORK_FACTOR = 10;

noteSchema.methods.generateAuthToken = async function () {
  const note = this;

  const token = jwt.sign({ _id: note._id }, process.env.JWT_SECRET as string);
  note.tokens.push(token);

  await note.save();
  return token;
};

noteSchema.methods.toJSON = function () {
  const { tokens, password, ...object } = this.toObject();
  return object;
};

noteSchema.statics.findByCredentials = async (
  noteId: string,
  password: string
) => {
  const note = await Note.findById(noteId);
  if (!note) {
    throw new HttpException({
      status: "error",
      statusCode: 401,
      message: "Invalid credentials",
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, note.password);
  if (!isPasswordMatch) {
    throw new HttpException({
      status: "error",
      statusCode: 401,
      message: "Invalid login credentials",
    });
  }

  return note;
};

noteSchema.pre("save", async function (next) {
  const note = this;
  if (note.isModified("password")) {
    note.password = await bcrypt.hash(note.password, SALT_WORK_FACTOR);
  }

  next();
});

const Note = db.model<INoteDocument, INoteModel>("Note", noteSchema);

export default Note;
