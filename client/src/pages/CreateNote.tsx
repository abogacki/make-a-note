import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { fetchApi } from "api";
import NoteForm from "components/NoteForm";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const CreateNote = () => {
  const history = useHistory();
  const classes = useStyles();

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

      history.push(`/notes/${note._id}`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h4" align="center">
        Create note
      </Typography>
      <Box m={4}>
        <NoteForm initialValues={initialValues} onSubmit={onSubmit} />
      </Box>
    </Paper>
  );
};

export default CreateNote;
