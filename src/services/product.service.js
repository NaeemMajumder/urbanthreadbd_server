/**
 * 
 * services/product.service.js

    Filter, search, pagination logic — controller এ না রেখে এখানে রাখো

    const products = await Product.find(filters).skip(skip).limit(limit);
 * 
 */

const Product = require("../models/Product.model");
const AppError = require("../utils/AppError");
const Category = require("../models/Category.model"); 

// ── সব Products ──────────────────────────────────────────────
const getAllProducts = async (query) => {
  const {
    category,
    featured,
    minPrice,
    maxPrice,
    size,
    color,
    search,
    sort,
    page = 1,
    limit = 10,
  } = query;

  const filter = {};

  // Search
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  // Filters
  if (category) {
    const categoryDoc = await Category.findOne({ slug: category });
    if (categoryDoc) {
      filter.category = categoryDoc._id;
    } else {
      filter.category = category; // ObjectId হলে directly use
    }
  }
  if (featured) filter.featured = featured === "true";
  if (size) {
    const sizeArray = size.split(","); // "S,M,L" → ['S', 'M', 'L']
    filter.sizes = { $in: sizeArray };
  }
  if (color) filter.colors = { $in: [color] };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // Active products শুধু দেখাবে
  filter.isActive = true;

  // ← Sort logic add করো
  let sortOption = { createdAt: -1 }; // default: newest first
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };
  if (sort === "name_asc") sortOption = { name: 1 };

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .populate("category", "name slug")
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));

  return {
    products,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    },
  };
};

// ── একটা Product ─────────────────────────────────────────────
const getProductById = async (id) => {
  const product = await Product.findById(id).populate("category", "name slug");
  if (!product) throw new AppError("Product পাওয়া যায়নি", 404);
  return product;
};

// ── Product বানাও ─────────────────────────────────────────────
const createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};

// ── Product Update ────────────────────────────────────────────
const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new AppError("Product পাওয়া যায়নি", 404);
  return product;
};

// ── Product Delete ────────────────────────────────────────────
// ── Hard Delete ───────────────────────────────────────────────
const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new AppError("Product পাওয়া যায়নি", 404);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
