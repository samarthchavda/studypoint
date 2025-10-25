const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const cleanupEnrollments = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Database connected\n');

    // Find the old course ID (deleted)
    const oldCourseId = new mongoose.Types.ObjectId('68fc96e678a283e996c3415b');
    
    // Find the new course
    const newCourse = await Course.findById('68fc9bda58a0f5a4bc74daeb');
    if (!newCourse) {
      console.log('❌ New course not found!');
      await mongoose.connection.close();
      return;
    }

    console.log('🎓 New Course:', newCourse.name);
    console.log('New Course ID:', newCourse._id);

    // Find all users enrolled in the old course
    const usersWithOldCourse = await User.find({ courses: oldCourseId });
    console.log('\n👥 Users with old course enrollment:', usersWithOldCourse.length);

    for (const user of usersWithOldCourse) {
      console.log(`\nCleaning up user: ${user.firstName} ${user.lastName} (${user.email})`);
      
      // Remove old course from courses array
      user.courses = user.courses.filter(id => id.toString() !== oldCourseId.toString());
      
      // Remove old course progress
      const oldProgress = await CourseProgress.findOne({ 
        userId: user._id, 
        courseId: oldCourseId 
      });
      
      if (oldProgress) {
        user.courseProgress = user.courseProgress.filter(
          id => id.toString() !== oldProgress._id.toString()
        );
        await CourseProgress.findByIdAndDelete(oldProgress._id);
        console.log('  ✓ Removed old course progress');
      }

      await user.save();
      console.log('  ✓ Cleaned up user record');
    }

    // Also clean up the new course's studentsEnrolled array (if it has old users)
    newCourse.studentsEnrolled = [];
    await newCourse.save();
    console.log('\n✅ Cleaned up new course student list');

    console.log('\n🎉 Cleanup complete!');
    console.log('Now users can enroll in the new course fresh.');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    await mongoose.connection.close();
  }
};

cleanupEnrollments();
