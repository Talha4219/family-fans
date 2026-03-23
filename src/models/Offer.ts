import mongoose, { Schema, Document } from "mongoose";
export interface IOffer extends Document {
  title: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue: number;
  applicableProducts: mongoose.Types.ObjectId[];
  expiryDate: Date;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const OfferSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: { type: Number, required: true },
    minOrderValue: { type: Number, default: 0 },
    applicableProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    expiryDate: { type: Date, required: true },
    usageLimit: { type: Number },
    usageCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
const Offer =
  mongoose.models.Offer || mongoose.model<IOffer>("Offer", OfferSchema);
export default Offer;
