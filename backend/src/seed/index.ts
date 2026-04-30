import mongoose from "mongoose";
import { env } from "../config/env.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const seed = async () => {
  try {
    await mongoose.connect(env.MONGO_URI!);
    console.log("Connected to database");

    // Default admin user
    const adminData = {
      name: "HR Admin",
      email: "hr@neominds.com",
      password: "hrneominds123",
      role: "admin" as const,
    };

    const existingUser = await User.findOne({ email: adminData.email });
    
    if (existingUser) {
      console.log(`✓ Admin user already exists`);
    } else {
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      
      await User.create({
        name: adminData.name,
        email: adminData.email,
        password: hashedPassword,
        role: adminData.role,
      });

      console.log(`✓ Created admin user: ${adminData.email}`);
    }

    console.log("\n🎉 Seeding completed successfully!");
    console.log("\n📝 Admin Login:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("  Email: hr@neominds.com");
    console.log("  Password: hrneominds123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
    process.exit(1);
  }
};

seed();