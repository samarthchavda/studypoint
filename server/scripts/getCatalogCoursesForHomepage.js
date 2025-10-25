const mongoose = require('mongoose');
const Course = require('../models/Course');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const User = require('../models/User');
const Category = require('../models/Category');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB\n');

    // Get 6 non-free courses for homepage
    const courses = await Course.find({ status: 'published', price: { $gt: 0 } })
      .populate('instructor', 'firstName lastName')
      .populate('category', 'name')
      .select('name description price _id instructor category studentsEnrolled courseContent')
      .limit(6)
      .lean();

    console.log(`📚 Found ${courses.length} paid courses for homepage:\n`);
    
    for (const course of courses) {
      // Count total lessons
      const sections = await Section.find({ _id: { $in: course.courseContent } }).lean();
      const allSubSectionIds = sections.flatMap(s => s.subSections || []);
      const subsections = await SubSection.find({ _id: { $in: allSubSectionIds } }).lean();
      const lessonCount = subsections.length;

      console.log(`{
  heading: "${course.name}",
  description: "${course.description?.substring(0, 120)}...",
  level: "Beginner",
  lessionNumber: ${lessonCount}
},`);
    }

  } catch (e) {
    console.error('❌ Error:', e);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Disconnected');
  }
}

run();
