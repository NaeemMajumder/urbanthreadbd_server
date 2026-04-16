const productService = require("../../services/product.service");
const asyncHandler = require("../../utils/asyncHandler");

// ── সব Products ──────────────────────────────────────────────
const getAllProducts = asyncHandler(async (req, res) => {
  const data = await productService.getAllProducts(req.query);

  res.status(200).json({
    success: true,
    data,
  });
});

// ── একটা Product ─────────────────────────────────────────────
const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  res.status(200).json({
    success: true,
    data: product,
  });
});

// ── Product বানাও ─────────────────────────────────────────────
const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);

  res.status(201).json({
    success: true,
    message: "Product তৈরি হয়েছে",
    data: product,
  });
});

// ── Product Update ────────────────────────────────────────────
const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Product update হয়েছে",
    data: product,
  });
});

// ── Product Delete ────────────────────────────────────────────
const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product delete হয়েছে",
  });
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};