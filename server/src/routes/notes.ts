import express from "express";

import {
  noteCreate,
  noteGenerateToken,
  noteRead,
  noteUpdate,
} from "src/controllers/notesController";
import { handleErrors } from "src/exceptions/HttpException";
import authMiddleware from "src/middlewares/authMiddleware";

const notesRouter = express.Router();

notesRouter.get("/:noteId", authMiddleware, handleErrors(noteRead));

notesRouter.post("/:noteId/token", handleErrors(noteGenerateToken));

notesRouter.post("/", handleErrors(noteCreate));

notesRouter.put("/:noteId", authMiddleware, handleErrors(noteUpdate));

export default notesRouter;
