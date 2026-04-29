import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

// User Schema type
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "staff";
  isActive: boolean;
  isEmailVerified: boolean;

  lastLogin?: Date;
  passwordChangedAt?: Date;
}

// User Schema model
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "staff"],
      default: "staff",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: true,
    },

    lastLogin: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
