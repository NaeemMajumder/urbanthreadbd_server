const mongoose = require("mongoose");

// ── Cart Item Sub-schema ─────────────────────────────────────
const cartItemSchema = new mongoose.Schema({
  // ── Relation: Product ──────────────────────────────────
  productId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      "Product",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  size:     { type: String },
  color:    { type: String },
});

// ── Main Schema ──────────────────────────────────────────────
const cartSchema = new mongoose.Schema(
  {
    // ── Relation: User ─────────────────────────────────────
    // একজন user এর একটাই cart থাকবে (unique)
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
      unique:   true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);




// {
//   "userId": "64f1a2b3c4d5e6f7a8b9c0d2",
//   "items": [
//     {
//       "productId": "64f1a2b3c4d5e6f7a8b9c0d3",
//       "quantity": 2,
//       "size": "L",
//       "color": "black"
//     },
//     {
//       "productId": "64f1a2b3c4d5e6f7a8b9c0d4",
//       "quantity": 1,
//       "size": "M",
//       "color": "white"
//     }
//   ]
// }

// ⚠️ userId Frontend পাঠাবে না — Backend JWT থেকে নেবে (req.user.id)