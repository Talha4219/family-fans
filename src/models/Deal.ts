import mongoose, { Schema, Document } from "mongoose";
export interface IDeal extends Document {
  title: string;
  slug: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  productIds: mongoose.Types.ObjectId[];
  startDate: Date;
  endDate: Date;
  maxQuantity?: number;
  soldQuantity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const DealSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: { type: Number, required: true },
    productIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    maxQuantity: { type: Number },
    soldQuantity: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
const Deal = mongoose.models.Deal || mongoose.model<IDeal>("Deal", DealSchema);
export default Deal;
