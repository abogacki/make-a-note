import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";

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

const CenteredPaper: FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles();
  return <Paper className={classes.paper}>{children}</Paper>;
};

export default CenteredPaper;
