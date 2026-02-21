const axios = require('axios');

const API_URL = 'http://localhost:4000/api/v1/auth';

// Test credentials
const loginData = {
  email: 'chavdasamarth02@gmail.com',
  password: '12345678'
};

async function testLogin() {
  try {
    console.log('🧪 Testing Login Flow for StudyNotion');
    console.log('======================================\n');

    console.log('🔐 Attempting to login with:');
    console.log('   Email:', loginData.email);
    console.log('   Password:', '********');
    console.log('');

    const loginResponse = await axios.post(`${API_URL}/login`, loginData);

    console.log('✅ Login Response:', JSON.stringify(loginResponse.data, null, 2));
    
    if (loginResponse.data.success) {
      console.log('\n🎉 SUCCESS! Login successful!');
      console.log('═══════════════════════════════════════════');
      console.log('👤 User:', loginResponse.data.user.firstName, loginResponse.data.user.lastName);
      console.log('📧 Email:', loginResponse.data.user.email);
      console.log('📱 Phone:', loginResponse.data.user.phoneNumber);
      console.log('📚 Account Type:', loginResponse.data.user.accountType);
      console.log('🆔 User ID:', loginResponse.data.user._id);
      console.log('🔑 Token:', loginResponse.data.token ? 'Generated ✅' : 'Not generated ❌');
      console.log('═══════════════════════════════════════════');
      console.log('\n🔹 You can now access the application at: http://localhost:3000');
      console.log('🔹 Token can be used for authenticated requests');
    } else {
      console.log('❌ Login failed:', loginResponse.data.message);
    }

  } catch (error) {
    console.error('\n❌ Error during login test:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
      
      if (error.response.status === 404) {
        console.log('\n💡 TIP: User not found. Make sure you have signed up first.');
        console.log('   Run: node test-auto-signup.js');
      } else if (error.response.status === 400) {
        console.log('\n💡 TIP: Password might be incorrect.');
        console.log('   Make sure you are using the correct password: 12345678');
      }
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run the test
testLogin();
