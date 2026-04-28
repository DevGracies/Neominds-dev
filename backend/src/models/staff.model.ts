// src/models/staff.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IStaff extends Document {
  personalInfo: {
    surname: string; firstName: string; lastName: string;
    passportPhoto: string; address: string; dateOfBirth: Date;
  };
  identification: { idType: string; idNumber: string; issueDate: Date };
  contact: { email: string; phoneNumber: string; alternativeNumber?: string };
  maritalStatus: 'Single' | 'Married';
  spouseDetails?: { name: string; employer: string; phoneNumber: string };
  education: { qualification: string; schoolName: string; graduationYear: number; degreeClass: string };
  financial: { bankName: string; accountNumber: string; accountName: string };
  nextOfKin: { name: string; address: string; phoneNumber: string; relationship: string };
  guarantorForm: string;
  isDeleted: boolean;
}

const staffSchema = new Schema<IStaff>({
  personalInfo: {
    surname: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    passportPhoto: String,
    address: String,
    dateOfBirth: Date,
  },
  identification: {
    idType: { type: String, enum: ['Driver’s License', 'International Passport', 'National ID Card', 'Voter’s Card'] },
    idNumber: String,
    issueDate: Date,
  },
  contact: {
    email: { type: String, required: true, unique: true, lowercase: true },
    phoneNumber: { type: String, required: true },
    alternativeNumber: String,
  },
  maritalStatus: { type: String, enum: ['Single', 'Married'], default: 'Single' },
  spouseDetails: {
    name: String, employer: String, phoneNumber: String,
  },
  education: {
    qualification: String, schoolName: String, graduationYear: Number, degreeClass: String,
  },
  financial: {
    bankName: String, accountNumber: String, accountName: String,
  },
  nextOfKin: {
    name: String, address: String, phoneNumber: String, relationship: String,
  },
  guarantorForm: String,
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export const Staff = model<IStaff>('Staff', staffSchema);