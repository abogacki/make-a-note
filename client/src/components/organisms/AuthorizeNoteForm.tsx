import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import useForm from "hooks/useForm";
import { FunctionComponent } from "react";
import PasswordInput from "../molecules/PasswordInput";

type TProps = {
  onSubmit(data: Record<"password", string>): void;
  initialValues: {
    password: string;
    noteId: string;
  };
};

const AuthorizeNoteForm: FunctionComponent<TProps> = ({
  onSubmit,
  initialValues,
}) => {
  const { state, handleChange, handleSubmit } = useForm(initialValues);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box my={2}>
        <Grid item xs={12}>
          <TextField
            id="noteId"
            name="noteId"
            label="Note Id"
            value={state.noteId}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            variant="outlined"
          />
        </Grid>
      </Box>
      <Box my={2}>
        <PasswordInput
          id="password"
          name="password"
          label="Passowrd"
          value={state.password}
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <Box display="flex" width="full" justifyContent="center">
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};

export default AuthorizeNoteForm;
