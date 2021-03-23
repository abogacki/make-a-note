import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CenteredPaper from "components/molecules/CenteredPaper";
import AppHeader from "components/organisms/AppHeader";
import React, { FunctionComponent } from "react";

type TProps = {
  title?: string;
};

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

const MainLayout: FunctionComponent<TProps> = ({ title, children }) => {
  const classes = useStyles();
  return (
    <>
      <AppHeader />
      <main className={classes.layout}>
        <CenteredPaper>
          <Typography component="h1" variant="h4" align="center">
            {title}
          </Typography>
          <Box m={4}>{children}</Box>
        </CenteredPaper>
      </main>
    </>
  );
};

export default MainLayout;
