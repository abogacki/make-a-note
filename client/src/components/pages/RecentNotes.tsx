import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import MainPaper from "components/molecules/MainPaper";

const RecentNotes = () => {
  const recentNotes = JSON.parse(localStorage.getItem("recentNotes") || "[]");
  return (
    <MainPaper>
      <Typography component="h1" variant="h4" align="center">
        Recent notes
      </Typography>
      <Box m={4}>
        <ul>
          {(recentNotes as Array<any>).map((item) => (
            <li key={item._id}>
              <a href={`/notes/${item._id}`}>{item.title}</a>
            </li>
          ))}
        </ul>
      </Box>
    </MainPaper>
  );
};

export default RecentNotes;
