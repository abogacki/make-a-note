import mongoose, { ConnectOptions } from "mongoose";

const { MONGO_PORT, MONGO_HOSTNAME } = process.env;

const connectionString = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/db`;

const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(connectionString, options);

const db = mongoose.connection;

db.on("open", () => {
  console.log("MongoDB database connection established successfully");
});

db.on("error", () => console.error("MongoDB connection error"));

export default db;
