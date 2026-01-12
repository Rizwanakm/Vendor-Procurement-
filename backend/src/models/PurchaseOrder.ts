import mongoose, { Schema, Document } from "mongoose";

export interface IPurchaseOrder extends Document {
  requestId: mongoose.Types.ObjectId;
  poNumber: string;
  vendor?: string;
  status: "created" | "delivered";
}

const PurchaseOrderSchema = new Schema(
  {
    requestId: {
      type: Schema.Types.ObjectId,
      ref: "PurchaseRequest",
      required: true,
    },
    poNumber: { type: String, required: true },
    vendor: { type: String },
    status: {
      type: String,
      enum: ["created", "delivered"],
      default: "created",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPurchaseOrder>(
  "PurchaseOrder",
  PurchaseOrderSchema
);
