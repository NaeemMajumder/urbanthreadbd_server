/**
 * models/Product.model.js

    Product এর schema — name, price, stock, images, category

    { name: String, price: Number, stock: Number, images: [String] }
 */

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name:          { type: String, required: true, trim: true },
    description:   { type: String, required: true },
    price:         { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0, default: null },
    images:        [{ type: String }], // Cloudinary URLs

    // ── Relation: Category ────────────────────────────────
    // populate("category") করলে Category এর সব data পাবে
    category: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "Category",
      required: true,
    },

    sizes:    [{ type: String, enum: ["S", "M", "L", "XL", "XXL"] }],
    colors:   [{ type: String, trim: true }],
    stock:    { type: Number, required: true, default: 0, min: 0 },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);



// {
//   "name": "Oversized Urban Tee",
//   "description": "Premium cotton oversized t-shirt for streetwear lovers.",
//   "price": 1200,
//   "discountPrice": 950,
//   "images": [
//     "https://res.cloudinary.com/urbanthread/image/upload/tee1.jpg",
//     "https://res.cloudinary.com/urbanthread/image/upload/tee2.jpg"
//   ],
//   "category": "64f1a2b3c4d5e6f7a8b9c0d1",
//   "sizes": ["S", "M", "L", "XL"],
//   "colors": ["black", "white", "olive"],
//   "stock": 50,
//   "featured": true,
//   "isActive": true
// }

// ⚠️ category তে Category এর আসল _id দিতে হবে