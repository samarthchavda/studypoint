require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/studynotion');
    console.log('Connected to database');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@studynotion.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      mongoose.connection.close();
      return;
    }

    // Hash new password
    const newPassword = 'Admin@123';
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    admin.password = hashedPassword;
    await admin.save();

    console.log('\n✅ Admin password reset successfully!');
    console.log('\nLogin Credentials:');
    console.log('Email: admin@studynotion.com');
    console.log('Password: Admin@123');
    console.log('\nYou can now login and access the admin panel.');

    // Verify the password works
    const isMatch = await bcrypt.compare(newPassword, admin.password);
    console.log('\n✅ Password verification:', isMatch ? 'SUCCESS' : 'FAILED');

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error resetting password:', error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

resetAdminPassword();
