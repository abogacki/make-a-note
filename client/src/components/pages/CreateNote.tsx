import React from "react";
import { useHistory } from "react-router";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import NoteForm from "components/organisms/NoteForm";
import MainPaper from "components/molecules/MainPaper";
import { fetchApi } from "api";

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

      const recentNotes = JSON.parse(
        localStorage.getItem("recentNotes") || "[]"
      );

      localStorage.setItem(
        "recentNotes",
        JSON.stringify([...recentNotes, { title: note.title, _id: note._id }])
      );

      history.push(`/notes/${note._id}`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <MainPaper>
      <Typography component="h1" variant="h4" align="center">
        Create note
      </Typography>
      <Box m={4}>
        <NoteForm initialValues={initialValues} onSubmit={onSubmit} />
      </Box>
    </MainPaper>
  );
};

export default CreateNote;
