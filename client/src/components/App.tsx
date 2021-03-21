import CreateNote from "pages/CreateNote";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RouteNames } from "routes";
import "fontsource-roboto";
import {
  AppBar,
  CssBaseline,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";

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

const queryClient = new QueryClient();

export default function App() {
  const classes = useStyles();
  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path={["/", RouteNames.createNote]}>
              <CreateNote />
            </Route>
            <Route>
              <div>Not found</div>
            </Route>
          </Switch>
        </Router>
      </main>
    </QueryClientProvider>
  );
}
