import express from "express";
import HttpException from "src/exceptions/HttpException";
import authMiddleware from "src/middlewares/authMiddleware";
import Note from "src/models/Note";

const notesRouter = express.Router();

// Allow login for note
notesRouter.post("/:noteId/token", async (req, res) => {
  try {
    const { noteId } = req.params;
    const { password } = req.body;

    console.log({ noteId, password });

    const note = await Note.findByCredentials(noteId, password);
    console.log({ note });

    if (!note) {
      throw new HttpException(
        401,
        "Login failed! Check authentication credentials"
      );
    }

    const token = await note.generateAuthToken();
    res.send({ note, token });
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message || "Something went wrong!" });
  }
});

// create new note
notesRouter.post("/", async (req, res) => {
  try {
    const { title, description, password } = req.body;

    const newNote = new Note({
      title,
      description,
      password,
    });

    await newNote.save();
    res.send(newNote);
  } catch (error) {
    res.status(error).json({ message: error.message });
  }
});

// update note
notesRouter.put("/:noteId", authMiddleware, async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, description } = req.body;

    const newNote = await Note.findByIdAndUpdate(noteId, {
      title,
      description,
    });

    res.send(newNote);
  } catch (error) {
    console.error(error);
  }
});

export default notesRouter;
