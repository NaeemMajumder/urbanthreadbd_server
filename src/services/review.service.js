const Review = require("../models/Review.model");
const Order = require("../models/Order.model");
const AppError = require("../utils/AppError");

// ── Product এর সব Reviews ─────────────────────────────────────
const getProductReviews = async (productId) => {
  const reviews = await Review.find({ productId })
    .populate("userId", "name")
    .sort({ createdAt: -1 });
  return reviews;
};

// ── Review দাও ────────────────────────────────────────────────
const createReview = async (userId, productId, { rating, comment }) => {
  // 1. User এই product order করেছে কিনা check করো
  const hasPurchased = await Order.findOne({
    userId,
    "items.productId": productId,
    orderStatus: "delivered",
  });
  if (!hasPurchased) {
    throw new AppError("শুধু delivered order এর product এ review দেওয়া যাবে", 400);
  }

  // 2. Already review দিয়েছে কিনা check করো
  const existingReview = await Review.findOne({ userId, productId });
  if (existingReview) {
    throw new AppError("আপনি already এই product এ review দিয়েছেন", 400);
  }

  // 3. Review save করো
  const review = await Review.create({ userId, productId, rating, comment });
  return review.populate("userId", "name");
};

// ── Review Update ─────────────────────────────────────────────
const updateReview = async (userId, reviewId, { rating, comment }) => {
  const review = await Review.findById(reviewId);
  if (!review) throw new AppError("Review পাওয়া যায়নি", 404);

  // শুধু নিজের review update করতে পারবে
  if (review.userId.toString() !== userId.toString()) {
    throw new AppError("এই review update করার permission নেই", 403);
  }

  if (rating) review.rating = rating;
  if (comment) review.comment = comment;

  await review.save();
  return review;
};

// ── Review Delete ─────────────────────────────────────────────
const deleteReview = async (userId, reviewId) => {
  const review = await Review.findById(reviewId);
  if (!review) throw new AppError("Review পাওয়া যায়নি", 404);

  // শুধু নিজের review delete করতে পারবে
  if (review.userId.toString() !== userId.toString()) {
    throw new AppError("এই review delete করার permission নেই", 403);
  }

  await Review.findByIdAndDelete(reviewId);
  return review;
};

module.exports = {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
};