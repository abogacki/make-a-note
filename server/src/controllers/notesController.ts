import { Request, Response } from "express";

import HttpException from "src/exceptions/HttpException";
import Note from "src/models/Note";

// generate token for note
export const noteGenerateToken = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.params;
    const { password } = req.body;

    const note = await Note.findByCredentials(noteId, password);
    if (!note) {
      throw new HttpException({
        statusCode: 401,
        status: "error",
        message: "Login failed! Check authentication credentials",
      });
    }

    const token = await note.generateAuthToken();
    res.send({ token });
  } catch (error) {
    throw error;
  }
};

// create new note
export const noteCreate = async (req: Request, res: Response) => {
  try {
    const { title, description, password, expirationDate } = req.body;

    const newNote = new Note({
      title,
      description,
      password,
      expirationDate,
    });

    await newNote.save();
    const noteLeanDocument = newNote.toJSON();

    res.send(noteLeanDocument);
  } catch (error) {
    throw error;
  }
};

// update note
export const noteUpdate = async (_req: Request, res: Response) => {
  try {
    res.send("Not implemented");
  } catch (error) {
    throw error;
  }
};

// read note by Id
export const noteRead = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findOne({
      _id: noteId,
      tokens: req.token,
    });

    if (!note) {
      throw new HttpException({
        statusCode: 404,
        status: "error",
        message: "Not found",
      });
    }

    const noteLeanDocument = note.toJSON();

    res.send(noteLeanDocument);
  } catch (error) {
    throw error;
  }
};
