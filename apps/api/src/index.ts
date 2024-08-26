import express from "express";
import cors from "cors";
import { logger } from "./utils/logger";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;
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

app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
