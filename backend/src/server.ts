// src/server.ts
import mongoose from 'mongoose';
import 'dotenv/config';
import app from './app.js';
import { User } from './models/user.model.js';
import bcrypt from 'bcrypt';

// 1. Handle Uncaught Exceptions (e.g., console.log(x) where x is not defined)
process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_URI?.replace(
  '<PASSWORD>',
  process.env.MONGO_PASSWORD || ''
) || 'mongodb://localhost:27017/staff_portal';

// Auto-create admin user if not exists
const createAdminUser = async () => {
  try {
    const adminEmail = 'hr@neominds.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('hrneominds123', 10);
      await User.create({
        name: 'HR Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Admin user created: hr@neominds.com');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// 2. Database Connection
mongoose
  .connect(DB)
  .then(async () => {
    console.log('MongoDB connection successful!');
    
    // Auto-create admin user
    await createAdminUser();
    
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
  .catch((err: Error) => {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
  });