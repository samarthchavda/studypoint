const mongoose = require('mongoose');
const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const Course = require('../models/Course');
require('dotenv').config();

async function updateHTMLCourseVideo() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    // Find the "Learn HTML" course
    const htmlCourse = await Course.findOne({ courseName: 'Learn HTML' });
    
    if (!htmlCourse) {
      console.log('❌ Learn HTML course not found!');
      process.exit(1);
    }

    console.log(`✅ Found course: ${htmlCourse.courseName}`);
    console.log(`   Course ID: ${htmlCourse._id}\n`);

    // Find all sections for this course
    const sections = await Section.find({ courseId: htmlCourse._id });
    
    console.log(`📚 Found ${sections.length} sections\n`);

    // Find the "Introduction to HTML" subsection
    for (const section of sections) {
      const subsections = await SubSection.find({ sectionId: section._id });
      
      for (const subsection of subsections) {
        if (subsection.title.toLowerCase().includes('introduction to html')) {
          console.log(`✅ Found subsection: ${subsection.title}`);
          console.log(`   Current video: ${subsection.videoUrl}\n`);

          // Update with the new YouTube video
          subsection.videoUrl = 'https://youtu.be/HcOc7P5BMi4';
          subsection.timeDuration = 3600; // ~1 hour (adjust as needed)
          await subsection.save();

          console.log(`✅ Updated video URL to: ${subsection.videoUrl}\n`);
          console.log('🎉 Successfully updated the Introduction to HTML video!');
        }
      }
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateHTMLCourseVideo();
