import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import helmet from 'helmet';

import staffRoutes from './routes/staff.routes.js';
import authRoutes from './routes/auth.routes.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';
import { env } from './config/env.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Global Middlewares
app.use(helmet()); // Security headers
app.use(cors({ origin: process.env.CORS_ORIGIN,
    credentials: true
 }));
app.use(express.json()); 
app.use(cookieParser());
// Routes
app.use('/api/v1/staff', staffRoutes);
// app.use()
app.use("/api/v1/auth", authRoutes);

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
})

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
})
// Error Handling
app.use(globalErrorHandler);

export default app;