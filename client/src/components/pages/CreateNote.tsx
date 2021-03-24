import React, { useState } from "react";
import { useHistory } from "react-router";

import NoteForm from "components/organisms/NoteForm";
import { fetchApi } from "api";
import MainLayout from "components/layouts/MainLayout";
import { updateRecentNotes } from "modules/localStorage";
import { addDays } from "date-fns";

const CreateNote = () => {
  const history = useHistory();
  const [error, setError] = useState<null | string>(null);

  const initialExpirationDate = addDays(new Date(), 1);
  const initialValues = {
    title: "",
    description: "",
    expirationDate: initialExpirationDate,
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

      updateRecentNotes({
        expirationDate: note.expirationDate,
        title: note.title,
        _id: note._id,
      });

      history.push(`/notes/${note._id}`);
    } catch (error) {
      console.error(error);

      setError("Error occured");
    }
  };

  return (
    <MainLayout error={error} title="Make a note">
      <NoteForm initialValues={initialValues} onSubmit={onSubmit} />
    </MainLayout>
  );
};

export default CreateNote;
