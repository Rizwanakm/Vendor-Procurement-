// src/routes/poRoutes.ts
import express from "express";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";
import {
  createPO,
  getAllPO,
  assignVendor,
  markDelivered,
} from "../controllers/poController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Purchase Orders
 *   description: Manage Purchase Orders
 */

/**
 * @swagger
 * /api/po/create:
 *   post:
 *     summary: Create a new Purchase Order
 *     tags: [Purchase Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestId:
 *                 type: string
 *     responses:
 *       201:
 *         description: PO created
 *       400:
 *         description: Missing request ID
 */
router.post("/create", protect, authorize("admin"), createPO);

/**
 * @swagger
 * /api/po:
 *   get:
 *     summary: Get all POs
 *     tags: [Purchase Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of POs
 */
router.get("/", protect, authorize("admin"), getAllPO);

/**
 * @swagger
 * /api/po/{id}/vendor:
 *   put:
 *     summary: Assign vendor
 *     tags: [Purchase Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vendor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vendor assigned
 */
router.put("/:id/vendor", protect, authorize("admin"), assignVendor);

/**
 * @swagger
 * /api/po/{id}/deliver:
 *   put:
 *     summary: Mark PO delivered
 *     tags: [Purchase Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PO marked delivered
 */
router.put("/:id/deliver", protect, authorize("admin"), markDelivered);

export default router;
