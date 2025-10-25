const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Course = require('../models/Course');
const User = require('../models/User');
const Category = require('../models/Category');

async function checkCourseFields() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('Connected to database\n');
    
    const course = await Course.findOne({}).populate('instructor').populate('category');
    
    if (course) {
      console.log('=== COURSE FIELDS ===');
      console.log('ID:', course._id);
      console.log('courseName:', course.courseName);
      console.log('courseDescription:', course.courseDescription);
      console.log('price:', course.price);
      console.log('thumbnail:', course.thumbnail);
      console.log('instructor:', course.instructor?.firstName, course.instructor?.lastName);
      console.log('category:', course.category?.name);
      console.log('status:', course.status);
      console.log('\n=== Full Course Object ===');
      console.log(JSON.stringify(course, null, 2));
    } else {
      console.log('No courses found');
    }
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkCourseFields();
