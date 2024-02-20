import { Request, Response, NextFunction } from "express";
import { Errors } from "../errors";
import User from "../models/User";

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Custom middleware executed");
  const { authtoken } = req.headers;

  if (!authtoken) {
    return res.send({ success: false, message: Errors.PermissionDenied });
  }

  const user = await User.findOne({ personalAccessKey: authtoken });

  if (!user) {
    return res.send({ success: false, message: Errors.PermissionDenied });
  }

  (req as any).user = user;

  next();
};
