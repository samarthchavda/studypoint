const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Course = require('../models/Course');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const Category = require('../models/Category');
const User = require('../models/User');

async function connect() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function run() {
  try {
    await connect();
    console.log('✅ Connected to DB');

    // Find base course (existing free course)
    const baseCourse = await Course.findOne({ name: /HTML, CSS & Bootstrap - Complete Guide/i, price: 0 });
    if (!baseCourse) {
      console.log('❌ Base free course not found');
      return;
    }
    console.log('🎓 Base course:', baseCourse.name, baseCourse._id.toString());

    // Ensure category & instructor
    const category = await Category.findById(baseCourse.category);
    const instructor = await User.findById(baseCourse.instructor);

    // Gather sections for the base course
    const sections = await Section.find({ courseId: baseCourse._id });
    const htmlSection = sections.find(s => /html/i.test(s.name));
    const cssSection = sections.find(s => /css/i.test(s.name));
    const bsSection = sections.find(s => /bootstrap/i.test(s.name));

    if (!htmlSection) { console.log('⚠️ No HTML section found'); }
    if (!cssSection) { console.log('⚠️ No CSS section found'); }
    if (!bsSection) { console.log('⚠️ No Bootstrap section found'); }

    // Create or find CSS-only course
    let cssCourse = await Course.findOne({ name: /CSS - Free to Learn/i, price: 0 });
    if (!cssCourse) {
      cssCourse = await Course.create({
        name: 'CSS - Free to Learn',
        description: 'Learn CSS3 styling, Flexbox, Grid, and responsive design. Free to learn.',
        instructor: instructor?._id,
        whatYouWillLearn: 'Style web pages, Master selectors, Flexbox, Grid, Responsive design',
        courseContent: [],
        price: 0,
        thumbnail: baseCourse.thumbnail,
        tag: ['Web Development', 'CSS', 'Frontend'],
        category: category?._id,
        instructions: baseCourse.instructions,
        status: 'published',
        studentsEnrolled: [],
        ratingAndReviews: []
      });
      console.log('✅ Created CSS course:', cssCourse._id.toString());
      // Link to category/instructor
      if (category) { category.courses.addToSet(cssCourse._id); await category.save(); }
      if (instructor) { instructor.courses.addToSet(cssCourse._id); await instructor.save(); }
    } else {
      console.log('ℹ️ Found existing CSS course:', cssCourse._id.toString());
    }

    // Create or find Bootstrap course
    let bsCourse = await Course.findOne({ name: /Bootstrap - Responsive Web Design/i, price: 0 });
    if (!bsCourse) {
      bsCourse = await Course.create({
        name: 'Bootstrap - Responsive Web Design',
        description: 'Build responsive websites using Bootstrap components, grid, and utilities. Free course.',
        instructor: instructor?._id,
        whatYouWillLearn: 'Bootstrap grid, components, utilities, and layouts',
        courseContent: [],
        price: 0,
        thumbnail: baseCourse.thumbnail,
        tag: ['Web Development', 'Bootstrap', 'Frontend', 'Responsive'],
        category: category?._id,
        instructions: baseCourse.instructions,
        status: 'published',
        studentsEnrolled: [],
        ratingAndReviews: []
      });
      console.log('✅ Created Bootstrap course:', bsCourse._id.toString());
      if (category) { category.courses.addToSet(bsCourse._id); await category.save(); }
      if (instructor) { instructor.courses.addToSet(bsCourse._id); await instructor.save(); }
    } else {
      console.log('ℹ️ Found existing Bootstrap course:', bsCourse._id.toString());
    }

    // Move CSS section to CSS course
    if (cssSection && cssSection.courseId.toString() !== cssCourse._id.toString()) {
      cssSection.courseId = cssCourse._id;
      await cssSection.save();
      await SubSection.updateMany({ sectionId: cssSection._id }, { $set: { courseId: cssCourse._id } });
      await Course.findByIdAndUpdate(cssCourse._id, { $addToSet: { courseContent: cssSection._id } });
      console.log('🔁 Moved CSS section to CSS course');
    }

    // Move Bootstrap section to Bootstrap course
    if (bsSection && bsSection.courseId.toString() !== bsCourse._id.toString()) {
      bsSection.courseId = bsCourse._id;
      await bsSection.save();
      await SubSection.updateMany({ sectionId: bsSection._id }, { $set: { courseId: bsCourse._id } });
      await Course.findByIdAndUpdate(bsCourse._id, { $addToSet: { courseContent: bsSection._id } });
      console.log('🔁 Moved Bootstrap section to Bootstrap course');
    }

    // Update base course to be HTML only and rename
    let newContent = [];
    if (htmlSection) newContent.push(htmlSection._id);
    baseCourse.courseContent = newContent;
    baseCourse.name = 'HTML - Complete Guide';
    baseCourse.tag = ['Web Development', 'HTML', 'Frontend'];
    await baseCourse.save();
    console.log('✏️ Updated base course to HTML-only:', baseCourse._id.toString());

    console.log('\n🎉 Split complete');
    console.log('HTML Course ID:', baseCourse._id.toString());
    console.log('CSS Course ID:', cssCourse?._id?.toString());
    console.log('Bootstrap Course ID:', bsCourse?._id?.toString());
  } catch (e) {
    console.error('❌ Error:', e);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Disconnected');
  }
}

run();
