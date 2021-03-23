import "fontsource-roboto";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline, makeStyles } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import CreateNote from "components/pages/CreateNote";
import ReadNote from "components/pages/ReadNote";
import NoteToken from "components/pages/NoteToken";
import AppHeader from "components/organisms/AppHeader";
import RecentNotes from "components/pages/RecentNotes";

const useStyles = makeStyles((theme) => ({
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
      <AppHeader />
      <main className={classes.layout}>
        <Router>
          <Switch>
            <Route exact path={["/", "recent-notes"]}>
              <RecentNotes />
            </Route>
            <Route exact path="/notes">
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
