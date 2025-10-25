const mongoose = require('mongoose');
const Course = require('../models/Course');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const VIDEO_URL = 'https://youtu.be/HcOc7P5BMi4?si=4cXRR04t5e7HnbHT';

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ DB connected');

    const course = await Course.findOne({ price: 0 }).lean();
    if (!course) {
      console.log('❌ Free course not found');
      return;
    }
    console.log('Course:', course.name, course._id.toString());

    // Prefer HTML section; else use first section
    let section = await Section.findOne({ courseId: course._id, name: /html/i });
    if (!section) {
      section = await Section.findOne({ courseId: course._id });
    }
    if (!section) {
      console.log('❌ No section found for course');
      return;
    }

    // Create new SubSection with provided video
    const sub = await SubSection.create({
      courseId: course._id,
      sectionId: section._id,
      title: 'HTML & CSS Full Course (YouTube)',
      description: 'Full HTML & CSS course added as requested',
      videoUrl: VIDEO_URL,
      timeDuration: 0,
    });

    // Attach to section
    section.subSections = section.subSections || [];
    section.subSections.push(sub._id);
    await section.save();

    console.log('✅ Added video to section:', section.name);
    console.log('   SubSection ID:', sub._id.toString());
  } catch (e) {
    console.error('❌ Error:', e);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Connection closed');
  }
}

run();
