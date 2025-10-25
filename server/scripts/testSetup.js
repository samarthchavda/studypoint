require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Profile = require('../models/Profile');
const bcrypt = require('bcrypt');

const createTestAccounts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    const password = 'Test@123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Test accounts to create
    const accounts = [
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@studynotion.com',
        accountType: 'Admin'
      },
      {
        firstName: 'John',
        lastName: 'Instructor',
        email: 'instructor@studynotion.com',
        accountType: 'Instructor'
      },
      {
        firstName: 'Jane',
        lastName: 'Student',
        email: 'student@studynotion.com',
        accountType: 'Student'
      }
    ];

    console.log('📝 Creating test accounts...\n');

    for (const account of accounts) {
      const existingUser = await User.findOne({ email: account.email });
      
      if (existingUser) {
        console.log(`⚠️  ${account.accountType} account already exists: ${account.email}`);
        continue;
      }

      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: `I am a ${account.accountType.toLowerCase()}`,
        contactNumber: null,
      });

      await User.create({
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        password: hashedPassword,
        accountType: account.accountType,
        additionalDetails: profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${account.firstName} ${account.lastName}`,
        approved: true,
        active: true,
      });

      console.log(`✅ Created ${account.accountType}: ${account.email}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 TEST ACCOUNTS CREATED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log('\n📋 LOGIN CREDENTIALS (Password same for all):');
    console.log('-'.repeat(60));
    console.log('Password: Test@123');
    console.log('-'.repeat(60));
    console.log('\n👤 ADMIN ACCOUNT:');
    console.log('   Email: admin@studynotion.com');
    console.log('   Access: /dashboard/admin');
    console.log('\n👨‍🏫 INSTRUCTOR ACCOUNT:');
    console.log('   Email: instructor@studynotion.com');
    console.log('   Access: /dashboard/instructor');
    console.log('\n👨‍🎓 STUDENT ACCOUNT:');
    console.log('   Email: student@studynotion.com');
    console.log('   Access: /dashboard/enrolled-courses');
    console.log('\n' + '='.repeat(60));

    // Get stats
    const totalUsers = await User.countDocuments();
    const totalInstructors = await User.countDocuments({ accountType: 'Instructor' });
    const totalStudents = await User.countDocuments({ accountType: 'Student' });
    const totalAdmins = await User.countDocuments({ accountType: 'Admin' });

    console.log('\n📊 DATABASE STATS:');
    console.log('-'.repeat(60));
    console.log(`Total Users: ${totalUsers}`);
    console.log(`Total Admins: ${totalAdmins}`);
    console.log(`Total Instructors: ${totalInstructors}`);
    console.log(`Total Students: ${totalStudents}`);
    console.log('='.repeat(60) + '\n');

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

createTestAccounts();
