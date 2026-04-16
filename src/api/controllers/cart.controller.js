const cartService = require("../../services/cart.service");
const asyncHandler = require("../../utils/asyncHandler");

// ── Cart দেখো ─────────────────────────────────────────────────
const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.user._id);

  res.status(200).json({
    success: true,
    data: cart,
  });
});

// ── Item Add করো ──────────────────────────────────────────────
const addToCart = asyncHandler(async (req, res) => {
  const cart = await cartService.addToCart(req.user._id, req.body);

  res.status(200).json({
    success: true,
    message: "Cart এ item add হয়েছে",
    data: cart,
  });
});

// ── Quantity Update করো ───────────────────────────────────────
const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.updateCartItem(
    req.user._id,
    req.params.productId,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Cart update হয়েছে",
    data: cart,
  });
});

// ── একটা Item Remove করো ─────────────────────────────────────
const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await cartService.removeFromCart(
    req.user._id,
    req.params.productId,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Item remove হয়েছে",
    data: cart,
  });
});

// ── Cart Clear করো ────────────────────────────────────────────
const clearCart = asyncHandler(async (req, res) => {
  await cartService.clearCart(req.user._id);

  res.status(200).json({
    success: true,
    message: "Cart clear হয়েছে",
  });
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};