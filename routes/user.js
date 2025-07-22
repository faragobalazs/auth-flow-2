import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// All user routes require authentication
router.use(authMiddleware);

// Protected route that returns user profile with userId
router.get("/profile", getUserProfile);

export default router;
