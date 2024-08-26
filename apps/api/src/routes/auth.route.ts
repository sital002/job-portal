import { Router } from "express";
import { signIn, signUp, verifyEmail } from "../controller/auth.controller";
import { authenticate } from "../middleware/authenticate";

const authRouter = Router();

authRouter.route("/signup").post(signUp);
authRouter.route("/signin").post(signIn);
authRouter.route("/verify-email").get(authenticate, verifyEmail);

export default authRouter;
