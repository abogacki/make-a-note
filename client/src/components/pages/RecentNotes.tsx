import { Link } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import MainLayout from "components/layouts/MainLayout";

const RecentNotes = () => {
  const recentNotes = JSON.parse(localStorage.getItem("recentNotes") || "[]");
  return (
    <MainLayout title="Recent notes">
      <Box m={4}>
        <ul>
          {(recentNotes as Array<any>).map((item) => (
            <li key={item._id}>
              <Link href={`/notes/${item._id}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </Box>
    </MainLayout>
  );
};

export default RecentNotes;
