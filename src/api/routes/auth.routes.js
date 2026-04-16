/**
 * routes/auth.routes.js

    /register আর /login এর URL define করে, controller এ পাঠায়

    router.post('/register', authController.register);
    router.post('/login', authController.login);
 */

const { Router } = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = Router();

// POST /api/v1/auth/register
router.post("/register", register);

// POST /api/v1/auth/login
router.post("/login", login);

module.exports = router;
