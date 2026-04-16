const { Router } = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cart.controller");
const authenticate = require("../middlewares/authenticate");

const router = Router();

// সব route Protected — login লাগবে
router.use(authenticate);

// ⚠️ এখানে router.use(authenticate) একবার লিখলেই সব route protected হয়ে যায় — প্রতিটা route এ আলাদা করে লিখতে হয় না। Product আর Category routes এও এভাবে করা যেত, কিন্তু ওখানে public আর protected মিশ্রিত ছিল তাই আলাদা লিখেছিলাম।

// ── Cart Routes ───────────────────────────────────────────────
router.get("/", getCart);
router.post("/", addToCart);
router.delete("/", clearCart);
router.patch("/:productId", updateCartItem);
router.delete("/:productId", removeFromCart);

module.exports = router;