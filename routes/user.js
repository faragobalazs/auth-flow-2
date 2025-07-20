const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// All user routes require authentication
router.use(authMiddleware);

// Protected route that returns user profile with userId
router.get("/profile", getUserProfile);

module.exports = router;
