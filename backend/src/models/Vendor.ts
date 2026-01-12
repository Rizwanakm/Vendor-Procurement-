// models/Vendor.ts
import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  products: [{ name: String, price: Number }],
  performanceScore: { type: Number, default: 0 },
});

export default mongoose.model("Vendor", VendorSchema);
