import express from "express";
import cors from "cors";
import { logger } from "./utils/logger";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use(logger);

app.use(express.json());
app.use(cookieParser());

app.use(globalErrorHandler);

export default app;
