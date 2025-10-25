const mongoose = require('mongoose');
const Course = require('../models/Course');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const deleteFreeCourse = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Database connected\n');

    // Find free course
    const course = await Course.findOne({ price: 0 });
    if (!course) {
      console.log('No free course found');
      await mongoose.connection.close();
      return;
    }

    console.log('Found course:', course.name, '(ID:', course._id, ')');

    // Delete all sections for this course
    const sectionsDeleted = await Section.deleteMany({ courseId: course._id });
    console.log('Deleted', sectionsDeleted.deletedCount, 'sections');

    // Delete all subsections for this course
    const subsectionsDeleted = await SubSection.deleteMany({ courseId: course._id });
    console.log('Deleted', subsectionsDeleted.deletedCount, 'subsections');

    // Delete the course
    await Course.findByIdAndDelete(course._id);
    console.log('✅ Course deleted');

    await mongoose.connection.close();
    console.log('\n✅ Done! Now run createFreeCourse.js again');
  } catch (error) {
    console.error('❌ Error:', error);
    await mongoose.connection.close();
  }
};

deleteFreeCourse();
