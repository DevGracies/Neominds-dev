import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import { User } from "../models/user.model.js";
import { Staff } from "../models/staff.model.js";
import { generateToken } from "../utils/token.js";
import bcrypt from "bcrypt";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      throw new Error("No users found");
    }
    return res.status(200).json({
      success: true,
      message: "Users fetched succcessfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};
// Register
export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
      });
    }

    const { name, email, password } = parsed.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
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
    const token = generateToken({ id: user._id.toString(), role: user.role });
    return res.status(201).json({
      success: true,
      token,
      message: "Account created successfully.",
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
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

    const token = generateToken({ id: user._id.toString(), role: user.role });
    console.log(token)
    return res.status(200).json({
      token,
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: `Login failed, ${error}`,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
