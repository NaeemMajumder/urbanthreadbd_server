/**
 * middlewares/authenticate.js

    Request এর header থেকে JWT token নেয়, verify করে, req.user এ বসায়

    const decoded = jwt.verify(token, secret);
    req.user = decoded; next();
 * 
 */

const jwt = require("jsonwebtoken");
const User = require("../../models/User.model");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const config = require("../../config");

const authenticate = asyncHandler(async (req, res, next) => {
  // 1. Header থেকে token নাও
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Login করুন", 401);
  }

  const token = authHeader.split(" ")[1];

  // 2. Token verify করো
  const decoded = jwt.verify(token, config.jwt.secret);

  // 3. DB থেকে user খোঁজো
  const user = await User.findById(decoded.id).select("-passwordHash");
  if (!user) {
    throw new AppError("User পাওয়া যায়নি", 401);
  }

  // 4. req.user এ বসাও — পরের middleware/controller পাবে
  req.user = user;
  next();
});

module.exports = authenticate;
