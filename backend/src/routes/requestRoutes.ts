import express from "express";
import { createRequest, getRequests, approveRequest } from "../controllers/requestController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

/**
 * @swagger
 * /requests:
 *   post:
 *     summary: Employee creates a purchase request
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemName:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Request created
 *       500:
 *         description: Failed to create request
 */
router.post("/", protect, authorize("employee"), createRequest);

/**
 * @swagger
 * /requests:
 *   get:
 *     summary: Manager/Admin get all requests
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of requests
 */
router.get("/", protect, authorize("manager", "admin"), getRequests);

/**
 * @swagger
 * /requests/{id}:
 *   put:
 *     summary: Manager approves/rejects request
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
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
 *               status:
 *                 type: string
 *                 enum: [approved, rejected]
 *     responses:
 *       200:
 *         description: Request updated
 *       404:
 *         description: Request not found
 */
router.put("/:id", protect, authorize("manager"), approveRequest);

export default router;
