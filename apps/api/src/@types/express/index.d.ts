// index.d.ts
import { Request } from "express";
import { IUser } from "../../db/model/user.model";
export {};

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
