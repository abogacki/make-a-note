import { useHistory, useParams } from "react-router";
import Cookies from "js-cookie";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from "react";
import TextField from "@material-ui/core/TextField";

import MainLayout from "components/layouts/MainLayout";
import PasswordInput from "components/molecules/PasswordInput";
import useForm from "hooks/useForm";
import { fetchApi } from "api";

const NoteToken = () => {
  const history = useHistory();
  const { state, handleChange, handleSubmit } = useForm({
    password: "",
  });
  const { noteId } = useParams<{ noteId: string }>();

  const onSubmit = async ({ password }: { password: string }) => {
    const body = JSON.stringify({ password, id: noteId });
    const data = await fetchApi(`/notes/${noteId}/token`, {
      method: "POST",
      body,
    });

    Cookies.set("Authorization", data.token);
    history.push(`/notes/${noteId}`);
  };

  return (
    <MainLayout title="Password required">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <TextField
              id="noteId"
              name="noteId"
              label="Note Id"
              value={noteId}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PasswordInput
              id="password"
              name="password"
              label="Passowrd"
              value={state.password}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </MainLayout>
  );
};

export default NoteToken;
