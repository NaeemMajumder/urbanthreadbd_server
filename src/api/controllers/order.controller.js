/**
 * controllers/order.controller.js

    Request থেকে cart/order data নেয়, service কে দেয়, order confirm পাঠায়

    const order = await orderService.create(req.user.id, req.body);
    res.json({ order });
 * 
 */

const orderService = require("../../services/order.service");
const asyncHandler = require("../../utils/asyncHandler");

// ── Order Create ──────────────────────────────────────────────
const createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder(req.user._id, req.body);

  res.status(201).json({
    success: true,
    message: "Order সফলভাবে হয়েছে",
    data: order,
  });
});

// ── আমার Orders ───────────────────────────────────────────────
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getMyOrders(req.user._id);

  res.status(200).json({
    success: true,
    data: orders,
  });
});

// ── সব Orders (Admin) ─────────────────────────────────────────
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getAllOrders();

  res.status(200).json({
    success: true,
    data: orders,
  });
});

// ── Order Status Update (Admin) ───────────────────────────────
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatus(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Order status update হয়েছে",
    data: order,
  });
});

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
