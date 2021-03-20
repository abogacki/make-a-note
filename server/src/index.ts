import express from "express";
import Notes from "./notes/schema";

const app = express();

app.get("/", function (_req, res) {
  res.send("Hello World!");
});

app.listen(3001, function () {
  console.log("Example app listening on port 3001!");
});
