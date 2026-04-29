import { AppError } from './AppError.js';

export const uploadToCloudinary = async (filePath: string, folder: string) => {
  try {
    // TODO: Implement actual Cloudinary upload
    // For now, return a mock response to prevent crashes
    return {
      secure_url: `https://placeholder.example.com/${folder}/file.jpg`,
      public_id: 'placeholder_id'
    };
  } catch (error) {
    throw new AppError('Failed to upload file to Cloudinary', 500);
  }
};
