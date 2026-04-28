import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import staffRoutes from './routes/staff.routes.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';

const app = express();

// Global Middlewares
app.use(helmet()); // Security headers
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json()); 

// Routes
app.use('/api/v1/staff', staffRoutes);

// Error Handling
app.use(globalErrorHandler);

export default app;