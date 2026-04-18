/**
 * routes/index.js

    সব sub-routes কে একসাথে /api/v1 এর নিচে mount করে

    router.use('/auth', authRoutes);
    router.use('/products', productRoutes);
 */

const { Router } = require("express");
const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const categoryRoutes = require("./category.routes");
const cartRoutes = require("./cart.routes");
const orderRoutes = require("./order.routes");
const reviewRoutes = require("./review.routes");
const userRoutes = require("./user.routes");

const router = Router();

// /api/v1/auth
router.use("/auth", authRoutes);

// /api/v1/users
router.use("/users", userRoutes);

// /api/v1/products
router.use("/products", productRoutes);

// /api/v1/categories
router.use("/categories", categoryRoutes);

// /api/v1/cart
router.use("/cart", cartRoutes);

// /api/v1/orders
router.use("/orders", orderRoutes);

// /api/v1/reviews
router.use("/reviews", reviewRoutes);


module.exports = router;