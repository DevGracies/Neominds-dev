import { Document } from 'mongoose';
export interface IStaff extends Document {
    personalInfo: {
        surname: string;
        firstName: string;
        lastName: string;
        passportPhoto: string;
        address: string;
        dateOfBirth: Date;
    };
    identification: {
        idType: string;
        idNumber: string;
        issueDate: Date;
    };
    contact: {
        email: string;
        phoneNumber: string;
        alternativeNumber?: string;
    };
    maritalStatus: 'Single' | 'Married';
    spouseDetails?: {
        name: string;
        employer: string;
        phoneNumber: string;
    };
    education: {
        qualification: string;
        schoolName: string;
        graduationYear: number;
        degreeClass: string;
    };
    financial: {
        bankName: string;
        accountNumber: string;
        accountName: string;
    };
    nextOfKin: {
        name: string;
        address: string;
        phoneNumber: string;
        relationship: string;
    };
    guarantorForm: string;
    isDeleted: boolean;
}
export declare const Staff: import("mongoose").Model<IStaff, {}, {}, {}, Document<unknown, {}, IStaff, {}, import("mongoose").DefaultSchemaOptions> & IStaff & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IStaff>;
//# sourceMappingURL=staff.model.d.ts.map