/**
 * routes/order.routes.js

    Order related সব URL — সব protected route (login ছাড়া order করা যাবে না)

    router.post('/', authenticate, orderController.create);
    router.get('/my-orders', authenticate, orderController.getUserOrders);
 */

const { Router } = require("express");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

const router = Router();

router.use(authenticate);

// ── User Routes ───────────────────────────────────────────────
router.post("/", createOrder);
router.get("/my-orders", getMyOrders);

// ── Admin Routes ──────────────────────────────────────────────
router.get("/", authorize("admin"), getAllOrders);
router.patch("/:id/status", authorize("admin"), updateOrderStatus);

module.exports = router;
