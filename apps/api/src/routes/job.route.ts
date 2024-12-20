import { Router } from "express";
import {
  applyJob,
  browseJobs,
  createJob,
  deleteJob,
  getJobs,
  getJobById,
  getJobCreatedByRecruiter,
  updateJob,
  getAppliedJobs,
  getAppliedJobById,
  getjobsCreatedByRecruiter,
  getApplicationById,
  getAllApplications,
  updateApplication,
  viewApplicationStatus,
} from "../controller/job.controller";
import { authenticate } from "../middleware/authenticate";
import upload from "../utils/multer";

const jobRouter = Router();

jobRouter.route("/browse").get(browseJobs);
jobRouter.route("/browse/:id").get(getJobById);
jobRouter.route("/").get(authenticate, getJobs);

// CANDIDATE ROUTES
jobRouter.route("/apply/:jobId").post(authenticate, upload.single("resume"), applyJob);
jobRouter.route("/applied-jobs").get(authenticate, getAppliedJobs);
jobRouter.route("/applied-jobs/:id").get(authenticate, getAppliedJobById);
jobRouter.route("/view-application-status/:id").get(authenticate, viewApplicationStatus);

// RECRUITER ROUTES
jobRouter.route("/new").post(authenticate, createJob);
jobRouter.route("/created-jobs").get(authenticate, getjobsCreatedByRecruiter);
jobRouter.route("/:id").delete(authenticate, deleteJob).put(authenticate, updateJob).get(authenticate, getJobCreatedByRecruiter);
jobRouter.route("/application/:id").get(authenticate, getApplicationById).put(authenticate, updateApplication);
jobRouter.route("/applications/:jobId").get(authenticate, getAllApplications);

export default jobRouter;
