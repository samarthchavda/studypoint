const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');

// Default banner URL (you can replace this with your own default image)
const DEFAULT_BANNER = 'https://res.cloudinary.com/demo/image/upload/v1/sample_courses/default_course_banner.jpg';

async function fixCourseNameAndBanner() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');
    
    console.log('🔍 Checking for courses that need fixing...\n');
    
    // Find all courses
    const courses = await Course.find({});
    
    let fixedCount = 0;
    let issuesFound = [];
    
    for (const course of courses) {
      let needsUpdate = false;
      let updates = {};
      let issues = [];
      
      // Check if courseName is missing but name exists (old schema)
      if (!course.courseName && course.name) {
        updates.courseName = course.name;
        needsUpdate = true;
        issues.push('Migrated name → courseName');
      } else if (!course.courseName || course.courseName.trim() === '') {
        // If no courseName and no name, set a default
        updates.courseName = `Untitled Course ${course._id.toString().substring(0, 6)}`;
        needsUpdate = true;
        issues.push('Added default courseName');
      }
      
      // Check if courseDescription is missing but description exists (old schema)
      if (!course.courseDescription && course.description) {
        updates.courseDescription = course.description;
        needsUpdate = true;
        issues.push('Migrated description → courseDescription');
      } else if (!course.courseDescription || course.courseDescription.trim() === '') {
        updates.courseDescription = 'Course description coming soon.';
        needsUpdate = true;
        issues.push('Added default courseDescription');
      }
      
      // Check if thumbnail/banner is missing
      if (!course.thumbnail || course.thumbnail.trim() === '') {
        updates.thumbnail = DEFAULT_BANNER;
        needsUpdate = true;
        issues.push('Added default thumbnail/banner');
      }
      
      if (needsUpdate) {
        await Course.findByIdAndUpdate(course._id, { $set: updates });
        fixedCount++;
        
        console.log(`✅ Fixed Course ID: ${course._id}`);
        console.log(`   Name: ${updates.courseName || course.courseName}`);
        issues.forEach(issue => console.log(`   - ${issue}`));
        console.log('');
        
        issuesFound.push({
          id: course._id,
          name: updates.courseName || course.courseName,
          fixes: issues
        });
      }
    }
    
    console.log('='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    console.log(`\n📊 Total courses checked: ${courses.length}`);
    console.log(`✅ Courses fixed: ${fixedCount}`);
    console.log(`✓  Courses already OK: ${courses.length - fixedCount}\n`);
    
    if (fixedCount > 0) {
      console.log('📝 FIXED COURSES DETAILS:');
      console.log('-'.repeat(80));
      issuesFound.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} (${item.id})`);
        item.fixes.forEach(fix => console.log(`   - ${fix}`));
      });
      console.log('');
    }
    
    console.log('💡 NOTE: If you want to use custom banners instead of the default,');
    console.log('   please update them through the admin panel or course edit interface.\n');
    
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

fixCourseNameAndBanner();
