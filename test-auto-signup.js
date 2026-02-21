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

async function testAutoSignup() {
  try {
    console.log('🧪 Testing Automated Signup Flow for StudyNotion');
    console.log('=================================================\n');

    // Step 1: Send OTP
    console.log('📱 Step 1: Sending OTP to', testPhone);
    const otpResponse = await axios.post(`${API_URL}/sendotp`, {
      phoneNumber: testPhone
    });

    console.log('✅ OTP Response:', JSON.stringify(otpResponse.data, null, 2));
    
    if (!otpResponse.data.success) {
      console.log('❌ Failed to send OTP:', otpResponse.data.message);
      return;
    }

    console.log('\n✅ OTP sent successfully!');
    
    // Get OTP from response
    const otp = otpResponse.data.otp;
    if (!otp) {
      console.log('❌ OTP not available in response. Check server console.');
      return;
    }

    console.log('🔑 OTP received:', otp);
    
    // Wait a moment
    console.log('\n⏳ Waiting 2 seconds before signup...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 2: Complete Signup
    console.log('\n👤 Step 2: Completing signup with OTP...');
    const signupData = {
      ...testData,
      otp: otp
    };

    const signupResponse = await axios.post(`${API_URL}/signUp`, signupData);

    console.log('\n✅ Signup Response:', JSON.stringify(signupResponse.data, null, 2));
    
    if (signupResponse.data.success) {
      console.log('\n🎉 SUCCESS! User registered successfully!');
      console.log('═══════════════════════════════════════════');
      console.log('📧 Email:', signupResponse.data.user.email);
      console.log('📱 Phone:', signupResponse.data.user.phoneNumber);
      console.log('👤 Name:', signupResponse.data.user.firstName, signupResponse.data.user.lastName);
      console.log('🆔 User ID:', signupResponse.data.user._id);
      console.log('📚 Account Type:', signupResponse.data.user.accountType);
      console.log('═══════════════════════════════════════════');
      console.log('\n🔹 You can now login at: http://localhost:3000/login');
      console.log('🔹 Use credentials:');
      console.log('   Email:', testData.email);
      console.log('   Password:', testData.password);
    } else {
      console.log('❌ Signup failed:', signupResponse.data.message);
    }

  } catch (error) {
    console.error('\n❌ Error during signup test:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
      
      // Provide helpful error messages
      if (error.response.status === 400) {
        const msg = error.response.data.message;
        if (msg.includes('already registered')) {
          console.log('\n💡 TIP: This phone/email is already registered.');
          console.log('   Try logging in instead: http://localhost:3000/login');
        } else if (msg.includes('OTP')) {
          console.log('\n💡 TIP: OTP might have expired or is invalid.');
          console.log('   Run this script again to get a new OTP.');
        }
      }
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run the test
testAutoSignup();
