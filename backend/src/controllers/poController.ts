import { Request, Response } from "express";
import PurchaseOrder from "../models/PurchaseOrder";
import PurchaseRequest from "../models/PurchaseRequest";

/* CREATE PO */
export const createPO = async (req: Request, res: Response) => {
  const { requestId } = req.body;

  if (!requestId) {
    return res.status(400).json({ message: "Request ID required" });
  }

  const request = await PurchaseRequest.findById(requestId);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  const po = await PurchaseOrder.create({
    requestId: request._id,
    poNumber: `PO-${Date.now()}`,
    status: "created",
  });

  res.status(201).json(po);
};

/* GET ALL PO */
export const getAllPO = async (_req: Request, res: Response) => {
  const pos = await PurchaseOrder.find()
    .populate("requestId")
    .populate("vendor");
  res.json(pos);
};

/* ASSIGN VENDOR */
export const assignVendor = async (req: Request, res: Response) => {
  const { vendor } = req.body;

  const po = await PurchaseOrder.findByIdAndUpdate(
    req.params.id,
    { vendor },
    { new: true }
  );

  if (!po) {
    return res.status(404).json({ message: "PO not found" });
  }

  res.json(po);
};

/* MARK DELIVERED */
export const markDelivered = async (req: Request, res: Response) => {
  const po = await PurchaseOrder.findByIdAndUpdate(
    req.params.id,
    { status: "delivered" },
    { new: true }
  );

  if (!po) {
    return res.status(404).json({ message: "PO not found" });
  }

  res.json(po);
};
