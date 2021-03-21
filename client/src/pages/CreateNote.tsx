import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { fetchApi } from "api/apiRoutes";
import NoteForm from "components/NoteForm";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
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

export default function CreateNote() {
  const classes = useStyles();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        await fetchApi("/notes/1234321-noteid");
      } catch (error) {
        throw error;
      }
    };

    fetchNote();
  }, []);

  const initialValues = {
    title: "",
    description: "",
    expirationDate: new Date(),
    password: "",
  };

  const onSubmit = (values: unknown) => {
    const response = fetchApi("/notes/", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log({ response });
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
}
