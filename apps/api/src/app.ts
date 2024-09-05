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

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bookmarks", bookmarkRouter);
app.use("/api/v1/jobs", jobRouter);

app.use(
  "/api/v1/upload",
  asyncApiHandler(async (req, res) => {
    cloudinary.uploader.upload(
      "",
      {
        folder: "job-portal/resume",
      },
      (error, result) => {
        if (error) throw new ApiError(500, "Error uploading resume");
        console.log(result);
      },
    );
  }),
);

app.use(globalErrorHandler);

export default app;
