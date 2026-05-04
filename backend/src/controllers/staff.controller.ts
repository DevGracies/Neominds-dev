// src/controllers/staff.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as StaffService from '../services/staff.service';
import { catchAsync } from '../utils/catchAsync';

export const registerStaff = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body)
  const staff = await StaffService.createStaffRecord(req.body, req.files);
  
  res.status(201).json({
    success: true,
    message: "Staff registered successfully",
    data: staff
  });
});

// src/middlewares/error.middleware.ts
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};