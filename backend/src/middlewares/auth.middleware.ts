// middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { User } from "../models/user.model.js";

export const validateAuth = async(req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Not authorized", 401));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET as string) as {
      id: string;
      role: string;
    };

    const user = await User.findById(decoded.id);

    (req as any).user = user;

    next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
};