/**
 * controllers/user.controller.js

    Logged-in user এর profile data দেখায় বা update করে

    const user = await User.findById(req.user.id);
    res.json({ user });
 * 
 */

const userService = require("../../services/user.service");
const asyncHandler = require("../../utils/asyncHandler");

// ── আমার Profile দেখো ────────────────────────────────────────
const getMe = asyncHandler(async (req, res) => {
  const user = await userService.getMe(req.user._id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// ── Profile Update করো ───────────────────────────────────────
const updateMe = asyncHandler(async (req, res) => {
  const user = await userService.updateMe(req.user._id, req.body);

  res.status(200).json({
    success: true,
    message: "Profile update হয়েছে",
    data: user,
  });
});

// ── সব Users (Admin) ──────────────────────────────────────────
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
});

// ── একটা User (Admin) ─────────────────────────────────────────
const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

module.exports = { getMe, updateMe, getAllUsers, getUserById };
