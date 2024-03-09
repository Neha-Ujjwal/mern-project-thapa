const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database connected successfully");
  } catch (error) {
    throw new Error("Database connection failed");
  }
};

module.exports = connectDB;
