import { Schema } from "mongoose";
import db from "src/database";

const NotesSchema = new Schema({
  title: String,
  description: String,
});

const Notes = db.model("Notes", NotesSchema);

export default Notes;
