import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorMiddleware from "src/middleware/errorMiddleware";
import notes from "./notes";

const PORT = process.env.SERVER_PORT || 3001;

const app = express();

app.use(helmet());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(cors());

app.use(morgan("combined"));

app.use("/notes", notes);

app.use(errorMiddleware);

app.listen(PORT, function () {
  console.log("Example app listening on port " + PORT);
});
