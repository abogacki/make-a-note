import "fontsource-roboto";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline, makeStyles } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import CreateNote from "pages/CreateNote";
import ReadNote from "pages/ReadNote";
import NoteToken from "pages/NoteToken";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Router>
          <Switch>
            <Route exact path={["/", "/notes"]}>
              <CreateNote />
            </Route>
            <Route exact path="/notes/:noteId">
              <ReadNote />
            </Route>
            <Route exact path="/notes/:noteId/token">
              <NoteToken />
            </Route>
            <Route>
              <div>Not found</div>
            </Route>
          </Switch>
        </Router>
      </main>
    </MuiPickersUtilsProvider>
  );
};

export default App;
