/**
 * 
 * config/index.js

    .env থেকে সব variable পড়ে একজায়গায় export করে — বাকি সব file এখান থেকে নেয়

    module.exports = { port: process.env.PORT, mongoUri: process.env.MONGODB_URI }
 */
require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  corsOrigins: (process.env.CORS_ORIGINS || "http://localhost:3000").split(","),
};