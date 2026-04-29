import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

dotenv.config();

type PayloadType = {
  id: string;
  role: string;
};
export const generateToken = (payload: PayloadType) => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET as string, {
    expiresIn: "7d",
  });
};
