import z from "zod";
import JobModel from "../db/model/job.model";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncApiHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import mongoose from "mongoose";
import ApplicationModel from "../db/model/application.model";
import { uploadFile } from "../utils/upload-file";

export const browseJobsSchema = z.object({
  location: z.string().optional(),
  minSalary: z.number().optional(),
  maxSalary: z.number().optional(),
  title: z.string().optional(),
  datePosted: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : undefined))
    .refine((value) => value === undefined || !isNaN(value), {
      message: "datePosted must be a number",
      path: ["datePosted"],
    }),
  jobType: z.string().optional(),
  page: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 1))
    .refine((value) => value > 0, {
      message: "page must be a positive number",
      path: ["page"],
    }),
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 10))
    .refine((value) => value > 0, {
      message: "limit must be a positive number",
      path: ["limit"],
    }),
});
export const browseJobs = asyncApiHandler(async (req, res) => {
  const result = browseJobsSchema.safeParse(req.query);
  if (!result.success) throw new ApiError(400, result.error.errors[0].message);
  const { location, minSalary, maxSalary, title, datePosted, jobType, page, limit } = result.data;

  const filter: any = {};

  if (location) filter.location = { $regex: location, $options: "i" };

  if (minSalary || maxSalary) {
    filter["salaryRange.min"] = { $gte: Number(minSalary) || 0 };
    filter["salaryRange.max"] = { $lte: Number(maxSalary) || Infinity };
  }
  if (jobType) filter.jobType = jobType;

  if (title) filter.title = { $regex: title, $options: "i" };
  if (datePosted) filter.createdAt = { $gte: new Date(new Date().setDate(new Date().getDate() - Number(datePosted))) };

  const skip = (page - 1) * limit;
  const jobs = await JobModel.find(filter).skip(skip).limit(limit).populate("user").exec();

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
      required_error: "company is required",
    })
    .min(2, "Company must be at least 2 characters long")
    .max(64, "Company must be at most 64 characters long"),
  location: z
    .string({
      required_error: "location is required",
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
  const job = await JobModel.findById(req.params.id).populate("user").exec();
  if (!job) throw new ApiError(404, "Job not found");
  res.status(200).json(new ApiResponse("Job retrieved successfully", job));
});

const applyJobSchema = z.object({
  coverLetter: z
    .string({
      required_error: "coverLetter field is missing",
    })
    .min(2, "Cover letter must be at least 2 characters long")
    .max(1024, "Cover letter must be at most 1024 characters long"),
});
export const applyJob = asyncApiHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "No file uploaded");
  const filePath = req.file.destination + "/" + req.file.filename;
  if (!req.user) throw new ApiError(401, "You are not logged in");
  const jobId = req.params.jobId;
  if (!jobId) throw new ApiError(400, "jobId is required");
  if (!mongoose.Types.ObjectId.isValid(jobId)) throw new ApiError(400, "Invalid job id");
  const body = applyJobSchema.safeParse(req.body);
  if (!body.success) throw new ApiError(400, body.error.errors[0].message);
  const validJob = await JobModel.findById(jobId);
  if (!validJob) throw new ApiError(404, "Job not found");
  const hasAlreadyApplied = await ApplicationModel.findOne({
    applicant: req.user._id,
    job: jobId,
  });
  if (hasAlreadyApplied) throw new ApiError(400, "You have already applied for this job");
  const { error, result } = await uploadFile(filePath, "resume");
  if (error) throw new ApiError(500, "Error uploading file to cloudinary");
  const application = await ApplicationModel.create({
    applicant: req.user._id,
    job: jobId,
    resume: result.secure_url,
    coverLetter: body.data.coverLetter,
  });

  if (!application) throw new ApiError(500, "Error applying for job");

  res.status(201).json(new ApiResponse("Job applied successfully", application));
});
