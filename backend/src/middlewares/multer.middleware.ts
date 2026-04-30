import multer from 'multer';
import { AppError } from '../utils/AppErrror';

// Store in memory temporary so we can pipe it to Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file type. Only images and PDFs are allowed!', 400), false);
  }
};
//how would i install mutler with zod even for typescript  and i don;t have AppError
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});