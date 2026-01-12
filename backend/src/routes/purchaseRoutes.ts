import express from "express";
import {
  createRequest,
  getRequests,
  approveRequest,
} from "../controllers/requestController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

// Employee creates purchase request
router.post("/", protect, authorize("employee"), createRequest);

// Manager/Admin view all requests
router.get("/", protect, authorize("manager", "admin"), getRequests);

// Manager approve or reject (send status in body)
router.put("/:id", protect, authorize("manager"), approveRequest);

export default router;
