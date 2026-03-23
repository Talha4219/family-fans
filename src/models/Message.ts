import mongoose, { Schema, Document } from "mongoose";
export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "unread" | "read";
  createdAt: Date;
}
const MessageSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["new", "unread", "read"], default: "new" },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);
