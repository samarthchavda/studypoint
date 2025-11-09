const mongoose = require('mongoose');
const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const Course = require('../models/Course');
require('dotenv').config();

async function updateCSSCourseVideo() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    // Find the "Learn CSS" course
    const cssCourse = await Course.findOne({ courseName: 'Learn CSS' });
    
    if (!cssCourse) {
      console.log('❌ Learn CSS course not found!');
      process.exit(1);
    }

    console.log(`✅ Found course: ${cssCourse.courseName}`);
    console.log(`   Course ID: ${cssCourse._id}\n`);

    // Find all sections for this course
    const sections = await Section.find({ courseId: cssCourse._id });
    
    console.log(`📚 Found ${sections.length} sections\n`);

    // Find the first CSS lecture (usually "Introduction to CSS")
    for (const section of sections) {
      const subsections = await SubSection.find({ sectionId: section._id });
      
      if (subsections.length > 0) {
        const firstSubsection = subsections[0]; // Get the first lecture
        console.log(`✅ Found subsection: ${firstSubsection.title}`);
        console.log(`   Current video: ${firstSubsection.videoUrl}\n`);

        // Update with the new YouTube video
        firstSubsection.videoUrl = 'https://youtu.be/ESnrn1kAD4E';
        firstSubsection.timeDuration = 3600; // ~1 hour (adjust as needed)
        await firstSubsection.save();

        console.log(`✅ Updated video URL to: ${firstSubsection.videoUrl}\n`);
        console.log('🎉 Successfully updated the CSS course video!');
        break; // Only update the first lecture
      }
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateCSSCourseVideo();
