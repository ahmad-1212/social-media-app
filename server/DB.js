const mongoose = require("mongoose");

// eslint-disable-next-line
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = process.env.DB_URL.replace("<PASSWORD>", DB_PASSWORD);

const connectDB = async () => {
  try {
    mongoose.connect(DB_URL);
  } catch (err) {
    console.log("DB.js", err);
  }
};

module.exports = connectDB;
