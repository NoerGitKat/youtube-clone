import express from "express";

const PORT = process.env.PORT || 4000;

const app = express();

const server = app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}!`);
});

// Signals to listen to in the case we want to kill the server
const signals = ["SIGTERM", "SIGINT"];

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    server.close();

    // TODO: Disconnect from DB

    console.log("Shutting down... My work here is done!");

    process.exit(0);
  });
}

signals.map((signal) => gracefulShutdown(signal));
