import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { DateTimePicker } from "@material-ui/pickers";
import useForm from "hooks/useForm";
import React, { FunctionComponent } from "react";
import PasswordInput from "../molecules/PasswordInput";

type TNoteForm = {
  title: string;
  description: string;
  password: string;
  expirationDate: Date;
};

type TProps = {
  onSubmit: (values: TNoteForm) => void;
  initialValues: TNoteForm;
};

const NoteForm: FunctionComponent<TProps> = ({ onSubmit, initialValues }) => {
  const {
    state: noteState,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = useForm(initialValues);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="title"
            name="title"
            label="Title"
            fullWidth
            autoComplete="title"
            variant="outlined"
            value={noteState.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateTimePicker
            name="expirationDate"
            id="expirationDate"
            label="Expiration Date"
            value={noteState.expirationDate}
            onChange={(date) => setFieldValue("expirationDate", date)}
            inputVariant="outlined"
            minDate={new Date()}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <PasswordInput
            name="password"
            id="password"
            label="Password"
            value={noteState.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Note"
            name="description"
            multiline
            variant="outlined"
            value={noteState.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item alignContent="flex-end">
          <Button disableElevation color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NoteForm;
