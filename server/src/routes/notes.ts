import express from "express";

import {
  noteCreate,
  noteGenerateToken,
  noteRead,
  noteUpdate,
} from "src/controllers/notesController";
import { handleErrors } from "src/exceptions/HttpException";

const notesRouter = express.Router();

notesRouter.get("/:noteId", handleErrors(noteRead));

notesRouter.post("/:noteId/token", handleErrors(noteGenerateToken));

notesRouter.post("/", handleErrors(noteCreate));

notesRouter.put("/:noteId", handleErrors(noteUpdate));

export default notesRouter;
