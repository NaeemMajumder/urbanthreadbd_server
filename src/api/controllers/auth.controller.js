/**
 * controllers/auth.controller.js

    Request থেকে email/password নেয়, service কে দেয়, response পাঠায়

    const { token } = await authService.login(req.body);
    res.json({ token });
 * 
    1. req.body থেকে data নাও
   2. service কে দাও
   3. response পাঠাও
 */

const authService = require("../../services/auth.service");
const asyncHandler = require("../../utils/asyncHandler");

// ── Register ─────────────────────────────────────────────────
const register = asyncHandler(async (req, res) => {
  const { name, phone, email, password } = req.body;

  const data = await authService.register({ name, phone, email, password });

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data,
  });
});

// ── Login ─────────────────────────────────────────────────────
const login = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  const data = await authService.login({ phone, password });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data,
  });
});

module.exports = { register, login };
