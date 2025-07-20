const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route (requires authentication)
router.post("/logout", authMiddleware, logout);

module.exports = router;
