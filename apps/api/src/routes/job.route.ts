import { Router } from "express";
import { applyJob, browseJobs, createJob, getJobById } from "../controller/job.controller";
import { authenticate } from "../middleware/authenticate";

const jobRouter = Router();

jobRouter.route("/browse").get(browseJobs);
jobRouter.route("/browse/:id").get(getJobById);
jobRouter.route("/new").post(authenticate, createJob);
jobRouter.route("/apply/:jobId").post(authenticate, applyJob);

export default jobRouter;
