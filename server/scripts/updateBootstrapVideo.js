const mongoose = require('mongoose');
const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const Course = require('../models/Course');
require('dotenv').config();

async function updateBootstrapCourseVideo() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    // Find the "Bootstrap Learning" course
    const bootstrapCourse = await Course.findOne({ courseName: 'Bootstrap Learning' });
    
    if (!bootstrapCourse) {
      console.log('❌ Bootstrap Learning course not found!');
      process.exit(1);
    }

    console.log(`✅ Found course: ${bootstrapCourse.courseName}`);
    console.log(`   Course ID: ${bootstrapCourse._id}\n`);

    // Find all sections for this course
    const sections = await Section.find({ courseId: bootstrapCourse._id });
    
    console.log(`📚 Found ${sections.length} sections\n`);

    // Find the first Bootstrap lecture
    for (const section of sections) {
      const subsections = await SubSection.find({ sectionId: section._id });
      
      if (subsections.length > 0) {
        const firstSubsection = subsections[0]; // Get the first lecture
        console.log(`✅ Found subsection: ${firstSubsection.title}`);
        console.log(`   Current video: ${firstSubsection.videoUrl}\n`);

        // Update with the new YouTube video
        firstSubsection.videoUrl = 'https://youtu.be/fB00t4At0rk';
        firstSubsection.timeDuration = 3600; // ~1 hour (adjust as needed)
        await firstSubsection.save();

        console.log(`✅ Updated video URL to: ${firstSubsection.videoUrl}\n`);
        console.log('🎉 Successfully updated the Bootstrap course video!');
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

updateBootstrapCourseVideo();
