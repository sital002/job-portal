import { Router } from "express";
import { signIn, signUp, verifyEmail } from "../controller/auth.controller";

const authRouter = Router();

authRouter.route("/signup").post(signUp);
authRouter.route("/signin").post(signIn);
authRouter.route("/verify-email?token").get(verifyEmail);

export default authRouter;
