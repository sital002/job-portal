import z from "zod";
import JobModel from "../db/model/job.model";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncApiHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";

export const browseJobs = asyncApiHandler(async (_req, res) => {
  const jobs = await JobModel.find().populate("user");
  res.status(200).json(new ApiResponse("Jobs retrived successfully", jobs));
});

const jobSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(2, "Title must be at least 2 characters long")
    .max(64, "Title must be at most 64 characters long"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(2, "Description must be at least 2 characters long")
    .max(1024, "Description must be at most 1024 characters long"),
  company: z
    .string({
      required_error: "Company is required",
    })
    .min(2, "Company must be at least 2 characters long")
    .max(64, "Company must be at most 64 characters long"),
  location: z
    .string({
      required_error: "Location is required",
    })
    .min(2, "Location must be at least 2 characters long")
    .max(64, "Location must be at most 64 characters long"),
  salary: z
    .number({
      required_error: "Salary is required",
    })
    .int()
    .positive("Salary must be a positive number"),
});
export const createJob = asyncApiHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, "You are not loggedin to create a job");
  if (req.user.role !== "RECRUITER") throw new ApiError(403, "You are not authorized to create a job");
  const result = jobSchema.safeParse(req.body);
  if (!result.success) throw new ApiError(400, result.error.errors[0].message);

  const job = await JobModel.create({
    title: result.data.title,
    user: req.user._id,
    description: result.data.description,
    company: result.data.company,
    location: result.data.location,
    salary: result.data.salary,
  });
  if (!job) throw new ApiError(500, "Error creating job");
  res.status(201).json(new ApiResponse("Job created successfully", job));
});

export const getJobById = asyncApiHandler(async (req, res) => {
  if (!req.params.id) throw new ApiError(400, "Job id is required");
  const job = await JobModel.findById(req.params.id).populate("user");
  if (!job) throw new ApiError(404, "Job not found");
  res.status(200).json(new ApiResponse("Job retrieved successfully", job));
});
