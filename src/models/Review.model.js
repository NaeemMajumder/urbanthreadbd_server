const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    // ── Relation: Product ──────────────────────────────────
    productId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "Product",
      required: true,
    },

    // ── Relation: User ─────────────────────────────────────
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },

    rating:  { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
  },
  { timestamps: true }
);

// ── একজন user একটা product এ একবারই review দিতে পারবে ────────
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);


// {
//   "productId": "64f1a2b3c4d5e6f7a8b9c0d3",
//   "rating": 5,
//   "comment": "অসাধারণ quality! পরতে খুব comfortable।"
// }

// ⚠️ userId Backend JWT থেকে নেবে — Frontend পাঠাবে না