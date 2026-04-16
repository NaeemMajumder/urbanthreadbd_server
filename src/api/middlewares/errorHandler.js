/**
 * middlewares/errorHandler.js

    সারা app এর যেকোনো error এখানে আসে, client কে সুন্দর message পাঠায়

    res.status(err.statusCode).json({ success: false, message: err.message });
 * 
 */

const AppError = require("../../utils/AppError");

const errorHandler = (err, req, res, next) => {
  // AppError না হলে default values বসাও
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";

  // Mongoose — Invalid ObjectId
  if (err.name === "CastError") {
    err = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  }

  // Mongoose — Duplicate field
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err = new AppError(`${field} already exists`, 400);
  }

  // Mongoose — Validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
    err = new AppError(message, 400);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    err = new AppError("Invalid token", 401);
  }
  if (err.name === "TokenExpiredError") {
    err = new AppError("Token expired, please login again", 401);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
