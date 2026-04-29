import { z } from 'zod';
export declare const staffSchema: z.ZodObject<{
    body: z.ZodObject<{
        surname: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        address: z.ZodString;
        dateOfBirth: z.ZodString;
        idType: z.ZodEnum<{
            "Driver\u2019s License": "Driver’s License";
            "International Passport": "International Passport";
            "National ID Card": "National ID Card";
            "Voter\u2019s Card": "Voter’s Card";
        }>;
        idNumber: z.ZodString;
        issueDate: z.ZodString;
        email: z.ZodString;
        phoneNumber: z.ZodString;
        maritalStatus: z.ZodEnum<{
            Single: "Single";
            Married: "Married";
        }>;
        bankName: z.ZodString;
        accountNumber: z.ZodString;
        accountName: z.ZodString;
        nextOfKinName: z.ZodString;
        nextOfKinPhone: z.ZodString;
        relationship: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type StaffInput = z.infer<typeof staffSchema>['body'];
//# sourceMappingURL=staff.validator.d.ts.map