const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

async function checkCourseImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    const courses = await Course.find();
    console.log(`📊 Checking ${courses.length} courses for image storage:\n`);
    console.log('='.repeat(80));

    let cloudinaryCount = 0;
    let localCount = 0;
    let otherCount = 0;

    for (const course of courses) {
      console.log(`\n📚 ${course.courseName}`);
      console.log(`   Thumbnail: ${course.thumbnail}`);
      
      if (course.thumbnail) {
        if (course.thumbnail.includes('cloudinary.com')) {
          console.log(`   📍 Storage: Cloudinary (Cloud)`);
          cloudinaryCount++;
        } else if (course.thumbnail.startsWith('http://') || course.thumbnail.startsWith('https://')) {
          console.log(`   📍 Storage: External URL`);
          otherCount++;
        } else {
          console.log(`   📍 Storage: Local folder`);
          localCount++;
        }
      } else {
        console.log(`   ⚠️  No thumbnail set`);
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log(`\n📈 Summary:`);
    console.log(`   Total Courses: ${courses.length}`);
    console.log(`   Stored on Cloudinary (Cloud): ${cloudinaryCount}`);
    console.log(`   Stored Locally: ${localCount}`);
    console.log(`   External URLs: ${otherCount}\n`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkCourseImages();
