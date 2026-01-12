import express from "express";
import { getVendors, createVendor } from "../controllers/vendorController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

/**
 * @swagger
 * /vendors:
 *   get:
 *     summary: Get all vendors (admin)
 *     tags:
 *       - Vendors
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of vendors
 */
router.get("/", protect, authorize("admin"), getVendors);

/**
 * @swagger
 * /vendors:
 *   post:
 *     summary: Create vendor (admin)
 *     tags:
 *       - Vendors
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vendor created
 */
router.post("/", protect, authorize("admin"), createVendor);

export default router;
