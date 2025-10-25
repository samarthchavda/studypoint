require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Profile = require('../models/Profile');
const bcrypt = require('bcrypt');

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/studynotion');
    console.log('Connected to database');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@studynotion.com' });
    
    if (existingAdmin) {
      console.log('\n✅ Admin user already exists!');
      console.log('Email: admin@studynotion.com');
      console.log('Password: Admin@123');
      console.log('\nYou can login with these credentials to access the admin panel.');
      mongoose.connection.close();
      return;
    }

    // Create profile first
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    // Hash password
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    // Create admin user
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@studynotion.com',
      password: hashedPassword,
      accountType: 'Admin',
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=Admin User`,
      approved: true,
      active: true,
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('\nLogin Credentials:');
    console.log('Email: admin@studynotion.com');
    console.log('Password: Admin@123');
    console.log('\nYou can now login and access the admin panel at: /dashboard/admin');

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

createAdminUser();
