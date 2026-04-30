// src/services/staff.service.ts
import { Staff, IStaff } from '../models/staff.model.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const createStaffRecord = async (data: any, files: any) => {
  // 1. Upload files to Cloudinary in parallel for speed
  const [passportRes, guarantorRes] = await Promise.all([
    uploadToCloudinary(files.passportPhoto.path, 'staff/passports'),
    uploadToCloudinary(files.guarantorForm.path, 'staff/guarantors')
  ]);

  // 2. Structure the data for the Model
  const staffData = {
    ...data,
    personalInfo: { ...data, passportPhoto: passportRes.secure_url },
    guarantorForm: guarantorRes.secure_url,
  };

  return await Staff.create(staffData);
};

export const getAllStaffRecords = async (query: any) => {
  const { page = 1, limit = 10, search } = query;
  const filter = { isDeleted: false };
  
  if (search) {
    (filter as any)['personalInfo.surname'] = { $regex: search, $options: 'i' };
  }

  return await Staff.find(filter)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });
};