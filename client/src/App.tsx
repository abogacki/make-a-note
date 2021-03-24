import "fontsource-roboto";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import CreateNote from "components/pages/CreateNote";
import ReadNote from "components/pages/ReadNote";
import NoteAuthorize from "components/pages/NoteAuthorize";
import RecentNotes from "components/pages/RecentNotes";

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path={["/", "/notes"]}>
            <RecentNotes />
          </Route>
          <Route exact path="/notes/create">
            <CreateNote />
          </Route>
          <Route exact path="/notes/:noteId">
            <ReadNote />
          </Route>
          <Route exact path="/notes/:noteId/token">
            <NoteAuthorize />
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
