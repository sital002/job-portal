import mongoose, { model, Schema } from "mongoose";

export interface Ijob {
  title: string;
  description: string;
  company: string;
  location: string;
  jobType: "full-time" | "part-time" | "contract" | "internship";
  salaryRange: {
    min: number;
    max: number;
  };
  createdAt: Date;
  updatedAt: Date;
  status: "OEPN" | "CLOSED" | "DELETED" | "HIRED";
  deletedAt: Date;
  user: mongoose.Types.ObjectId;
}

const jobSchema = new Schema<Ijob>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: [true, "UserId is required"] },
  company: { type: String, required: true },
  location: { type: String, required: true },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "internship"],
    required: true,
  },
  salaryRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  status: {
    type: String,
    enum: ["OEPN", "CLOSED", "DELETED", "HIRED"],
    default: "OEPN",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: Date.now },
});

const JobModel = model<Ijob>("Job", jobSchema);
export default JobModel;
