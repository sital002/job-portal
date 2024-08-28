import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import users from "../db/data/user.json";
import jobs from "../db/data/jobs.json";
import UserModel from "../db/model/user.model";
import JobModel from "../db/model/job.model";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
  await mongoose.connection.dropDatabase();
  const createdUsers = await UserModel.create(users);
  const createdJobs = await JobModel.create(jobs);
  if (!createdUsers && createdJobs) throw new Error("Error creating users");
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
