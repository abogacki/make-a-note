import { FunctionComponent } from "react";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import CircularProgress from "@material-ui/core/CircularProgress";

import useFetchApi from "hooks/useFetchApi";
import MainLayout from "components/layouts/MainLayout";
import { TNote } from "types/notes";
import NoteDocument from "components/organisms/NoteDocument";

type TNoteDetails = Pick<TNote, "title" | "description" | "expirationDate">;

const ReadNote: FunctionComponent<{}> = () => {
  const { noteId } = useParams<{ noteId: string }>();

  const token = Cookies.get("Authorization");
  const init = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data, isLoading } = useFetchApi<TNoteDetails>(
    `/notes/${noteId}`,
    init
  );

  if (isLoading) return <CircularProgress />;

  if (!data) return null;

  const { title, description, expirationDate: expirationDateString } =
    data || {};

  const expirationDate = new Date(expirationDateString);
  return (
    <MainLayout title="Read note">
      <NoteDocument
        title={title}
        description={description}
        expirationDate={expirationDate}
      />
    </MainLayout>
  );
};

export default ReadNote;
