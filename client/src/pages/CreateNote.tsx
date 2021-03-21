import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { fetchApi } from "api/apiRoutes";

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
