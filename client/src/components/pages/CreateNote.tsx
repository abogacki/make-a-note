import React from "react";
import { useHistory } from "react-router";

import NoteForm from "components/organisms/NoteForm";
import { fetchApi } from "api";
import MainLayout from "components/layouts/MainLayout";
import { getRecentNotes, setRecentNotes } from "modules/localStorage";

const CreateNote = () => {
  const history = useHistory();

  const initialValues = {
    title: "",
    description: "",
    expirationDate: new Date(),
    password: "",
  };

  const onSubmit = async (values: unknown) => {
    try {
      const note = await fetchApi("/notes/", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const recentNotes = getRecentNotes();

      setRecentNotes([...recentNotes, { title: note.title, _id: note._id }]);

      history.push(`/notes/${note._id}`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <MainLayout title="Make a note">
      <NoteForm initialValues={initialValues} onSubmit={onSubmit} />
    </MainLayout>
  );
};

export default CreateNote;
