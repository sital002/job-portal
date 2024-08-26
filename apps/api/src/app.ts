import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import UserModel from "./db/model/user.model";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.status(200).send(users);
});

app.use(globalErrorHandler);

export default app;
