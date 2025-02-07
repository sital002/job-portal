import { Router } from "express";
import { editUserDetail, signIn, signUp, verifyEmail } from "../controller/auth.controller";
import { authenticate } from "../middleware/authenticate";

const authRouter = Router();

authRouter.route("/signup").post(signUp);
authRouter.route("/signin").post(signIn);
authRouter.route("/verify-email").get(authenticate, verifyEmail);

authRouter.route("/me").get(authenticate, (req, res) => res.json(req.user));
authRouter.route("/logout").get(authenticate, (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  return res.json({ message: "Logged out" });
});
export default authRouter;
