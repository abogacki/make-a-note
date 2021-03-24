import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { FunctionComponent } from "react";
import { format } from "date-fns";

type TProps = {
  title: string;
  expirationDate: Date;
  description: string;
};

const NoteDocument: FunctionComponent<TProps> = ({
  title,
  expirationDate,
  description,
}) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography component="h2" variant="h6" align="left">
          Title: {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component="div" variant="body1" align="left">
          Expiration date:
          {expirationDate && format(expirationDate, "dd-MM-yyyy HH:MM:ss")}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box mt={5}>
          <Typography>{description}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NoteDocument;
