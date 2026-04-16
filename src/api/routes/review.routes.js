const { Router } = require("express");
const {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");
const authenticate = require("../middlewares/authenticate");

const router = Router();

// ── Public Routes ─────────────────────────────────────────────
router.get("/:productId", getProductReviews);

// ── Protected Routes ──────────────────────────────────────────
router.post("/:productId", authenticate, createReview);
router.patch("/:id", authenticate, updateReview);
router.delete("/:id", authenticate, deleteReview);

module.exports = router;
