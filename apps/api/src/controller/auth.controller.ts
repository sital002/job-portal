import type { CookieOptions, Request, Response } from "express";
import z from "zod";

import { asyncApiHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import UserModel from "../db/model/user.model";
import { ApiResponse } from "../utils/ApiResponse";
import { createTransport } from "../utils/nodemailer.config";
import { env } from "../utils/env";

const signUpSchema = z
  .object({
    displayName: z
      .string({
        required_error: "displayName is required",
      })
      .min(2, "Name must be at least 2 characters long")
      .max(64, "Name name must be at most 64 characters long"),
    email: z.string().email({
      message: "Please provide a valid email address",
    }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must be at most 64 characters long"),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(8, "Confirm password must be at least 8 characters long")
      .max(64, "Confirm password must be at most 64 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password must match",
    path: ["confirmPassword"],
  });

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

export const signUp = asyncApiHandler(async (req: Request, res: Response) => {
  const result = signUpSchema.safeParse(req.body);
  if (!result.success) throw new ApiError(400, result.error.errors[0].message);
  const { displayName, email, password } = result.data;
  const userExists = await UserModel.exists({ email });
  if (userExists) throw new ApiError(409, "User already exists");

  const verificationToken = crypto.randomUUID();

  const newUser = await UserModel.create({
    displayName,
    email,
    password,
    verificationToken,
  });
  if (!newUser) throw new ApiError(500, "Failed to create user");

  const accessToken = newUser.generateAccessToken();
  const refresh_token = newUser.generateAccessToken();
  createTransport.sendMail({
    to: email,
    from: env.EMAIL_USER,
    subject: "Email verification",
    html: `<h1>Email verification</h1>
  <p>Click the link below to verify your email</p>
  <a href="${env.BASE_URL}/api/v1/auth/verify-email?token=${verificationToken}">Verify email</a>
  `,
  });

  return res
    .status(201)
    .cookie("access_token", accessToken, cookieOptions)
    .cookie("refresh_token", refresh_token, cookieOptions)
    .json(new ApiResponse("Signup successfully"));
});

const signInSchema = z.object({
  email: z.string().email({
    message: "Please provide a valid email address",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must be at most 64 characters long"),
});
export const signIn = asyncApiHandler(async (req: Request, res: Response) => {
  const result = signInSchema.safeParse(req.body);
  if (!result.success) throw new ApiError(400, result.error.errors[0].message);

  const { email, password } = result.data;
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) throw new ApiError(401, "Invalid email or password");

  const accessToken = user.generateAccessToken();
  const refresh_token = user.generateAccessToken();
  return res
    .status(200)
    .cookie("access_token", accessToken, cookieOptions)
    .cookie("refresh_token", refresh_token, cookieOptions)
    .json(new ApiResponse("Signin successfully"));
});

export const verifyEmail = asyncApiHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "You are not logged in");
    const incomingToken = req.query.token;
    if (!incomingToken)
      throw new ApiError(400, "Verification token is required");
    const user = await UserModel.findById(req.user._id);
    if (!user) throw new ApiError(400, "User doesn't exists");
    if (user.emailVerified)
      throw new ApiError(400, "Email is already verified");
    if (user.verificationToken !== incomingToken)
      throw new ApiError(400, "Invalid token");
    user.emailVerified = true;
    const verifiedEmail = await user.save();
    if (!verifiedEmail) throw new ApiError(500, "Error verifying email");
    return res.status(200).send("Email verified successfully");
  },
);
