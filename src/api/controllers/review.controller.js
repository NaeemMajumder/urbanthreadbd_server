const reviewService = require("../../services/review.service");
const asyncHandler = require("../../utils/asyncHandler");

// ── Product এর সব Reviews ─────────────────────────────────────
const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.getProductReviews(req.params.productId);

  res.status(200).json({
    success: true,
    data: reviews,
  });
});

// ── Review দাও ────────────────────────────────────────────────
const createReview = asyncHandler(async (req, res) => {
  const review = await reviewService.createReview(
    req.user._id,
    req.params.productId,
    req.body,
  );

  res.status(201).json({
    success: true,
    message: "Review দেওয়া হয়েছে",
    data: review,
  });
});

// ── Review Update ─────────────────────────────────────────────
const updateReview = asyncHandler(async (req, res) => {
  const review = await reviewService.updateReview(
    req.user._id,
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Review update হয়েছে",
    data: review,
  });
});

// ── Review Delete ─────────────────────────────────────────────
const deleteReview = asyncHandler(async (req, res) => {
  await reviewService.deleteReview(req.user._id, req.params.id);

  res.status(200).json({
    success: true,
    message: "Review delete হয়েছে",
  });
});

module.exports = {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
};
