import request from "supertest";
import app from "../../app";

let jobId: string;

const BASE_URL = "/api/v1/jobs";

describe("Job Controller", () => {
  describe("POST /jobs/new", () => {
    it("should return 401 for creating job without login", async () => {
      const response = await request(app).post(`${BASE_URL}/new`).send({
        title: "Test Job",
        description: "Test Job Description",
        company: "Test Company",
        location: "Test Location",
        salary: 10000,
      });
      expect(response.statusCode).toBe(401);
    });
  });

  describe("GET /jobs/browse", () => {
    it("should return 200 for browsing jobs", async () => {
      const response = await request(app).get(`${BASE_URL}/browse`);
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data).toBeInstanceOf(Array);
      jobId = response.body.data[0]._id;
    });
  });

  describe("GET /jobs/browse/:id", () => {
    it("should return 400 if the job id isn't a valid mongodb id", async () => {
      const response = await request(app).get(`${BASE_URL}/browse/22`);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBeDefined();
    });
    it("should return 404 if the job isn't present", async () => {
      const response = await request(app).get(`${BASE_URL}/browse/66cf3e10ea9c6908602cd09b`);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBeDefined();
    });
    it("should return 200 and the job given a valid id", async () => {
      const response = await request(app).get(`${BASE_URL}/browse/${jobId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data._id).toEqual(jobId);
    });
  });
});
