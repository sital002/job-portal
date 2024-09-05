import { NextFunction, Request, Response } from "express";
import { env } from "./env";

export type FunctionType = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export const asyncApiHandler = (func: FunctionType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error: unknown) {
      console.error(error);
      return next(error);
    }
  };
};
