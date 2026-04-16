/**
 * models/Order.model.js

    Order এর schema — কোন user, কোন products, total price, status

    { user: ObjectId, items: [{ product: ObjectId, qty: Number }], status: String }
 */


const mongoose = require("mongoose");

// ── Sub-schema ───────────────────────────────────────────────
const addressSchema = new mongoose.Schema({
  label:       { type: String, enum: ["Home", "Office", "Other"], default: "Home" },
  fullAddress: { type: String, required: true },
  city:        { type: String, required: true },
  district:    { type: String, required: true },
});

// ── Main Schema ──────────────────────────────────────────────
const userSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    phone:        { type: String, required: true, unique: true, trim: true },
    email:        { type: String, trim: true, lowercase: true, sparse: true },
    passwordHash: { type: String, required: true },
    role:         { type: String, enum: ["user", "admin"], default: "user" },
    addresses:    [addressSchema],

    // ── Relations ─────────────────────────────────────────
    // User এর orders → Order.model এ userId দিয়ে query করা যাবে
    // User এর cart   → Cart.model এ userId দিয়ে query করা যাবে
    // User এর reviews → Review.model এ userId দিয়ে query করা যাবে
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);





// {
//   "name": "Rahim Ahmed",
//   "phone": "+8801712345678",
//   "email": "rahim@gmail.com",
//   "password": "rahim1234",
//   "addresses": [
//     {
//       "label": "Home",
//       "fullAddress": "House 12, Road 5, Mirpur-10",
//       "city": "Dhaka",
//       "district": "Dhaka"
//     }
//   ]
// }


// ⚠️ Frontend থেকে password আসবে — Backend এ bcrypt দিয়ে hash করে passwordHash এ save হবে