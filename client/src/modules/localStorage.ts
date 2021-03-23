import { TNote } from "types/notes";

type TNoteLabel = Pick<TNote, "_id" | "title">;

export const getRecentNotes = (): Array<TNoteLabel> => {
  const recentNotesString = localStorage.getItem("recentNotes") || "[]";
  const recentNotes = JSON.parse(recentNotesString);
  return recentNotes;
};

export const setRecentNotes = (notes: Array<TNoteLabel>) => {
  const notesString = JSON.stringify(notes);
  return localStorage.setItem("recentNotes", notesString);
};
