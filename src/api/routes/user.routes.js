/**
 * routes/user.routes.js

    User profile দেখা বা update করার URL

    router.get('/profile', authenticate, userController.getProfile);
    router.patch('/profile', authenticate, userController.updateProfile);
 */

const { Router } = require("express");
const {
  getMe,
  updateMe,
  getAllUsers,
  getUserById,
} = require("../controllers/user.controller");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

const router = Router();

// সব route Protected
router.use(authenticate);

// ── User Routes ───────────────────────────────────────────────
router.get("/me", getMe);
router.patch("/me", updateMe);

// ── Admin Routes ──────────────────────────────────────────────
router.get("/", authorize("admin"), getAllUsers);
router.get("/:id", authorize("admin"), getUserById);

module.exports = router;
