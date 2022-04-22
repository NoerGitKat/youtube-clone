import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDB, disconnectFromDB } from "./utils";
import { CORS_ORIGIN } from "./constants";
import helmet from "helmet";
import { default as userRouter } from "./modules/user/user.route";
import { default as authRouter } from "./modules/auth/auth.route";
import { deserializeUser } from "./middleware";

const PORT = process.env.PORT || 4000;

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);
app.use(helmet());
app.use(deserializeUser);

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

const server = app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server listening at port ${PORT}!`);
});

// Signals to listen to in the case we want to kill the server
const signals = ["SIGTERM", "SIGINT"];

function shutdownServer(signal: string) {
  process.on(signal, async () => {
    server.close();

    await disconnectFromDB();

    console.log(`[${signal}] Shutting down... My work here is done!`);

    process.exit(0);
  });
}

signals.map((signal) => shutdownServer(signal));
