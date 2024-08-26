import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_EXPIRY: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  EMAIL_USER: z.string(),
  EMAIL_PASSWORD: z.string(),
  EMAIL_SENDER: z.string(),
});

function parseEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success)
    throw new Error(
      "Missing Environement variable" + result.error.errors[0].message,
    );
  return result.data;
}
export const env = parseEnv();
