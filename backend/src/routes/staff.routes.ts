// src/routes/staff.routes.ts
import { Router } from 'express';
import { registerStaff } from '../controllers/staff.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { staffSchema } from '../validators/staff.validator.js';

const router = Router();

router.post(
  '/register',
  upload.fields([
    { name: 'passportPhoto', maxCount: 1 },
    { name: 'guarantorForm', maxCount: 1 }
  ]),
  validate(staffSchema), // Validates fields after Multer parses the body
  registerStaff
);

export default router;