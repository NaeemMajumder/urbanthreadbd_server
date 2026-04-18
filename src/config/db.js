/**
 * config/db.js

    MongoDB তে connect করে — success বা failure console এ দেখায়

    mongoose.connect(config.mongoUri)
 */

const mongoose = require("mongoose");
const config = require("./index");

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      family: 4,
    })
    console.log("✅ MongoDB connected")
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message)
    process.exit(1)
  }
}

module.exports = connectDB;
