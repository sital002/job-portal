import mongoose from "mongoose";
import { env } from "../utils/env";

export function connectDatabase() {
  return mongoose.connect(env.DATABASE_URL);
}
