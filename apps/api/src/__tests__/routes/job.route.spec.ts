import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import { seedDatabase } from "../../db/seed";
import { env } from "../../utils/env";

beforeAll(async () => {
  try {
    console.log("Database connected successfully");
    await seedDatabase(env.TEST_DATABASE_URL);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error setting up database", error);
    throw error;
  }
});

afterAll(async () => {
  try {
    // await mongoose.connection.dropDatabase();
    console.log("Database cleared successfully");
    await mongoose.connection.close();
    console.log("Database connection closed successfully");
  } catch (error) {
    console.error("Error tearing down database", error);
    throw error;
  }
});

describe("Job Controller", () => {
  it("should return 401 for creating job without login", async () => {
    const response = await request(app).post("/api/v1/jobs").send({
      title: "Test Job",
      description: "Test Job Description",
      company: "Test Company",
      location: "Test Location",
      salary: 10000,
    });
    expect(response.statusCode).toBe(401);
  });
});
