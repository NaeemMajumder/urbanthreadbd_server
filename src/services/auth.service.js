/**
 * 
 * services/auth.service.js

    Password hash করা, token generate করা — এই logic এখানে থাকে

    const hashed = await bcrypt.hash(password, 10);
    const token = jwt.sign({ id: user._id }, secret);
 * 
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const AppError = require("../utils/AppError");
const config = require("../config");
const BlacklistedToken = require("../models/BlacklistedToken.model");

// ── Token Generate ───────────────────────────────────────────
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

// ── Register ─────────────────────────────────────────────────
const register = async ({ name, phone, email, password }) => {
  // 1. Phone already আছে কিনা check করো
  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    throw new AppError("এই phone number দিয়ে already account আছে", 400);
  }

  // 2. Password hash করো
  const passwordHash = await bcrypt.hash(password, 12);

  // 3. User save করো
  const user = await User.create({ name, phone, email, passwordHash });

  // 4. Token generate করো
  const token = generateToken(user._id);

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    },
  };
};

// ── Login ─────────────────────────────────────────────────────
const login = async ({ phone, password }) => {
  // 1. Phone দিয়ে user খোঁজো
  const user = await User.findOne({ phone });
  if (!user) {
    throw new AppError("Phone number বা password ভুল", 401);
  }

  // 2. Password match করো
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new AppError("Phone number বা password ভুল", 401);
  }

  // 3. Token generate করো
  const token = generateToken(user._id);

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    },
  };
};

// ── logout ───────────────────────────────────────────
const logout = async (token) => {
  await BlacklistedToken.create({ token });
};

module.exports = { register, login, logout };
