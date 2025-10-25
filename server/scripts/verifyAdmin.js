const mongoose = require('mongoose');
const User = require('../models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB\n');

    const admins = await User.find({ accountType: 'Admin' })
      .select('firstName lastName email accountType')
      .lean();

    console.log(`📊 Found ${admins.length} admin account(s):\n`);
    
    if (admins.length === 0) {
      console.log('❌ No admin accounts found!');
      console.log('\n💡 To create an admin account, run:');
      console.log('   node server/scripts/createAdmin.js');
    } else {
      admins.forEach((admin, idx) => {
        console.log(`${idx + 1}. ${admin.firstName} ${admin.lastName}`);
        console.log(`   Email: ${admin.email}`);
        console.log(`   Type: ${admin.accountType}`);
        console.log('');
      });
      
      console.log('🔐 Admin Panel Access:');
      console.log('   1. Login with admin email');
      console.log('   2. Navigate to: http://localhost:3000/dashboard/admin');
      console.log('\n📊 Admin Features:');
      console.log('   - View statistics dashboard');
      console.log('   - Manage users');
      console.log('   - View contact forms');
      console.log('   - View demo bookings');
      console.log('   - Create categories');
    }

  } catch (e) {
    console.error('❌ Error:', e);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Disconnected');
  }
}

run();
