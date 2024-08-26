import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import { seedDatabase } from "../../db/seed";
import { env } from "../../utils/env";

beforeAll(async () => {
  await mongoose.connect(env.DATABASE_URL);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Signin Controller", () => {
  it("should return 400 for signin with empty data", async () => {
    const response = await request(app).post("/api/v1/auth/signin").send({
      email: "",
      password: "",
    });
    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(400);
  });

  it("should return 401 for signin with wrong password", async () => {
    const response = await request(app).post("/api/v1/auth/signin").send({
      email: "testuser1@example.com",
      password: "WrongPassword",
    });
    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(401);
  });

  it("should return 404 for signin with non-existing user", async () => {
    const response = await request(app).post("/api/v1/auth/signin").send({
      email: "nonexisting@gmail.com",
      password: "Test@1234",
    });
    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(404);
  });

  it("should return 200 for successful signin", async () => {
    const response = await request(app).post("/api/v1/auth/signin").send({
      email: "testuser1@example.com",
      password: "password123",
    });
    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(200);
  });
});
