import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IApplication extends mongoose.Document {
  _id: Schema.Types.ObjectId;
  applicant: Schema.Types.ObjectId;
  job: Schema.Types.ObjectId;
  resume: string;
  coverLetter: string;
  status: "APPLIED" | "REJECTED" | "INTERWIEING" | "HIRED";
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema(
  {
    applicant: { type: Schema.Types.ObjectId, ref: "User", required: [true, "Applicant is required"] },
    job: { type: Schema.Types.ObjectId, ref: "Job", required: [true, "Job is required"] },
    resume: { type: String, required: [true, "Resume is required"] },
    coverLetter: { type: String, required: [true, "Cover letter is required"] },
    status: { type: String, enum: ["APPLIED", "REJECTED", "INTERVIEWING", "HIRED"], default: "APPLIED" },
  },
  { timestamps: true },
);

const ApplicationModel = mongoose.model<IApplication>("Application", applicationSchema);
export default ApplicationModel;
