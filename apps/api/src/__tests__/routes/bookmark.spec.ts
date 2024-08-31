import request from "supertest";
import app from "../../app";
import UserModel from "../../db/model/user.model";
import JobModel from "../../db/model/job.model";

const BASE_URL = `/api/v1/bookmarks`;

describe("Bookmark Controller", () => {
  let access_token: string;
  let refresh_token: string;

  beforeAll(async () => {
    const user = await UserModel.findOne({
      role: "USER",
    });
    if (!user) {
      throw new Error("User account not found");
    }

    access_token = user.generateAccessToken();
    refresh_token = user.generateRefreshToken();
  });

  describe("POST /bookmarks/new", () => {
    it("should return 401 for creating bookmark without login", async () => {
      const response = await request(app).post(`${BASE_URL}/new`).send({
        jobId: "60f6b8c2d9b0e6d4c3e5b6e7",
      });
      expect(response.statusCode).toBe(401);
    });

    it("should return 400 for creating bookmark with invalid jobId", async () => {
      const response = await request(app)
        .post(`${BASE_URL}/new`)
        .set("Cookie", [`access_token=${access_token}`])
        .send({
          jobId: "invalid_job_id",
        });
      expect(response.statusCode).toBe(400);
    });

    it("should return 201 for creating bookmark with valid jobId", async () => {
      const job = await JobModel.findOne({});
      if (!job) {
        throw new Error("Job not found");
      }

      const response = await request(app)
        .post(`${BASE_URL}/new`)
        .set("Cookie", [`access_token=${access_token}`])
        .send({
          jobId: job._id,
        });
      expect(response.statusCode).toBe(201);
    });
  });

  describe("GET /bookmarks", () => {
    it("should return 401 for getting bookmarks without login", async () => {
      const response = await request(app).get(`${BASE_URL}`).send();
      expect(response.statusCode).toBe(401);
    });

    it("should return 200 for getting bookmarks with login", async () => {
      const response = await request(app)
        .get(`${BASE_URL}`)
        .set("Cookie", [`access_token=${access_token}`]);
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe("/DELETE /bookmarks/:jobId", () => {
    it("should return 401 for deleting bookmark without login", async () => {
      const { body, statusCode } = await request(app).delete(`${BASE_URL}/60f6b8c2d9b0e6d4c3e5b6e7`).send();
      expect(statusCode).toBe(401);
      expect(body.message).toBeDefined();
    });
    it("should return 400 for deleting bookmark with invalid jobId", async () => {
      const { body, statusCode } = await request(app)
        .delete(`${BASE_URL}/invalid_job_id`)
        .set("Cookie", [`access_token=${access_token}`])
        .send();
      expect(statusCode).toBe(400);
      expect(body.message).toBeDefined();
    });
    it("should return 200 for deleting bookmark with valid jobId", async () => {
      const job = await JobModel.findOne({});
      if (!job) {
        throw new Error("Job not found");
      }

      const { body, statusCode } = await request(app)
        .delete(`${BASE_URL}/${job._id}`)
        .set("Cookie", [`access_token=${access_token}`])
        .send();
      expect(statusCode).toBe(200);
      expect(body.message).toBeDefined();
    });
  });
});
