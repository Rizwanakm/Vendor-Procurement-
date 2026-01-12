import { Response } from "express";
import PurchaseRequest from "../models/PurchaseRequest";
import { AuthRequest } from "../middleware/authMiddleware";

/**
 * Employee creates purchase request
 */
export const createRequest = async (req: AuthRequest, res: Response) => {
  try {
    const request = await PurchaseRequest.create({
      requestedBy: req.user._id,
      items: req.body.items,
    });

    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create request" });
  }
};

/**
 * Manager/Admin get all requests
 */
export const getRequests = async (_req: AuthRequest, res: Response) => {
  try {
    const requests = await PurchaseRequest.find()
      .populate("requestedBy", "name email role")
      .populate("approvedBy", "name");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

/**
 * Manager approve / reject
 */
export const approveRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body; // approved | rejected

    const request = await PurchaseRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    request.approvedBy = req.user.id;
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Approval failed" });
  }
};
