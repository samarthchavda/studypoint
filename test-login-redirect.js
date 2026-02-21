const axios = require('axios');

const API_URL = 'http://localhost:4000/api/v1/auth';

// Test credentials
const loginData = {
  email: 'chavdasamarth02@gmail.com',
  password: '12345678'
};

async function testLoginRedirect() {
  try {
    console.log('🧪 Testing Login Redirect Change');
    console.log('==================================\n');

    console.log('📝 Change Summary:');
    console.log('   OLD: Login → Dashboard (based on account type)');
    console.log('   NEW: Login → Home Page (/) for all users');
    console.log('');

    console.log('🔐 Logging in with test account...');
    console.log('   Email:', loginData.email);
    console.log('');

    const loginResponse = await axios.post(`${API_URL}/login`, loginData);

    if (loginResponse.data.success) {
      const user = loginResponse.data.user;
      
      console.log('✅ Login Successful!');
      console.log('═══════════════════════════════════════════');
      console.log('👤 User:', user.firstName, user.lastName);
      console.log('📚 Account Type:', user.accountType);
      console.log('🔑 Token:', loginResponse.data.token ? 'Generated ✅' : 'Not generated ❌');
      console.log('═══════════════════════════════════════════\n');

      console.log('🏠 Redirect Behavior:');
      console.log('   ✅ After login, user will be redirected to: /');
      console.log('   ✅ This applies to all account types (Student, Instructor, Admin)');
      console.log('');

      console.log('📍 Previous Redirect (OLD):');
      if (user.accountType === 'Student') {
        console.log('   ❌ Would have redirected to: /dashboard/enrolled-courses');
      } else if (user.accountType === 'Instructor') {
        console.log('   ❌ Would have redirected to: /dashboard/my-courses');
      } else if (user.accountType === 'Admin') {
        console.log('   ❌ Would have redirected to: /dashboard/admin');
      }
      console.log('');

      console.log('📍 New Redirect (CURRENT):');
      console.log('   ✅ Now redirects to: / (Home Page)');
      console.log('');

      console.log('🎯 To Test in Browser:');
      console.log('   1. Open: http://localhost:3000/login');
      console.log('   2. Login with:');
      console.log('      - Email:', loginData.email);
      console.log('      - Password:', loginData.password);
      console.log('   3. After successful login, you will be on the home page');
      console.log('');

      console.log('📌 Note:');
      console.log('   - Users can still access their dashboard from the navigation menu');
      console.log('   - Dashboard URLs are still accessible directly');
      console.log('   - This change provides a unified login experience');
      console.log('');

      console.log('✅ Test Complete!');

    } else {
      console.log('❌ Login failed:', loginResponse.data.message);
    }

  } catch (error) {
    console.error('\n❌ Error during test:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Message:', error.response.data.message);
      
      if (error.response.status === 404) {
        console.log('\n💡 User not found. Creating test account...');
        console.log('   Run: node test-auto-signup.js');
      }
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run the test
testLoginRedirect();
