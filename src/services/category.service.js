const Category = require("../models/Category.model");
const AppError = require("../utils/AppError");

// ── সব Categories ─────────────────────────────────────────────
const getAllCategories = async () => {
  const categories = await Category.find()
    .populate("parentCategory", "name slug")
    .sort({ createdAt: -1 });
  return categories;
};

// ── একটা Category ─────────────────────────────────────────────
const getCategoryById = async (id) => {
  const category = await Category.findById(id).populate(
    "parentCategory",
    "name slug",
  );
  if (!category) throw new AppError("Category পাওয়া যায়নি", 404);
  return category;
};

// ── Category বানাও ────────────────────────────────────────────
const createCategory = async (data) => {
  // name থেকে automatic slug বানাও
  const slug = data.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // space/special char → hyphen
    .replace(/^-+|-+$/g, ""); // শুরু/শেষের hyphen সরাও

  const existing = await Category.findOne({ slug });
  if (existing) throw new AppError("এই নামে already category আছে", 400);

  const category = await Category.create({ ...data, slug });
  return category;
};

// ── Category Update ───────────────────────────────────────────
const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!category) throw new AppError("Category পাওয়া যায়নি", 404);
  return category;
};

// ── Category Delete ───────────────────────────────────────────
const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new AppError("Category পাওয়া যায়নি", 404);
  return category;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
