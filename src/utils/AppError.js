/**
 * utils/AppError.js

    Custom error class — statusCode সহ error throw করতে পারবে

    throw new AppError('Product পাওয়া যায়নি', 404);
 * 
 */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
