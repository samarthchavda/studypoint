const mongoose = require('mongoose');
const Course = require('../models/Course');
const Section = require('../models/Section');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const fixCourseContent = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Database connected\n');

    const course = await Course.findOne({ price: 0 });
    console.log('Found course:', course.name);
    console.log('Current sections:', course.courseContent.length);

    const sections = await Section.find({ courseId: course._id });
    console.log('Found sections in DB:', sections.length);
    
    if (sections.length > 0) {
      const sectionIds = sections.map(s => s._id);
      course.courseContent = sectionIds;
      await course.save();
      console.log('\n✅ Course updated with', sectionIds.length, 'sections!');
      sections.forEach((s, i) => {
        console.log(`${i + 1}. ${s.name} (${s.subSections.length} subsections)`);
      });
    }

    await mongoose.connection.close();
    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
    await mongoose.connection.close();
  }
};

fixCourseContent();
