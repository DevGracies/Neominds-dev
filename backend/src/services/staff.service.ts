// src/services/staff.service.ts
import { Staff, IStaff } from '../models/staff.model.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const createStaffRecord = async (data: any, files: any) => {
  // console.log(data)
  // 1. Upload files to Cloudinary in parallel for speed
  // const [passportRes, guarantorRes] = await Promise.all([
  //   uploadToCloudinary(files.passportPhoto.path, 'staff/passports'),
  //   uploadToCloudinary(files.guarantorForm.path, 'staff/guarantors')
  // ]);

  // 2. Structure the data for the Model
  // const staffData = {
  //   ...data,
  //   personalInfo: { ...data, passportPhoto: passportRes.secure_url },
  //   guarantorForm: guarantorRes.secure_url,
  // };
  const staffData = {
    personalInfo: {
      surname: data.surname,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      passportPhoto: '', // passportRes?.secure_url
    },

    identification: {
      idType: data.idType,
      idNumber: data.idNumber,
      issueDate: data.issueDate ? new Date(data.issueDate) : undefined,
    },

    contact: {
      email: data.email,
      phoneNumber: data.phoneNumber,
      alternativeNumber: data.alternativeNumber,
    },

    maritalStatus: data.maritalStatus,

    spouseDetails: data.maritalStatus === 'Married'
      ? {
          name: data.spouseName,
          employer: data.spouseEmployer,
          phoneNumber: data.spousePhone,
        }
      : undefined,

    education: {
      qualification: data.qualification,
      schoolName: data.schoolName,
      graduationYear: data.graduationYear
        ? Number(data.graduationYear)
        : undefined,
      degreeClass: data.degreeClass,
    },

    financial: {
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      accountName: data.accountName,
    },

    nextOfKin: {
      name: data.nextOfKinName,
      address: data.nextOfKinAddress,
      phoneNumber: data.nextOfKinPhone,
      relationship: data.relationship,
    },

    guarantorForm: '', // guarantorRes?.secure_url
  };

  // console.log('FINAL STRUCTURED DATA:', staffData);
  // console.log(staffData)

  let resp= await Staff.create(staffData);
  console.log(resp)
  return resp
// };
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