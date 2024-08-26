import { NextFunction, Request, Response } from "express";
import { asyncApiHandler } from "../utils/AsyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../utils/env";
import UserModel from "../db/model/user.model";
export const authenticate = asyncApiHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken =
      req.cookies["access_token"] || req.headers["x-access-token"];
    if (!accessToken) throw new Error("You are not authenticated");
    const decoded = jwt.verify(
      accessToken,
      env.ACCESS_TOKEN_SECRET,
    ) as JwtPayload;
    if (!decoded) throw new Error("Invalid access token");
    const user = await UserModel.findById(decoded._id);
    if (!user) throw new Error("User not found");
    req.user = user;
    next();
  },
);
