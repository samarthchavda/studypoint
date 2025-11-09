const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');
const Category = require('../models/Category');

async function checkAllCourses() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('Connected to database\n');
    
    // Get all categories with their courses
    const categories = await Category.find({}).populate({
      path: 'courses',
      select: 'courseName status whatYouWillLearn courseContent thumbnail'
    });
    
    console.log('=== CHECKING ALL COURSES BY CATEGORY ===\n');
    
    let totalIssues = 0;
    
    for (const cat of categories) {
      console.log(`📁 ${cat.name} (${cat.courses.length} courses)`);
      
      if (cat.courses.length === 0) {
        console.log('   ⚠️  NO COURSES FOUND!\n');
        continue;
      }
      
      cat.courses.forEach(course => {
        const hasName = course.courseName && course.courseName.length > 0;
        const hasBanner = course.thumbnail && course.thumbnail.length > 0;
        const hasLearning = course.whatYouWillLearn && course.whatYouWillLearn.length > 10;
        const hasContent = course.courseContent && course.courseContent.length > 0;
        const status = (hasName && hasBanner && hasLearning && hasContent) ? '✅' : '❌';
        
        console.log(`   ${status} ${course.courseName || 'UNNAMED COURSE'}`);
        console.log(`      Status: ${course.status}`);
        
        if (!hasName) {
          console.log(`      ❌ Missing: courseName`);
          totalIssues++;
        }
        if (!hasBanner) {
          console.log(`      ❌ Missing: thumbnail/banner`);
          totalIssues++;
        }
        if (!hasLearning) {
          console.log(`      ❌ Missing: whatYouWillLearn`);
          totalIssues++;
        }
        if (!hasContent) {
          console.log(`      ⚠️  No course content/sections`);
        }
      });
      console.log('');
    }
    
    if (totalIssues > 0) {
      console.log(`\n⚠️  Found ${totalIssues} courses with missing learning outcomes\n`);
    } else {
      console.log('\n✅ All courses have proper data!\n');
    }
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkAllCourses();
