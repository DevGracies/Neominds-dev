// src/server.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

// 1. Handle Uncaught Exceptions (e.g., console.log(x) where x is not defined)
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_URI?.replace(
  '<PASSWORD>',
  process.env.MONGO_PASSWORD || ''
) || 'mongodb://localhost:27017/staff_portal';

// 2. Database Connection
mongoose
  .connect(DB)
  .then(() => {
    console.log('MongoDB connection successful!');
    
    // 3. Start Server
    const server = app.listen(PORT, () => {
      console.log(` Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });

    // 4. Handle Unhandled Rejections (e.g., failed DB connection)
    process.on('unhandledRejection', (err: any) => {
      console.error('UNHANDLED REJECTION!  Shutting down...');
      console.error(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
  });