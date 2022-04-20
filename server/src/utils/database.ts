import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/youtube-clone";

export async function connectToDB() {
  logger.info("Connecting to the database...", DB_CONNECTION_STRING);
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Successfully connected to the database!");
    logger;
  } catch (error) {
    logger.error(error, "Failed to connect to the database...");
    process.exit(1);
  }
}

export async function disconnectFromDB() {
  logger.info("Disconnecting from the database...");
  try {
    await mongoose.connection.close();
    logger.info("Disconnected from the database!");
  } catch (error) {
    logger.error(error, "Couldn't disconnect the database...");
    process.exit(1);
  }
}
