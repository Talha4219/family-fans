import mongoose, { Schema, Document } from "mongoose";
export interface ITestimonial extends Document {
  name: string;
  content: string;
  rating: number;
  designation: string;
  isActive: boolean;
  createdAt: Date;
}
const TestimonialSchema: Schema = new Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  designation: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
