import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import useFetchApi from "hooks/useFetchApi";
import Cookies from "js-cookie";
import { Description } from "@material-ui/icons";
import { format } from "date-fns";

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
  title: {
    marginBottom: theme.spacing(3),
  },
}));

type TNote = {
  title: string;
  description: string;
  expirationDate: string;
};

const ReadNote: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const { noteId } = useParams<{ noteId: string }>();

  const token = Cookies.get("Authorization");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { data, isLoading } = useFetchApi<TNote>(`/notes/${noteId}`, {
    headers,
  });

  if (isLoading) return <CircularProgress />;

  if (!data) return null;

  const expirationDate = data?.expirationDate
    ? new Date(data?.expirationDate)
    : null;
  return (
    <Paper className={classes.paper}>
      <Box m={4}>
        <Grid container>
          <Grid item xs={12} className={classes.title}>
            <Typography component="h1" variant="h4" align="center">
              Read note
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="h2" variant="h6" align="left">
              {data?.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography component="div" variant="body1" align="left">
              <div>Expiration date:</div>
              <div>
                {expirationDate &&
                  format(expirationDate, "dd-MM-yyyy HH:MM:ss")}
              </div>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box mt={5}>
              <Typography>{data?.description}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ReadNote;
