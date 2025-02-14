const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
  } catch (err) {
    console.error("MongoDB Connection Error: ", err);
    process.exit(1);
  }
};

module.exports = connectDB;
