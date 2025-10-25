const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Course = require('../models/Course');

async function cleanupInstructorCourses() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database\n');
    
    // Get all instructors
    const instructors = await User.find({ accountType: 'Instructor' });
    
    console.log('🔧 Cleaning up instructor course arrays...\n');
    
    for (const instructor of instructors) {
      // Find courses that actually belong to this instructor
      const actualCourses = await Course.find({ instructor: instructor._id });
      const actualCourseIds = actualCourses.map(c => c._id);
      
      // Update instructor's courses array to only include their actual courses
      instructor.courses = actualCourseIds;
      await instructor.save();
      
      console.log(`✅ ${instructor.firstName} ${instructor.lastName}`);
      console.log(`   Courses: ${actualCourseIds.length}`);
      actualCourses.forEach(c => {
        console.log(`   - ${c.name}`);
      });
      console.log('');
    }
    
    console.log('✅ All instructor course arrays cleaned up!');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

cleanupInstructorCourses();
