const axios = require('axios');

const API_URL = 'http://localhost:4000/api/v1/auth';

// Test data
const testPhone = '+918320709174';
const testData = {
  firstName: 'Chavda',
  lastName: 'Samarth',
  email: 'chavdasamarth02@gmail.com',
  password: '12345678',
  confirmPassword: '12345678',
  accountType: 'Student',
  phoneNumber: testPhone
};

async function testOTPFlow() {
  try {
    console.log('🧪 Testing OTP Flow for StudyNotion');
    console.log('=====================================\n');

    // Step 1: Send OTP
    console.log('📱 Step 1: Sending OTP to', testPhone);
    const otpResponse = await axios.post(`${API_URL}/sendotp`, {
      phoneNumber: testPhone
    });

    console.log('✅ OTP Response:', JSON.stringify(otpResponse.data, null, 2));
    
    if (otpResponse.data.success) {
      console.log('\n✅ OTP sent successfully!');
      console.log('📱 Check your phone for the OTP');
      
      // Show OTP if in development mode
      if (otpResponse.data.otp) {
        console.log('🔑 OTP (for testing):', otpResponse.data.otp);
      }
      
      console.log('\n⏳ Waiting for you to enter the OTP...');
      console.log('📝 Once you receive the OTP, you can proceed with signup');
      console.log('\n🔹 Signup URL: http://localhost:3000/signup');
      console.log('🔹 Use these credentials:');
      console.log('   - Phone:', testData.phoneNumber);
      console.log('   - Email:', testData.email);
      console.log('   - Password:', testData.password);
      console.log('   - First Name:', testData.firstName);
      console.log('   - Last Name:', testData.lastName);
      
    } else {
      console.log('❌ Failed to send OTP:', otpResponse.data.message);
    }

  } catch (error) {
    console.error('❌ Error during OTP test:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run the test
testOTPFlow();
