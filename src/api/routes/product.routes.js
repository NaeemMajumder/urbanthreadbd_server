/**
 * routes/product.routes.js

    Product এর সব URL define করে — কোনটা public, কোনটা protected

    router.get('/', productController.getAll);
    router.post('/', authenticate, productController.create);
 * 
 */

const { Router } = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

const router = Router();

// ── Public Routes ─────────────────────────────────────────────
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// ── Admin Protected Routes ────────────────────────────────────
router.post("/", authenticate, authorize("admin"), createProduct);
router.patch("/:id", authenticate, authorize("admin"), updateProduct);
router.delete("/:id", authenticate, authorize("admin"), deleteProduct);

module.exports = router;
