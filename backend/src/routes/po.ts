import express from "express";
import {
  createPO,
  getAllPO,
  assignVendor,
  markDelivered,
} from "../controllers/poController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", protect, createPO);
router.get("/", protect, getAllPO);
router.put("/:id/vendor", protect, assignVendor);
router.put("/:id/deliver", protect, markDelivered);

export default router;
