import { Router } from "express";
import { applyJob, browseJobs, createJob, deleteJob, getJobById, updateJob } from "../controller/job.controller";
import { authenticate } from "../middleware/authenticate";
import upload from "../utils/multer";

const jobRouter = Router();

jobRouter.route("/browse").get(browseJobs);
jobRouter.route("/browse/:id").get(getJobById);
jobRouter.route("/new").post(authenticate, createJob);
jobRouter.route("/apply/:jobId").post(authenticate, upload.single("resume"), applyJob);
jobRouter.route("/:id").delete(authenticate, deleteJob).put(authenticate, updateJob);

export default jobRouter;
