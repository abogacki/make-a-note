import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CenteredPaper from "components/molecules/CenteredPaper";
import AppHeader from "components/organisms/AppHeader";
import { FunctionComponent } from "react";
import Alert from "@material-ui/lab/Alert";

type TProps = {
  title?: string;
  error?: string | null;
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

const MainLayout: FunctionComponent<TProps> = ({ title, children, error }) => {
  const classes = useStyles();
  return (
    <>
      <AppHeader />
      <main className={classes.layout}>
        <CenteredPaper>
          <Typography component="h1" variant="h4" align="center">
            <Box></Box>
            {title}
          </Typography>
          <Box m={4}>{error && <Alert severity="error">{error}</Alert>}</Box>
          <Box m={4}>{children}</Box>
        </CenteredPaper>
      </main>
    </>
  );
};

export default MainLayout;
