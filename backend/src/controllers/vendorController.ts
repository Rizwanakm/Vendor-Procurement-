import { Request, Response } from "express";
import Vendor from "../models/Vendor";

export const getVendors = async (_req: Request, res: Response) => {
  const vendors = await Vendor.find();
  res.json(vendors);
};

export const createVendor = async (req: Request, res: Response) => {
  const vendor = await Vendor.create(req.body);
  res.status(201).json(vendor);
};
