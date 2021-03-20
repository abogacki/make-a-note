import mongoose, { ConnectOptions } from "mongoose";

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_HOSTNAME,
} = process.env;

const connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/db?authSource=admin`;

const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(connectionString, options);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

export default db;
