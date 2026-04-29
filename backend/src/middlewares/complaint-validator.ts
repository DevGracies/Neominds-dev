import { body, validationResult } from "express-validator";
const validateComplaint = [
  body("employee").notEmpty().withMessage("Employee is required"),
  body("role").notEmpty().withMessage("Role is required"),
  body("text").notEmpty().withMessage("Text is required"),
];

export default validateComplaint;
