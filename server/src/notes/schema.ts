import { Schema } from "mongoose";
import { INoteModel } from "src/notes/types";
import db from "src/database";

const NoteSchema = new Schema<INoteModel>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    default: undefined,
    index: { expires: "5m" },
  },
});

const Note = db.model("Notes", NoteSchema);

export default Note;
