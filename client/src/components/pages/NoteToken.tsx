import { useHistory, useParams } from "react-router";
import Cookies from "js-cookie";
import React, { useState } from "react";

import MainLayout from "components/layouts/MainLayout";
import { fetchApi } from "api";
import AuthorizeNoteForm from "components/organisms/AuthorizeNoteForm";

const NoteToken = () => {
  const history = useHistory();
  const [error, setError] = useState<null | string>();
  const { noteId } = useParams<{ noteId: string }>();

  const onSubmit = async ({ password }: { password: string }) => {
    try {
      const body = JSON.stringify({ password, id: noteId });
      const data = await fetchApi(`/notes/${noteId}/token`, {
        method: "POST",
        body,
      });

      Cookies.set("Authorization", data.token);
      history.push(`/notes/${noteId}`);
    } catch (error) {
      setError("Could not authenticate. Try again.");
    }
  };

  const initialValues = {
    noteId,
    password: "",
  };
  return (
    <MainLayout error={error} title="Password required">
      <AuthorizeNoteForm initialValues={initialValues} onSubmit={onSubmit} />
    </MainLayout>
  );
};

export default NoteToken;
