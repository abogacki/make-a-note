import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import "src/types/";
import errorMiddleware from "src/middlewares/errorMiddleware";
import notes from "src/routes/notes";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3001;

const app = express();

app.use(helmet());

app.use(express.json());

app.use(cors());

app.use("/notes", notes);

app.use(errorMiddleware);

app.listen(PORT, function () {
  console.log("Example app listening on port " + PORT);
});
