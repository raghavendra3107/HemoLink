import express from "express";
import { register, login, getProfile, getMapData } from "../controllers/authContoller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// PROFILE (Protected Route)
router.get("/profile", protect, getProfile);

// Public Map Data
router.get("/map-data", getMapData);

export default router;
