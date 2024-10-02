import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import jobRouter from "./routes/job.route";
import bookmarkRouter from "./routes/bookmark.route";
import { configureCloudinary } from "./utils/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./utils/ApiError";
import { asyncApiHandler } from "./utils/AsyncHandler";
import upload from "./utils/multer";
import fs from "fs";
import { uploadFile } from "./utils/upload-file";
import { ApiResponse } from "./utils/ApiResponse";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

configureCloudinary();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bookmarks", bookmarkRouter);
app.use("/api/v1/jobs", jobRouter);

app.use(
  "/upload",
  upload.single("resume"),
  asyncApiHandler(async (req, res) => {
    if (!req.file) throw new ApiError(400, "No file uploaded");
    const filePath = req.file.destination + "/" + req.file.filename;
    const { error, result } = await uploadFile(filePath, "resume");
    if (error) throw new ApiError(500, "Error uploading file to cloudinary");
    return res.status(200).json(new ApiResponse("File uploaded successfully", result));
  }),
);

app.use(globalErrorHandler);

export default app;
