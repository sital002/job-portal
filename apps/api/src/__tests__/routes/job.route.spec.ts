import request from "supertest";
import app from "../../app";
import { Ijob } from "../../db/model/job.model";

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
    describe("GET /jobs/browse?minSalary&maxSalary", () => {
      it("should return 400 if the maxSalary is less than minSalary", async () => {
        const { body, statusCode } = await request(app).get(`${BASE_URL}/browse?minSalary=1000&maxSalary=100`);
        expect(statusCode).toBe(400);
        expect(body.message).toBeDefined();
      });
      it("should return 400 if the minSalary and maxSalary isnot a number", async () => {
        const { body, statusCode } = await request(app).get(`${BASE_URL}/browse?minSalary=not-number&maxSalary=not-a-number&jobType=internship`);
        expect(statusCode).toBe(400);
        expect(body.message).toBeDefined();
      });
      it("should return 200 if the minSalary and maxSalary is present and valid", async () => {
        const query = {
          minSalary: 1000,
          maxSalary: 100000,
        };
        const { body, statusCode } = await request(app).get(`${BASE_URL}/browse?minSalary=${query.minSalary}&maxSalary=${query.maxSalary}`);
        expect(statusCode).toBe(200);
        expect(body.data).toBeDefined();
        expect(body.data).toBeInstanceOf(Array);
        for (const job of body.data as Ijob[]) {
          expect(job.salaryRange.min).toBeGreaterThanOrEqual(query.minSalary);
          expect(job.salaryRange.max).toBeLessThanOrEqual(query.maxSalary);
        }
      });
    });

    describe("GET /jobs/browse?jobType", () => {
      const jobType = "internship";
      it("should return 400 for invalid jobType query params", async () => {
        const { body, statusCode } = await request(app).get(`${BASE_URL}/browse?jobType=invalid-type`);
        expect(statusCode).toBe(400);
        expect(body.message).toBeDefined();
      });
      it("should return 200 for valid jobType", async () => {
        const { body, statusCode } = await request(app).get(`${BASE_URL}/browse?jobType=${jobType}`);
        expect(statusCode).toBe(200);
        expect(body.data).toBeInstanceOf(Array);
        for (const job of body.data as Ijob[]) {
          expect(job.jobType).toEqual(jobType);
        }
      });
    });

    describe("GET /jobs/browse datePosted query params", () => {
      const datePosted = 30;
      it("should return 400 if datePosted is not number", async () => {
        const { body, statusCode } = await request(app).get(`${BASE_URL}/browse?datePosted=not-a-number`);
        expect(statusCode).toBe(400);
        expect(body.message).toBeDefined();
      });
      it("should return 200 if the datePosted is a valid number", async () => {
        const { body, statusCode } = await request(app).get(`${BASE_URL}/browse?datePosted=${datePosted}`);
        expect(statusCode).toBe(200);
        expect(body.data).toBeDefined();
        expect(body.data).toBeInstanceOf(Array);
        for (const job of body.data as Ijob[]) {
          expect(new Date(job.createdAt).getDate()).toBeLessThanOrEqual(datePosted);
        }
      });
    });
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
      const response = await request(app).get(`${BASE_URL}/browse/invalid-mongo-db-id`);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBeDefined();
    });
    it("should return 404 if the job isn't present", async () => {
      const response = await request(app).get(`${BASE_URL}/browse/aacfddddddddddffffffffff`);
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
