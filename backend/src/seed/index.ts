import mongoose from "mongoose";
import { env } from "../config/env.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const seed = async () => {
  try{
    await mongoose.connect(env.MONGO_URI!);
  console.log("Connected to database");

  const name = "NeomindsHr";
  const email = "hr@noeminds.com";
  const password = "hrneominds123";

  const hashed = await bcrypt.hash(password, 10);
  let user = await User.findOne({ email });
  if (user) {
    console.log("user already exist");
    return;
  }

  user = await User.create({
    name,
    email,
    password: hashed,
    role: "staff",
  });

  console.log("User created successfully");

  await mongoose.disconnect();
  process.exit(0);
  } catch(error){
    console.error("Error seeding user", error)
  }
};

seed();