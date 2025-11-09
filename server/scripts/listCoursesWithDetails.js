const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

async function listCoursesWithDetails() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');
    
    const categories = await Category.find({}).populate({
      path: 'courses',
      populate: {
        path: 'instructor',
        select: 'firstName lastName email'
      }
    });
    
    console.log('╔═══════════════════════════════════════════════════════════════════════╗');
    console.log('║                     COURSES WITH DETAILS                              ║');
    console.log('╚═══════════════════════════════════════════════════════════════════════╝\n');
    
    let totalCourses = 0;
    
    for (const cat of categories) {
      if (cat.courses.length === 0) continue;
      
      console.log(`\n📁 ${cat.name.toUpperCase()}`);
      console.log('─'.repeat(75));
      
      cat.courses.forEach((course, index) => {
        totalCourses++;
        console.log(`\n${index + 1}. ${course.courseName}`);
        console.log(`   💰 Price: ₹${course.price}`);
        console.log(`   👨‍🏫 Instructor: ${course.instructor.firstName} ${course.instructor.lastName}`);
        console.log(`   🖼️  Banner: ${course.thumbnail ? '✅ Available' : '❌ Missing'}`);
        console.log(`   📝 Status: ${course.status}`);
        console.log(`   🏷️  Tags: ${course.tag ? course.tag.join(', ') : 'None'}`);
        console.log(`   📚 Sections: ${course.courseContent ? course.courseContent.length : 0}`);
        console.log(`   👥 Students: ${course.studentsEnrolled ? course.studentsEnrolled.length : 0}`);
      });
    }
    
    console.log('\n' + '═'.repeat(75));
    console.log(`\n🎓 Total Courses: ${totalCourses}\n`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

listCoursesWithDetails();
