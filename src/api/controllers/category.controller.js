const categoryService = require("../../services/category.service");
const asyncHandler = require("../../utils/asyncHandler");

// ── সব Categories ─────────────────────────────────────────────
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories();

  res.status(200).json({
    success: true,
    data: categories,
  });
});

// ── একটা Category ─────────────────────────────────────────────
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);

  res.status(200).json({
    success: true,
    data: category,
  });
});

// ── Category বানাও ────────────────────────────────────────────
const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);

  res.status(201).json({
    success: true,
    message: "Category তৈরি হয়েছে",
    data: category,
  });
});

// ── Category Update ───────────────────────────────────────────
const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Category update হয়েছে",
    data: category,
  });
});

// ── Category Delete ───────────────────────────────────────────
const deleteCategory = asyncHandler(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);

  res.status(200).json({
    success: true,
    message: "Category delete হয়েছে",
  });
});

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};