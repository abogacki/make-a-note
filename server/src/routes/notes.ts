import express from "express";

import {
  noteCreate,
  noteGenerateToken,
  noteRead,
  noteUpdate,
} from "src/controllers/notesController";
import { handleErrors } from "src/exceptions/HttpException";
import tokenMiddleware from "src/middlewares/tokenMiddleware";

const notesRouter = express.Router();

notesRouter.post("/:noteId/token", handleErrors(noteGenerateToken));

notesRouter.post("/", handleErrors(noteCreate));

notesRouter.get("/:noteId", tokenMiddleware, handleErrors(noteRead));

notesRouter.put("/:noteId", tokenMiddleware, handleErrors(noteUpdate));

export default notesRouter;
