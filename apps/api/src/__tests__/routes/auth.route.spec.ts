import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import { seedDatabase } from "../../db/seed";
import { env } from "../../utils/env";

beforeAll(async () => {
  try {
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
    console.log("Database dropped successfully");
    await mongoose.connection.close();
    console.log("Database connection closed successfully");
  } catch (error) {
    console.error("Error tearing down database", error);
    throw error;
  }
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

describe("Signup Controller", () => {
  it("should return 400 for signup with invalid data", async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      email: "invalid-email",
      password: "short",
      displayName: "",
      confirmPassword: "short",
    });
    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(400);
  });

  it("should return 409 for signup with existing email", async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      displayName: "Test User",
      email: "testuser1@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(409);
  });

  it("should return 201 for successful signup", async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      email: "newuser500@example.com",
      displayName: "New User",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(201);
    expect(response.headers["set-cookie"]).toBeDefined();
  });
});
