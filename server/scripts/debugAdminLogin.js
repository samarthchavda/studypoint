const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB\n');

    // Find admin
    const admin = await User.findOne({ email: 'admin@studynotion.com' });
    
    if (!admin) {
      console.log('❌ Admin not found!');
      return;
    }

    console.log('✅ Admin found:');
    console.log('   Email:', admin.email);
    console.log('   Name:', admin.firstName, admin.lastName);
    console.log('   Account Type:', admin.accountType);
    console.log('   Approved:', admin.approved);
    console.log('   Active:', admin.active);
    console.log('   ID:', admin._id);
    
    // Test password
    console.log('\n🔐 Testing password...');
    const testPassword = 'Test@123';
    const isPasswordCorrect = await bcrypt.compare(testPassword, admin.password);
    console.log('   Password "Test@123":', isPasswordCorrect ? '✅ CORRECT' : '❌ WRONG');
    
    if (!isPasswordCorrect) {
      console.log('\n⚠️  Password incorrect! Resetting...');
      const hashedPassword = await bcrypt.hash(testPassword, 10);
      await User.findByIdAndUpdate(admin._id, { 
        password: hashedPassword,
        approved: true,
        active: true 
      });
      console.log('✅ Password reset to: Test@123');
    }
    
    // Generate test JWT token
    console.log('\n🎫 Generating test JWT token...');
    const payload = {
      id: admin._id,
      email: admin.email,
      accountType: admin.accountType
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
    
    console.log('✅ Token generated successfully');
    console.log('\n📋 Test this in your browser console:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`localStorage.setItem('token', '${token}');`);
    console.log(`localStorage.setItem('user', '${JSON.stringify({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      accountType: admin.accountType,
      image: admin.image
    })}');`);
    console.log('window.location.reload();');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    console.log('\n💡 OR use these credentials to login:');
    console.log('   Email: admin@studynotion.com');
    console.log('   Password: Test@123');

  } catch (e) {
    console.error('❌ Error:', e);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Disconnected');
  }
}

run();
