import mongoose, { Schema, Document } from "mongoose";

export interface IPurchaseRequest extends Document {
  requestedBy: mongoose.Types.ObjectId;
  items: {
    itemName: string;
    quantity: number;
  }[];
  status: "pending" | "approved" | "rejected";
  approvedBy?: mongoose.Types.ObjectId;
}

const PurchaseRequestSchema = new Schema<IPurchaseRequest>(
  {
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPurchaseRequest>(
  "PurchaseRequest",
  PurchaseRequestSchema
);
