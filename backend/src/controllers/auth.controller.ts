import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import { User } from "../models/user.model.js";
import { Staff } from "../models/staff.model.js";
import { generateToken } from "../utils/token.js";
import bcrypt from "bcrypt";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
import { env } from "../config/env.js";

// Register
export const register = catchAsync(async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError("Invalid input data", 400);
  }

  const { name, email, password } = parsed.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already in use", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "staff",
  });
  const staff = await Staff.create({
    user: user.id,
    contact: {
      email,
    },
  } as any);
  const token = generateToken(
    { id: user._id.toString(), role: user.role },
    res,
  );
  return res.status(201).json({
    success: true,
    token,
    message: "Account created successfully.",
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }
    const { email, password } = parsed.data;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      new AppError("Invalid credentials", 400);
    }

    const token = generateToken(
      { id: user._id.toString(), role: user.role },
      res,
    );
    return res.status(200).json({
      token,
      success: true,
      message: "Login successful",
    });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
});
