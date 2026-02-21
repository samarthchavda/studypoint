const axios = require('axios');
const readline = require('readline');

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function testCompleteSignup() {
  try {
    console.log('🧪 Testing Complete Signup Flow for StudyNotion');
    console.log('================================================\n');

    // Step 1: Send OTP
    console.log('📱 Step 1: Sending OTP to', testPhone);
    const otpResponse = await axios.post(`${API_URL}/sendotp`, {
      phoneNumber: testPhone
    });

    console.log('✅ OTP Response:', JSON.stringify(otpResponse.data, null, 2));
    
    if (!otpResponse.data.success) {
      console.log('❌ Failed to send OTP:', otpResponse.data.message);
      rl.close();
      return;
    }

    console.log('\n✅ OTP sent successfully!');
    
    // Show OTP if available
    if (otpResponse.data.otp) {
      console.log('🔑 OTP (for testing):', otpResponse.data.otp);
    }
    
    // Step 2: Ask user for OTP
    console.log('\n📝 Please enter the OTP you received:');
    const otp = await askQuestion('OTP: ');
    
    if (!otp || otp.length !== 6) {
      console.log('❌ Invalid OTP format. OTP should be 6 digits.');
      rl.close();
      return;
    }

    // Step 3: Complete Signup
    console.log('\n👤 Step 2: Completing signup with OTP...');
    const signupData = {
      ...testData,
      otp: otp
    };

    const signupResponse = await axios.post(`${API_URL}/signUp`, signupData);

    console.log('\n✅ Signup Response:', JSON.stringify(signupResponse.data, null, 2));
    
    if (signupResponse.data.success) {
      console.log('\n🎉 SUCCESS! User registered successfully!');
      console.log('📧 Email:', signupResponse.data.user.email);
      console.log('📱 Phone:', signupResponse.data.user.phoneNumber);
      console.log('👤 Name:', signupResponse.data.user.firstName, signupResponse.data.user.lastName);
      console.log('\n🔹 You can now login at: http://localhost:3000/login');
    } else {
      console.log('❌ Signup failed:', signupResponse.data.message);
    }

    rl.close();

  } catch (error) {
    console.error('\n❌ Error during signup test:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
    rl.close();
  }
}

// Run the test
testCompleteSignup();
