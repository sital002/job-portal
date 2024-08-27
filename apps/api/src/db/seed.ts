import mongoose from "mongoose";

import UserModel from "./model/user.model";
import { env } from "../utils/env";
import users from "./data/user.json";

export async function seedDatabase(DB_URL: string) {
  if (mongoose.connection.readyState === 0) {
    const db = await mongoose.connect(DB_URL);
    if (!db) throw new Error("Error connecting to database");
  }
  const deleteUsers = await UserModel.deleteMany({});
  if (!deleteUsers) throw new Error("Error deleting users");
  if (deleteUsers) {
    const createdUsers = await UserModel.create(users);
    if (!createdUsers) throw new Error("Error creating users");
  }
}

seedDatabase(env.DATABASE_URL)
  .then(() => {
    console.log("Database seeded successfully");
  })
  .catch((err) => {
    console.log("Error seeding database", err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
