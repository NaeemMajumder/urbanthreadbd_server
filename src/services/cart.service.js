const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");
const AppError = require("../utils/AppError");

// ── Cart দেখো ─────────────────────────────────────────────────
const getCart = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate(
    "items.productId",
    "name price discountPrice images stock isActive"
  );

  if (!cart) return { items: [] };
  return cart;
};

// ── Item Add করো ──────────────────────────────────────────────
const addToCart = async (userId, { productId, quantity, size, color }) => {
  // 1. Product আছে কিনা check করো
  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    throw new AppError("Product পাওয়া যায়নি", 404);
  }

  // 2. Stock আছে কিনা check করো
  if (product.stock < quantity) {
    throw new AppError("পর্যাপ্ত stock নেই", 400);
  }

  // 3. Cart খোঁজো — না থাকলে নতুন বানাও
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  // 4. Same product, size, color already আছে কিনা check করো
  const existingItem = cart.items.find(
    (item) =>
      item.productId.toString() === productId &&
      item.size === size &&
      item.color === color
  );

  if (existingItem) {
    // Already আছে → quantity বাড়াও
    existingItem.quantity += quantity;
  } else {
    // নেই → নতুন item add করো
    cart.items.push({ productId, quantity, size, color });
  }

  await cart.save();
  return getCart(userId);
};

// ── Quantity Update করো ───────────────────────────────────────
const updateCartItem = async (userId, productId, { quantity, size, color }) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new AppError("Cart পাওয়া যায়নি", 404);

  const item = cart.items.find(
    (item) =>
      item.productId.toString() === productId &&
      item.size === size &&
      item.color === color
  );
  if (!item) throw new AppError("Item পাওয়া যায়নি", 404);

  item.quantity = quantity;
  await cart.save();
  return getCart(userId);
};

// ── একটা Item Remove করো ─────────────────────────────────────
const removeFromCart = async (userId, productId, { size, color }) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new AppError("Cart পাওয়া যায়নি", 404);

  cart.items = cart.items.filter(
    (item) =>
      !(
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
      )
  );

  await cart.save();
  return getCart(userId);
};

// ── Cart Clear করো ────────────────────────────────────────────
const clearCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new AppError("Cart পাওয়া যায়নি", 404);

  cart.items = [];
  await cart.save();
  return { items: [] };
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};