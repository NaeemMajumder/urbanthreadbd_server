const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true },
    slug:  { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String }, // Cloudinary URL

    // ── Self-reference (Sub-category support) ─────────────
    // Example: "T-Shirt" এর parent → "Men's Wear"
    parentCategory: {
      type:    mongoose.Schema.Types.ObjectId,
      ref:     "Category",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);



// {
//   "name": "T-Shirt",
//   "slug": "tshirt",
//   "image": "https://res.cloudinary.com/urbanthread/image/upload/tshirt.jpg",
//   "parentCategory": null
// }