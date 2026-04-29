import mongoose, { Schema, Document } from "mongoose";

export interface IComplaint extends Document {
  employee: string;
  role: string;
  text: string;
  status: "Pending" | "Resolved";
  date: string;
}

const ComplaintSchema = new Schema<IComplaint>({
  employee: { type: String, required: true },
  role: { type: String, required: true },
  text: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Resolved"], default: "Pending" },
  date: { type: String, required: true },
});

export default mongoose.model<IComplaint>("Complaint", ComplaintSchema);
