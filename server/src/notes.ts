import express from "express";
import Note from "src/notes/schema";
import HttpException from "./exceptions/HttpException";

const notes = express.Router();

notes.get("/:noteId", async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findById(noteId);
    if (!note) throw new HttpException(404, "Note does not exist");

    res.send(note);
  } catch (error) {
    console.error(error);
  }
});

notes.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log('"\x1b[31m"', req.body);

    const newNote = new Note({
      title,
      description,
    });
    await newNote.save();

    res.send(newNote);
  } catch (error) {
    console.error(error);

    res.send(error);
  }
});

notes.put("/:noteId", async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, description } = req.body;
    console.log('FgRed = "\x1b[31m"', { title, description });

    const newNote = await Note.findByIdAndUpdate(noteId, {
      title,
      description,
    });

    res.send(newNote);
  } catch (error) {
    console.error(error);
  }
});

notes.put("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new Note({
      title,
      description,
    });
    await newNote.save();

    res.send(newNote);
  } catch (error) {
    console.error(error);
  }
});

export default notes;
