import express from "express";
import { getDonorCamps, getDonorHistory, getDonorProfile, getDonorStats, updateDonorProfile, registerForCamp, getDonorRegistrations } from "../controllers/donorController.js";
import { protectDonor } from "../middlewares/donorMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile", protectDonor, getDonorProfile)

router.put("/profile", protectDonor, updateDonorProfile);

router.get("/camps", protect, getDonorCamps);

router.post("/camps/:id/register", protectDonor, registerForCamp);
router.get("/registrations", protectDonor, getDonorRegistrations);

router.get("/history", protectDonor, getDonorHistory);

router.get("/stats", protectDonor, getDonorStats);



export default router;
