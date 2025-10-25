const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
const Category = require('../models/Category');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB\n');

    const courseNames = [
      "Complete Web Development Bootcamp",
      "React JS - The Complete Guide",
      "Flutter & Dart - Complete Guide",
      "React Native - Build Mobile Apps",
      "Data Science Masterclass",
      "Machine Learning A-Z"
    ];

    console.log('Course IDs for homepage mapping:\n');
    
    for (const name of courseNames) {
      const course = await Course.findOne({ name }).select('_id name').lean();
      if (course) {
        console.log(`"${name}": "${course._id}",`);
      }
    }

  } catch (e) {
    console.error('❌ Error:', e);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Disconnected');
  }
}

run();
