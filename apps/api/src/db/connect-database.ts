import mongoose from "mongoose";
import { env } from "../utils/env";

export function connectDatabase() {
  console.log("Connecting to database", env.DATABASE_URL);
  return mongoose.connect(env.DATABASE_URL);
}
