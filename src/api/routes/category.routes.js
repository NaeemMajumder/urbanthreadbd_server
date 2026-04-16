const { Router } = require("express");
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

const router = Router();

// ── Public Routes ─────────────────────────────────────────────
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// ── Admin Protected Routes ────────────────────────────────────
router.post("/", authenticate, authorize("admin"), createCategory);
router.patch("/:id", authenticate, authorize("admin"), updateCategory);
router.delete("/:id", authenticate, authorize("admin"), deleteCategory);

module.exports = router;