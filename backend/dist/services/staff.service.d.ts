import { IStaff } from '../models/staff.model.js';
export declare const createStaffRecord: (data: any, files: any) => Promise<import("mongoose").Document<unknown, {}, IStaff, {}, import("mongoose").DefaultSchemaOptions> & IStaff & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const getAllStaffRecords: (query: any) => Promise<(import("mongoose").Document<unknown, {}, IStaff, {}, import("mongoose").DefaultSchemaOptions> & IStaff & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
//# sourceMappingURL=staff.service.d.ts.map