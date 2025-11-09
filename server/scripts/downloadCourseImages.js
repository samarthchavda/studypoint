const https = require('https');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
};

async function downloadCourseImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    const courses = await Course.find({ courseName: { $exists: true, $ne: null } });
    const coursesWithUnsplash = courses.filter(c => 
      c.thumbnail && c.thumbnail.includes('unsplash.com')
    );

    console.log(`📥 Downloading ${coursesWithUnsplash.length} course images...\n`);

    const imagesDir = path.join(__dirname, '../../src/assets/courseImages');
    
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    let successCount = 0;

    for (const course of coursesWithUnsplash) {
      const imageId = course.thumbnail.split('/').pop().split('?')[0];
      const filename = `${course.courseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`;
      const filepath = path.join(imagesDir, filename);

      try {
        console.log(`📥 Downloading: ${course.courseName}...`);
        await downloadImage(course.thumbnail, filepath);
        console.log(`   ✅ Saved as: ${filename}\n`);
        successCount++;
      } catch (error) {
        console.log(`   ❌ Failed: ${error.message}\n`);
      }
    }

    console.log(`\n🎉 Downloaded ${successCount}/${coursesWithUnsplash.length} images successfully!`);
    console.log(`📁 Location: src/assets/courseImages/\n`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

downloadCourseImages();
