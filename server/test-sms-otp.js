const axios = require('axios');

// Test Configuration
const API_BASE_URL = 'http://localhost:4000/api/v1/auth';

// Test Case 1: Send OTP via SMS
async function testSendSMSOTP() {
  try {
    console.log('\n📱 Test: Send OTP via SMS');
    console.log('==============================');
    
    const response = await axios.post(`${API_BASE_URL}/sendotp`, {
      phoneNumber: '+1234567890', // Replace with a valid test phone number
      sendMethod: 'sms'
    });
    
    console.log('✅ SMS OTP sent successfully!');
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.log('❌ Error sending SMS OTP:');
    console.log(error.response?.data || error.message);
  }
}

// Test Case 2: Send OTP via Email
async function testSendEmailOTP() {
  try {
    console.log('\n📧 Test: Send OTP via Email');
    console.log('==============================');
    
    const response = await axios.post(`${API_BASE_URL}/sendotp`, {
      email: 'testuser@example.com',
      sendMethod: 'email'
    });
    
    console.log('✅ Email OTP sent successfully!');
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.log('❌ Error sending Email OTP:');
    console.log(error.response?.data || error.message);
  }
}

// Test Case 3: Signup with SMS OTP
async function testSignupWithSMSOTP() {
  try {
    console.log('\n👤 Test: Signup with SMS OTP');
    console.log('==============================');
    
    // First send OTP
    const otpResponse = await axios.post(`${API_BASE_URL}/sendotp`, {
      phoneNumber: '+1234567890',
      sendMethod: 'sms'
    });
    
    const otp = otpResponse.data.otp; // For testing only
    
    // Then signup
    const signupResponse = await axios.post(`${API_BASE_URL}/signup`, {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser123@example.com',
      password: 'Test@123456',
      confirmPassword: 'Test@123456',
      accountType: 'Student',
      phoneNumber: '+1234567890',
      otp: otp
    });
    
    console.log('✅ Signup with SMS OTP successful!');
    console.log('Response:', signupResponse.data);
    return signupResponse.data;
  } catch (error) {
    console.log('❌ Error during signup:');
    console.log(error.response?.data || error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting SMS OTP Tests');
  console.log('==========================\n');
  
  // Uncomment the tests you want to run:
  
  // await testSendSMSOTP();
  // await testSendEmailOTP();
  // await testSignupWithSMSOTP();
  
  console.log('\n✅ Tests completed!');
}

// Run if executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  testSendSMSOTP,
  testSendEmailOTP,
  testSignupWithSMSOTP,
};
