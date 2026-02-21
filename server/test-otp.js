require('dotenv').config();
const mongoose = require('mongoose');
const OTP = require('./models/OTP');

async function testOTP() {
  try {
    console.log('\n=== Testing OTP Creation ===\n');
    
    // Connect to database
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB\n');
    
    // Test email
    const testEmail = 'test@example.com';
    const testOTP = '123456';
    
    // Clean up any existing test OTPs
    await OTP.deleteMany({ email: testEmail });
    console.log('Cleaned up existing test OTPs\n');
    
    // Create new OTP
    console.log('Creating OTP document...');
    const otpDoc = await OTP.create({
      email: testEmail,
      otp: testOTP
    });
    
    console.log('✅ OTP document created:', {
      email: otpDoc.email,
      otp: otpDoc.otp,
      createdAt: otpDoc.createdAt
    });
    
    // Wait a bit for email to be sent
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Clean up
    await OTP.deleteMany({ email: testEmail });
    console.log('\n✅ Test completed successfully!');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testOTP();
