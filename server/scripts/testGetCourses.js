const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
const Category = require('../models/Category');
require('dotenv').config();

async function testGetCourses() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    const courses = await Course.find()
      .populate("instructor", "firstName lastName email")
      .populate("category", "name")
      .limit(5);

    console.log(`📚 Found ${courses.length} courses\n`);
    
    if (courses.length > 0) {
      console.log('Sample course:');
      console.log('- Name:', courses[0].courseName);
      console.log('- Instructor:', courses[0].instructor?.firstName);
      console.log('- Category:', courses[0].category?.name);
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testGetCourses();
