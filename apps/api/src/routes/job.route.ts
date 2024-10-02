import { Router } from "express";
import { applyJob, browseJobs, createJob, getJobById } from "../controller/job.controller";
import { authenticate } from "../middleware/authenticate";
import upload from "../utils/multer";

const jobRouter = Router();

jobRouter.route("/browse").get(browseJobs);
jobRouter.route("/browse/:id").get(getJobById);
jobRouter.route("/new").post(authenticate, createJob);
jobRouter.route("/apply/:jobId").post(authenticate, upload.single("resume"), applyJob);

export default jobRouter;
