import { faker } from "@faker-js/faker";
import UserModel from "./model/user.model";
import { env } from "../utils/env";
import mongoose from "mongoose";

function createUser(total: number) {
  let users = [];
  for (let i = 0; i < total; i++) {
    users.push({
      displayName: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      verificationToken: crypto.randomUUID(),
    });
  }
  return users;
}
async function seedDatabase() {
  const users = createUser(10);

  const db = await mongoose.connect(env.DATABASE_URL);
  if (!db) throw new Error("Error connecting to database");
  const deleteUsers = await UserModel.deleteMany({});
  if (!deleteUsers) throw new Error("Error deleting users");
  const newUsers = await UserModel.insertMany(users);
  if (!newUsers) throw new Error("Error seeding database");
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
