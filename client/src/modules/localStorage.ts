import { TNote } from "types/notes";

type TNoteLabel = Pick<TNote, "_id" | "title">;

const RECENT_NOTES_LOCAL_STORAGE_KEY = "RecentNotes";

export const getRecentNotes = (): Array<TNoteLabel> => {
  const recentNotesString =
    localStorage.getItem(RECENT_NOTES_LOCAL_STORAGE_KEY) || "[]";
  const recentNotes = JSON.parse(recentNotesString);
  return recentNotes;
};

export const setRecentNotes = (notes: Array<TNoteLabel>) => {
  const notesString = JSON.stringify(notes);
  return localStorage.setItem(RECENT_NOTES_LOCAL_STORAGE_KEY, notesString);
};

export const updateRecentNotes = (note: TNoteLabel) => {
  const recentNotes = getRecentNotes();
  setRecentNotes([...recentNotes, note]);
};
