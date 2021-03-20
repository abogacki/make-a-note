import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { fetchApi, getApiRoute } from "api/apiRoutes";

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
  const [noteState, setNoteState] = useState({
    author: "",
    content: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.persist();
    const { name, value } = e.currentTarget;

    setNoteState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const { isLoading, error } = useQuery<unknown, Error>("repoData", () =>
    fetch(getApiRoute("/note/asdadasdas"))
  );

  if (isLoading) return <>"Loading..."</>;

  if (error) return <>{`An error has occurred: ${error.message}`}</>;

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h4" align="center">
        Create note
      </Typography>
      <Box m={4}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="author"
                name="author"
                label="Author"
                fullWidth
                autoComplete="author"
                variant="outlined"
                value={noteState.author}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Note"
                name="note"
                multiline
                variant="outlined"
                defaultValue="Some default value"
                onChange={handleChange}
              />
            </Grid>
            <Grid item alignContent="flex-end">
              <Button disableElevation color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  );
}
