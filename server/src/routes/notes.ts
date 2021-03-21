import express from "express";
import {
  noteCreate,
  noteGenerateToken,
  noteRead,
  noteUpdate,
} from "src/controllers/notesController";
import { handleError } from "src/exceptions/HttpException";
import authMiddleware from "src/middlewares/authMiddleware";

const notesRouter = express.Router();

notesRouter.get("/:noteId", authMiddleware, handleError(noteRead));

notesRouter.post("/:noteId/token", handleError(noteGenerateToken));

notesRouter.post("/", handleError(noteCreate));

notesRouter.put("/:noteId", authMiddleware, handleError(noteUpdate));

export default notesRouter;
