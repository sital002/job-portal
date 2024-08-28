import mongoose, { model, Schema } from "mongoose";

export interface Ijob {
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  user: mongoose.Types.ObjectId;
}

const jobSchema = new Schema<Ijob>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: [true, "UserId is required"] },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: Date.now },
});

const JobModel = model<Ijob>("Job", jobSchema);
export default JobModel;
