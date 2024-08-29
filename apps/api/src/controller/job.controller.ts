import z from "zod";
import JobModel from "../db/model/job.model";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncApiHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import mongoose from "mongoose";

const browseJobsSchema = z
  .object({
    location: z.string().min(3, "Location must be atleast 3 character long").optional(),
    jobType: z
      .enum(["full-time", "part-time", "contract", "internship"], {
        message: "Invalid job type",
      })
      .optional(),
    minSalary: z
      .string()
      .optional()
      .transform((value) => (value ? Number(value) : undefined))
      .refine((value) => value === undefined || !isNaN(value), {
        message: "minSalary must be a number",
        path: ["minSalary"],
      }),
    maxSalary: z
      .string()
      .optional()
      .transform((value) => (value ? Number(value) : undefined))
      .refine((value) => value === undefined || !isNaN(value), {
        message: "maxSalary must be a number",
        path: ["maxSalary"],
      }),
    title: z.string().optional(),
    datePosted: z
      .string()
      .optional()
      .transform((value) => (value ? Number(value) : undefined))
      .refine((value) => value === undefined || !isNaN(value), {
        message: "datePosted must be a number",
        path: ["datePosted"],
      })
      .refine((value) => value === undefined || value <= Date.now(), {
        message: "datePosted cannot be in the future",
        path: ["datePosted"],
      }),
  })
  .refine((data) => data.maxSalary === undefined || data.minSalary === undefined || data.maxSalary >= data.minSalary, {
    message: "maxSalary cannot be less than minSalary",
    path: ["maxSalary"],
  });

export const browseJobs = asyncApiHandler(async (req, res) => {
  const result = browseJobsSchema.safeParse(req.query);
  if (!result.success) throw new ApiError(400, result.error.errors[0].message);
  const { location, minSalary, maxSalary, title, datePosted, jobType } = result.data;

  const filter: any = {};

  if (location) filter.location = { $regex: location, $options: "i" };

  if (minSalary || maxSalary) {
    filter["salaryRange.min"] = { $gte: Number(minSalary) || 0 };
    filter["salaryRange.max"] = { $lte: Number(maxSalary) || Infinity };
  }
  if (jobType) filter.jobType = jobType;

  if (title) filter.title = { $regex: title, $options: "i" };
  if (datePosted) filter.createdAt = { $gte: new Date(new Date().setDate(new Date().getDate() - Number(datePosted))) };

  const jobs = await JobModel.find(filter).populate("user");
  res.status(200).json(new ApiResponse("Jobs retrieved successfully", jobs));
});

const jobSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(2, "Title must be at least 2 characters long")
    .max(64, "Title must be at most 64 characters long"),
  jobType: z.enum(["full-time", "part-time", "contract", "internship"], {
    message: "Invalid job type",
  }),
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
  salary: z.object({
    min: z.number().int().min(0).max(1000000),
    max: z.number().int().min(0).max(1000000),
  }),
});
export const createJob = asyncApiHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, "You are not loggedin to create a job");
  if (req.user.role !== "RECRUITER") throw new ApiError(403, "You are not authorized to create a job");
  const result = jobSchema.safeParse(req.body);
  if (!result.success) throw new ApiError(400, result.error.errors[0].message);

  const jobs = await JobModel.create({
    title: result.data.title,
    user: req.user._id,
    description: result.data.description,
    company: result.data.company,
    location: result.data.location,
    jobType: result.data.jobType,
    salaryRange: {
      min: result.data.salary.min,
      max: result.data.salary.max,
    },
  });
  if (!jobs) throw new ApiError(500, "Error creating job");
  res.status(201).json(new ApiResponse("Job created successfully", jobs));
});

export const getJobById = asyncApiHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) throw new ApiError(400, "Job id is required");
  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid job id");
  const job = await JobModel.findById(req.params.id).populate("user");
  if (!job) throw new ApiError(404, "Job not found");
  res.status(200).json(new ApiResponse("Job retrieved successfully", job));
});
