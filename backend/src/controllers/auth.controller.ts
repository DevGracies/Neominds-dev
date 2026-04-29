import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import { User } from "../models/user.model.js";
import { Staff } from "../models/staff.model.js";
import { generateToken } from "../utils/token.js";
import bcrypt from "bcrypt";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";

export const getUsers = catchAsync(async(req:Request, res:Response) => {
    const users = await User.find();
    if(!users || users.length === 0){
      throw new Error("No users found")
    }
    return res.status(200).json({
      success: true,
      message: "Users fetched succcessfully",
      users,
    })
})

export const getUser = catchAsync(async(req:Request, res:Response) => {
  const user = await User.findById((req as any).user._id);
  if(!user){
    return res.status(404).json({
      success: false,
      message: "User not found",
    })
  }

  return res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user,
  })
})
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
      surname: "N/A",
      firstName: "N/A",
      lastName: "N/A",
      phoneNumber: "N/A",
    },
  } as any);
  const token = generateToken(
    { id: user._id.toString(), role: user.role });
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
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(
      { id: user._id.toString(), role: user.role });
    return res.status(200).json({
      token,
      success: true,
      message: "Login successful",
    });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
});
