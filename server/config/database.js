const mongoose = require("mongoose");
require("dotenv").config();

exports.conncetToDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log("Database connection failed");
      console.error(error);
      process.exit(1);
    });
};
