import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { Response } from "express";

dotenv.config();

type PayloadType = {
  id: string;
  role: string;
};
export const generateToken = (payload: PayloadType, res: Response) => {
  const token = jwt.sign(payload, env.JWT_ACCESS_SECRET as string, {
    expiresIn: "7d",
  });

  if (res) {
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  return token;
};
