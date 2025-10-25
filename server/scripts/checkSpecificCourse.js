const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');
const User = require('../models/User');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');

async function checkCourse() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database\n');
    
    const courseId = '68fbab1e0031571debb0151b';
    
    const course = await Course.findById(courseId)
      .populate('instructor')
      .populate({
        path: 'courseContent',
        populate: {
          path: 'subSections'
        }
      });
    
    if (!course) {
      console.log('❌ Course not found with ID:', courseId);
      process.exit(1);
    }
    
    console.log('📚 Course Name:', course.name);
    console.log('📝 Status:', course.status);
    console.log('\n--- WHAT YOU WILL LEARN ---');
    console.log(course.whatYouWillLearn || '❌ Missing');
    
    console.log('\n--- INSTRUCTIONS ---');
    console.log(course.instructions || '❌ Missing');
    
    console.log('\n--- DESCRIPTION ---');
    console.log(course.description || '❌ Missing');
    
    console.log('\n--- COURSE CONTENT ---');
    console.log('Sections:', course.courseContent?.length || 0);
    course.courseContent?.forEach((section, idx) => {
      console.log(`  ${idx + 1}. ${section.name} (${section.subSections?.length || 0} lectures)`);
    });
    
    console.log('\n--- INSTRUCTOR ---');
    console.log('Name:', course.instructor?.firstName, course.instructor?.lastName);
    console.log('Email:', course.instructor?.email);
    console.log('About:', course.instructor?.additionalDetails?.about || '❌ Missing');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkCourse();
