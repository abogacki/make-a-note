import "fontsource-roboto";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import CreateNote from "components/pages/CreateNote";
import ReadNote from "components/pages/ReadNote";
import NoteToken from "components/pages/NoteToken";
import RecentNotes from "components/pages/RecentNotes";

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CssBaseline />
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
    </MuiPickersUtilsProvider>
  );
};

export default App;
