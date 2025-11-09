const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

async function checkCourseNameAndBanner() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');
    
    // Get all courses
    const courses = await Course.find({})
      .populate('instructor', 'firstName lastName email')
      .populate('category', 'name')
      .sort({ createdAt: -1 });
    
    console.log(`📚 Total Courses Found: ${courses.length}\n`);
    console.log('='.repeat(80));
    console.log('CHECKING ALL COURSES FOR NAME AND BANNER');
    console.log('='.repeat(80));
    console.log('');
    
    let coursesWithIssues = [];
    let coursesOK = [];
    
    courses.forEach((course, index) => {
      const hasName = course.courseName && course.courseName.trim().length > 0;
      const hasBanner = course.thumbnail && course.thumbnail.trim().length > 0;
      
      const status = (hasName && hasBanner) ? '✅' : '❌';
      
      console.log(`${index + 1}. ${status} Course ID: ${course._id}`);
      console.log(`   📝 Name: ${hasName ? `"${course.courseName}"` : '❌ MISSING'}`);
      console.log(`   🖼️  Banner/Thumbnail: ${hasBanner ? '✅ Present' : '❌ MISSING'}`);
      
      if (hasBanner && course.thumbnail.length > 0) {
        console.log(`      URL: ${course.thumbnail.substring(0, 60)}...`);
      }
      
      console.log(`   👨‍🏫 Instructor: ${course.instructor?.firstName || 'N/A'} ${course.instructor?.lastName || ''}`);
      console.log(`   📁 Category: ${course.category?.name || 'N/A'}`);
      console.log(`   📊 Status: ${course.status || 'N/A'}`);
      console.log(`   💰 Price: ${course.price || 'Free'}`);
      console.log(`   👥 Students Enrolled: ${course.studentsEnrolled?.length || 0}`);
      console.log('');
      
      if (!hasName || !hasBanner) {
        coursesWithIssues.push({
          id: course._id,
          name: course.courseName || 'NO NAME',
          hasName,
          hasBanner,
          instructor: `${course.instructor?.firstName || ''} ${course.instructor?.lastName || ''}`.trim(),
          category: course.category?.name || 'N/A'
        });
      } else {
        coursesOK.push({
          id: course._id,
          name: course.courseName,
        });
      }
    });
    
    console.log('='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    console.log('');
    console.log(`✅ Courses with Name AND Banner: ${coursesOK.length}`);
    console.log(`❌ Courses with Issues: ${coursesWithIssues.length}`);
    console.log('');
    
    if (coursesWithIssues.length > 0) {
      console.log('⚠️  COURSES WITH ISSUES:');
      console.log('-'.repeat(80));
      coursesWithIssues.forEach((course, index) => {
        console.log(`${index + 1}. ${course.name}`);
        console.log(`   ID: ${course.id}`);
        console.log(`   Missing: ${!course.hasName ? '❌ Name ' : ''}${!course.hasBanner ? '❌ Banner' : ''}`);
        console.log(`   Instructor: ${course.instructor}`);
        console.log(`   Category: ${course.category}`);
        console.log('');
      });
      
      console.log('\n💡 RECOMMENDATIONS:');
      console.log('   1. Add missing course names using the admin panel or update script');
      console.log('   2. Upload course banners/thumbnails for courses without images');
      console.log('   3. Run this script again after updates to verify\n');
    } else {
      console.log('🎉 All courses have proper names and banners!\n');
    }
    
    // Check for courses with old field names (name instead of courseName)
    const coursesWithOldFields = await Course.find({ courseName: { $exists: false } });
    if (coursesWithOldFields.length > 0) {
      console.log(`\n⚠️  WARNING: Found ${coursesWithOldFields.length} courses using old field name 'name' instead of 'courseName'`);
      console.log('   These courses need to be migrated. Would you like to create a migration script?\n');
    }
    
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

checkCourseNameAndBanner();
