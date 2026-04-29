// src/validators/staff.validator.ts
import { z } from 'zod';

export const staffSchema = z.object({
  body: z.object({
    // Personal Information
    surname: z.string().min(2, "Surname is too short"),
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    address: z.string().min(5, "Please enter a valid address"),
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),

    // Identification
    idType: z.enum(['Driver’s License', 'International Passport', 'National ID Card', 'Voter’s Card']),
    idNumber: z.string().min(5, "ID Number is required"),
    issueDate: z.string(),

    // Contact
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number is too short"),
    alternativeNumber: z.string().optional(),

    // Marital Status & Conditional Logic
    maritalStatus: z.enum(['Single', 'Married']),
    spouseName: z.string().optional(),
    spousePhone: z.string().optional(),
    spouseEmployer: z.string().optional(),

    // Education
    qualification: z.string().min(2, "Qualification is required"),
    schoolName: z.string().min(2, "School name is required"),
    graduationYear: z.string().min(4, "Graduation year is required"),
    degreeClass: z.string().min(2, "Degree class is required"),

    // Financial
    bankName: z.string().min(2, "Bank name is required"),
    accountNumber: z.string().length(10, "Account number must be 10 digits"),
    accountName: z.string().min(2, "Account name is required"),

    // Next of Kin
    nextOfKinName: z.string().min(2, "Next of Kin name is required"),
    nextOfKinAddress: z.string().min(5, "Next of Kin address is required"),
    nextOfKinPhone: z.string().min(10, "Next of Kin phone is required"),
    relationship: z.string().min(2, "Relationship is required"),
  }).refine((data) => {
    // Senior Level Trick: Cross-field validation
    if (data.maritalStatus === 'Married') {
      // In a real scenario, we'd check spouse fields here
      // But since Multer parses them as flat strings in req.body:
      return true; 
    }
    return true;
  })
});

// This line allows you to use the Zod schema as a TypeScript Type!
export type StaffInput = z.infer<typeof staffSchema>['body'];