require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");

const app = require("./app");
const connectDB = require("./DB");

// If in case uncaught error occure that is not handle
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 8000;

connectDB();

let server;

mongoose.connection.once("open", () => {
  console.log("Connection successfull");

  server = app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log("Server.js File", err);
});

// If in case some promise is rejected and it is not handled
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully!");
  server.close(() => {
    console.log("Process terminated");
  });
});
