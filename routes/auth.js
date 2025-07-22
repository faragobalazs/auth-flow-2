import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route (requires authentication)
router.post("/logout", authMiddleware, logout);

export default router;
