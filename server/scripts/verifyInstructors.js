const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');
const User = require('../models/User');

async function verifyInstructors() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database\n');
    
    console.log('📚 COURSE ASSIGNMENTS:\n');
    
    const courses = await Course.find({}).populate('instructor', 'firstName lastName email').sort({ name: 1 });
    
    courses.forEach(course => {
      console.log(`✓ ${course.name}`);
      console.log(`  Instructor: ${course.instructor.firstName} ${course.instructor.lastName}`);
      console.log(`  Email: ${course.instructor.email}\n`);
    });
    
    console.log('\n👥 INSTRUCTOR SUMMARY:\n');
    
    const instructors = await User.find({ accountType: 'Instructor' })
      .populate('courses', 'name')
      .sort({ firstName: 1 });
    
    instructors.forEach(instructor => {
      console.log(`${instructor.firstName} ${instructor.lastName} (${instructor.email})`);
      console.log(`  Courses: ${instructor.courses.length}`);
      instructor.courses.forEach(course => {
        console.log(`    - ${course.name}`);
      });
      console.log('');
    });
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

verifyInstructors();
