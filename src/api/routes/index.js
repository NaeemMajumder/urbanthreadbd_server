/**
 * routes/index.js

    সব sub-routes কে একসাথে /api/v1 এর নিচে mount করে

    router.use('/auth', authRoutes);
    router.use('/products', productRoutes);
 */

const { Router } = require("express");
const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");

const router = Router();

// /api/v1/auth
router.use("/auth", authRoutes);

// /api/v1/products
router.use("/products", productRoutes);

// বাকি routes পরে add হবে
// router.use("/categories", categoryRoutes);
// router.use("/orders", orderRoutes);
// router.use("/cart", cartRoutes);

module.exports = router;
