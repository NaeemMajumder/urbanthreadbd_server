const User = require("../models/User.model");
const AppError = require("../utils/AppError");

// ── আমার Profile দেখো ────────────────────────────────────────
const getMe = async (userId) => {
  const user = await User.findById(userId).select("-passwordHash");
  if (!user) throw new AppError("User পাওয়া যায়নি", 404);
  return user;
};

// ── Profile Update করো ───────────────────────────────────────
const updateMe = async (userId, { name, email, addresses }) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { name, email, addresses },
    { new: true, runValidators: true },
  ).select("-passwordHash");
  if (!user) throw new AppError("User পাওয়া যায়নি", 404);
  return user;
};

// ── সব Users (Admin) ──────────────────────────────────────────
const getAllUsers = async () => {
  const users = await User.find()
    .select("-passwordHash")
    .sort({ createdAt: -1 });
  return users;
};

// ── একটা User (Admin) ─────────────────────────────────────────
const getUserById = async (id) => {
  const user = await User.findById(id).select("-passwordHash");
  if (!user) throw new AppError("User পাওয়া যায়নি", 404);
  return user;
};

module.exports = { getMe, updateMe, getAllUsers, getUserById };
