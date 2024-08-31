import z from "zod";
import JobModel from "../db/model/job.model";
import { ApiError } from "../utils/ApiError";
import { asyncApiHandler } from "../utils/AsyncHandler";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse";
import BookmarkModel from "../db/model/bookmark.model";

const bookmarkJobSchema = z.object({
  jobId: z
    .string({
      required_error: "jobId field is missing",
    })
    .min(1, "Job Id is required")
    .refine((value) => mongoose.isValidObjectId(value), {
      message: "Invalid Job Id",
    }),
});
export const addToBookmark = asyncApiHandler(async (req, res) => {
  const user = req.user;
  const result = bookmarkJobSchema.safeParse(req.body);
  if (!result.success) throw new ApiError(400, result.error.errors[0].message);
  if (!user) throw new ApiError(401, "You need to login to bookmark a job");
  const job = await JobModel.findById(result.data.jobId);
  if (!job) throw new ApiError(404, "Job not found");
  const isBookmarked = await BookmarkModel.findOne({ job: job._id, user: user._id });
  if (isBookmarked) throw new ApiError(400, "Job already bookmarked");
  const newBookmark = await BookmarkModel.create({ job: job._id, user: user._id });
  if (!newBookmark) throw new ApiError(500, "Error saving bookmark");
  res.status(201).json(new ApiResponse("Job bookmarked successfully"));
});

export const getBookmarks = asyncApiHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, "You are not logged in");
  const user = req.user;
  const bookmarks = await BookmarkModel.find({ user: user._id }).populate("job").exec();
  if (!bookmarks) throw new ApiError(404, "No bookmarks found");
  res.status(200).json(new ApiResponse("Bookmarks retrieved successfully", bookmarks));
});

export const removeFromBookmark = asyncApiHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, "You are not logged in");
  const result = bookmarkJobSchema.safeParse(req.params);
  if (!result.success) throw new ApiError(400, result.error.errors[0].message);
  const deletedBookmark = await BookmarkModel.findOneAndDelete({
    job: result.data.jobId,
    user: req.user._id,
  });
  if (!deletedBookmark) throw new ApiError(404, "Bookmark not found");
  res.status(200).json(new ApiResponse("Bookmark removed successfully", deletedBookmark));
});
