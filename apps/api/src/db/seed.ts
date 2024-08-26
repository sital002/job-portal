import mongoose from "mongoose";

import UserModel from "./model/user.model";
import { env } from "../utils/env";
import users from "./data/user.json";

export async function seedDatabase() {
  const db = await mongoose.connect(env.DATABASE_URL);
  if (!db) throw new Error("Error connecting to database");
  const deleteUsers = await UserModel.deleteMany({});
  if (!deleteUsers) throw new Error("Error deleting users");

  for (const user of users) {
    const newUser = await UserModel.create(user);
    if (!newUser) throw new Error("Error seeding database");
  }
}

seedDatabase()
  .then(() => {
    console.log("Database seeded successfully");
  })
  .catch((err) => {
    console.log("Error seeding database", err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
