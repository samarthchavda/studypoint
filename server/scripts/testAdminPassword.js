const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL || process.env.MONGO_URI || 'mongodb://localhost:27017/studynotion')
  .then(async () => {
    const admin = await User.findOne({email: 'admin@studynotion.com'});
    
    if (!admin) {
      console.log('❌ Admin not found');
      process.exit(1);
    }
    
    console.log('✅ Admin found:', admin.email);
    console.log('Account Type:', admin.accountType);
    console.log('\nTesting passwords...\n');
    
    const testPasswords = ['Admin@123', 'admin@123', 'Admin123', 'admin123', 'Admin@123!'];
    
    for(let pass of testPasswords) {
      const match = await bcrypt.compare(pass, admin.password);
      console.log(`Password "${pass}":`, match ? '✅ MATCH' : '❌ No match');
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
