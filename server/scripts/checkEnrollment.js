const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const checkEnrollment = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Database connected\n');

    // Find the free course
    const freeCourse = await Course.findOne({ price: 0 })
      .populate('courseContent')
      .populate('studentsEnrolled', 'firstName lastName email');
    
    console.log('📚 FREE COURSE DETAILS:');
    console.log('Name:', freeCourse.name);
    console.log('ID:', freeCourse._id);
    console.log('Price:', freeCourse.price);
    console.log('Status:', freeCourse.status);
    console.log('Sections:', freeCourse.courseContent.length);
    console.log('Students Enrolled:', freeCourse.studentsEnrolled.length);
    
    if (freeCourse.studentsEnrolled.length > 0) {
      console.log('\n👥 ENROLLED STUDENTS:');
      freeCourse.studentsEnrolled.forEach((student, i) => {
        console.log(`${i + 1}. ${student.firstName} ${student.lastName} (${student.email})`);
      });
    }

    // Check course progress
    const courseProgresses = await CourseProgress.find({ 
      courseId: freeCourse._id 
    }).populate('userId', 'firstName lastName email');

    console.log('\n📊 COURSE PROGRESS RECORDS:', courseProgresses.length);
    courseProgresses.forEach((cp, i) => {
      console.log(`${i + 1}. User: ${cp.userId.firstName} ${cp.userId.lastName}`);
      console.log(`   Completed Videos: ${cp.completedVideos.length}`);
    });

    // Check a student's enrolled courses
    if (freeCourse.studentsEnrolled.length > 0) {
      const firstStudent = await User.findById(freeCourse.studentsEnrolled[0]._id)
        .populate('courses', 'name price');
      
      console.log('\n📖 FIRST STUDENT\'S COURSES:');
      console.log('Student:', firstStudent.firstName, firstStudent.lastName);
      console.log('Total Courses:', firstStudent.courses.length);
      firstStudent.courses.forEach((c, i) => {
        console.log(`${i + 1}. ${c.name} (₹${c.price})`);
      });
    }

    await mongoose.connection.close();
    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkEnrollment();
