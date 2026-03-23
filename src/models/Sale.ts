import mongoose, { Schema, Document } from "mongoose";
export interface ISale extends Document {
  name: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  categoryIds?: string[];
  productIds?: mongoose.Types.ObjectId[];
  applyTo: "all" | "category" | "products";
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const SaleSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: { type: Number, required: true },
    categoryIds: { type: [String], default: [] },
    productIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    applyTo: {
      type: String,
      enum: ["all", "category", "products"],
      default: "all",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
const Sale = mongoose.models.Sale || mongoose.model<ISale>("Sale", SaleSchema);
export default Sale;
