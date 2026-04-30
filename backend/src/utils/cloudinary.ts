// src/utils/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadToCloudinary = async (
  filePath: string,
  folder: string
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
    });

    // delete local file after upload (important cleanup)
    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw new Error('File upload failed');
  }
};