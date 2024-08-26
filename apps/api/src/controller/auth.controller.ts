import type { CookieOptions, Request, Response } from "express";
import z from "zod";

import { asyncApiHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import UserModel from "../db/model/user.model";
import { ApiResponse } from "../utils/ApiResponse";

const signUpSchema = z
  .object({
    displayName: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(64, "Name name must be at most 64 characters long"),
    email: z.string().email({
      message: "Please provide a valid email address",
    }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must be at most 64 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long")
      .max(64, "Confirm password must be at most 64 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

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
  return res
    .status(201)
    .json(new ApiResponse("User created successfully", newUser));
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

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  const accessToken = "test";
  const refresh_token = "test";
  return res
    .status(200)
    .cookie("access_token", accessToken, cookieOptions)
    .cookie("refresh_token", refresh_token, cookieOptions)
    .json(new ApiResponse("Sign in successful", user));
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
    return res.status(200).json(new ApiResponse("Email verified successfully"));
  },
);
