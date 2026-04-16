/**
 * 
 * services/order.service.js

    Stock check করা, total calculate করা, order save করা — সব এখানে

    if (product.stock < qty) throw new AppError('Stock নেই', 400);
 * 
 */

const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");
const AppError = require("../utils/AppError");

// ── Order Create ──────────────────────────────────────────────
const createOrder = async (userId, { paymentMethod, deliveryAddress }) => {
  // 1. Cart খোঁজো
  const cart = await Cart.findOne({ userId }).populate("items.productId");
  if (!cart || cart.items.length === 0) {
    throw new AppError("Cart খালি আছে", 400);
  }

  // 2. Stock check করো এবং order items বানাও
  const orderItems = [];
  for (const item of cart.items) {
    const product = item.productId;

    if (!product || !product.isActive) {
      throw new AppError(`${product.name} আর available নেই`, 400);
    }
    if (product.stock < item.quantity) {
      throw new AppError(`${product.name} এর stock পর্যাপ্ত নেই`, 400);
    }

    orderItems.push({
      productId: product._id,
      name: product.name,
      image: product.images[0] || "",
      price: product.discountPrice || product.price,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
    });
  }

  // 3. Total calculate করো
  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // 4. Order save করো
  const order = await Order.create({
    userId,
    items: orderItems,
    totalAmount,
    deliveryCharge: 60,
    paymentMethod,
    deliveryAddress,
  });

  // 5. Stock কমাও
  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.productId._id, {
      $inc: { stock: -item.quantity },
    });
  }

  // 6. Cart clear করো
  cart.items = [];
  await cart.save();

  return order;
};

// ── আমার Orders ───────────────────────────────────────────────
const getMyOrders = async (userId) => {
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  return orders;
};

// ── সব Orders (Admin) ─────────────────────────────────────────
const getAllOrders = async () => {
  const orders = await Order.find()
    .populate("userId", "name phone")
    .sort({ createdAt: -1 });
  return orders;
};

// ── Order Status Update (Admin) ───────────────────────────────
const updateOrderStatus = async (orderId, { orderStatus, paymentStatus }) => {
  const order = await Order.findById(orderId);
  if (!order) throw new AppError("Order পাওয়া যায়নি", 404);

  if (orderStatus) order.orderStatus = orderStatus;
  if (paymentStatus) order.paymentStatus = paymentStatus;

  await order.save();
  return order;
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
