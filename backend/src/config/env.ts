import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    console.log(`Missing environment variable: ${key}`);
  }
});