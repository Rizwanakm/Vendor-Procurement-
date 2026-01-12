import express from "express";
import {
  createPO,
  getAllPO,
  assignVendor,
  markDelivered,
} from "../controllers/poController";
import auth from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", auth("admin"), createPO);
router.get("/", auth("admin"), getAllPO);
router.put("/:id/vendor", auth("admin"), assignVendor);
router.put("/:id/deliver", auth("admin"), markDelivered);

export default router;
