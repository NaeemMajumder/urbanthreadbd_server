/**
 * models/User.model.js

    User এর database schema — name, email, password, role (admin/customer)

    { name: String, email: String, password: String, role: String }
 */


const mongoose = require("mongoose");

// ── Order Item Sub-schema ────────────────────────────────────
// Product এর snapshot রাখি — পরে product বদলে গেলেও order ঠিক থাকবে
const orderItemSchema = new mongoose.Schema({
  // ── Relation: Product ──────────────────────────────────
  productId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      "Product",
    required: true,
  },
  // Snapshot fields (order করার সময়ের data save হয়)
  name:     { type: String, required: true },
  image:    { type: String },
  price:    { type: Number, required: true },
  size:     { type: String },
  color:    { type: String },
  quantity: { type: Number, required: true, min: 1 },
});

// ── Delivery Address Sub-schema ──────────────────────────────
const deliveryAddressSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  phone:       { type: String, required: true },
  fullAddress: { type: String, required: true },
  city:        { type: String, required: true },
  district:    { type: String, required: true },
});

// ── Main Schema ──────────────────────────────────────────────
const orderSchema = new mongoose.Schema(
  {
    // ── Relation: User ─────────────────────────────────────
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },

    items:           [orderItemSchema],
    totalAmount:     { type: Number, required: true },
    deliveryCharge:  { type: Number, default: 60 },

    paymentMethod: {
      type:     String,
      enum:     ["cod", "bkash"],
      required: true,
    },
    paymentStatus: {
      type:    String,
      enum:    ["pending", "paid"],
      default: "pending",
    },
    orderStatus: {
      type:    String,
      enum:    ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    deliveryAddress: deliveryAddressSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);



// {
//   "items": [
//     {
//       "productId": "64f1a2b3c4d5e6f7a8b9c0d3",
//       "name": "Oversized Urban Tee",
//       "image": "https://res.cloudinary.com/urbanthread/image/upload/tee1.jpg",
//       "price": 950,
//       "size": "L",
//       "color": "black",
//       "quantity": 2
//     }
//   ],
//   "totalAmount": 1960,
//   "deliveryCharge": 60,
//   "paymentMethod": "cod",
//   "deliveryAddress": {
//     "name": "Rahim Ahmed",
//     "phone": "+8801712345678",
//     "fullAddress": "House 12, Road 5, Mirpur-10",
//     "city": "Dhaka",
//     "district": "Dhaka"
//   }
// }


// ⚠️ userId Backend JWT থেকে নেবে — Frontend পাঠাবে না