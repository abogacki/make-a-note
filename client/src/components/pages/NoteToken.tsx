import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { fetchApi } from "api";
import PasswordInput from "components/molecules/PasswordInput";
import useForm from "hooks/useForm";
import React from "react";
import { useHistory, useParams } from "react-router";
import Cookies from "js-cookie";
import MainPaper from "components/molecules/MainPaper";

const NoteToken = () => {
  const history = useHistory();
  const { state, handleChange, handleSubmit } = useForm({
    password: "",
  });
  const { noteId } = useParams<{ noteId: string }>();

  const onSubmit = async (values: { password: string }) => {
    const data = await fetchApi(`/notes/${noteId}/token`, {
      method: "POST",
      body: JSON.stringify(values),
    });

    Cookies.set("Authorization", data.token);
    history.push(`/notes/${noteId}`);
  };

  return (
    <MainPaper>
      <Typography component="h1" variant="h5" align="center">
        Password required
      </Typography>
      <Box m={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <PasswordInput
                id="password"
                name="password"
                label="Passowrd"
                value={state.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </MainPaper>
  );
};

export default NoteToken;
