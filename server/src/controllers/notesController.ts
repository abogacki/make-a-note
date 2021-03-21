import { Request, Response } from "express";

import HttpException from "src/exceptions/HttpException";
import Note from "src/models/Note";

// generate token for note
export const noteGenerateToken = async (req: Request, res: Response) => {
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
  res.send({ note, token });
};

// create new note
export const noteCreate = async (req: Request, res: Response) => {
  const { title, description, password } = req.body;

  const newNote = new Note({
    title,
    description,
    password,
  });

  await newNote.save();
  res.send(newNote);
};

// update note
export const noteUpdate = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const { title, description } = req.body;

  const newNote = await Note.findByIdAndUpdate(noteId, {
    title,
    description,
  });

  res.send(newNote);
};

// read note by Id
export const noteRead = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const newNote = await Note.findById(noteId);

  res.send(newNote);
};
