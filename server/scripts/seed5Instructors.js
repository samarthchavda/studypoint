require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Course = require('../models/Course');
const Category = require('../models/Category');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/studynotion')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });

const instructors = [
  { firstName: 'Raj', lastName: 'Kumar', email: 'raj.kumar@studynotion.com', about: 'Full Stack Developer with 8+ years of experience' },
  { firstName: 'Priya', lastName: 'Sharma', email: 'priya.sharma@studynotion.com', about: 'Data Science expert and AI researcher' },
  { firstName: 'Amit', lastName: 'Patel', email: 'amit.patel@studynotion.com', about: 'Mobile App Developer specializing in React Native' },
  { firstName: 'Sneha', lastName: 'Reddy', email: 'sneha.reddy@studynotion.com', about: 'UI/UX Designer and Frontend Developer' },
  { firstName: 'Vikram', lastName: 'Singh', email: 'vikram.singh@studynotion.com', about: 'Cloud Computing and DevOps specialist' }
];

async function seed() {
  try {
    console.log('🚀 Starting seed...\n');

    // Create categories
    const categories = ['Web Development', 'Data Science', 'Machine Learning', 'Mobile App Development', 'Design', 'Cloud Computing'];
    const categoryMap = {};
    
    for (const catName of categories) {
      let cat = await Category.findOne({ name: catName });
      if (!cat) {
        cat = await Category.create({ name: catName, description: `${catName} courses` });
      }
      categoryMap[catName] = cat._id;
    }
    console.log('✅ Categories ready\n');

    // Create instructors and courses
    for (let i = 0; i < instructors.length; i++) {
      const inst = instructors[i];
      
      let instructor = await User.findOne({ email: inst.email });
      if (!instructor) {
        const profile = await Profile.create({ about: inst.about });
        const hashedPassword = await bcrypt.hash('Test@123', 10);
        instructor = await User.create({
          firstName: inst.firstName,
          lastName: inst.lastName,
          email: inst.email,
          accountType: 'Instructor',
          password: hashedPassword,
          additionalDetails: profile._id,
          image: `https://api.dicebear.com/5.x/initials/svg?seed=${inst.firstName} ${inst.lastName}`,
          courses: []
        });
        console.log(`✅ Created instructor: ${inst.firstName} ${inst.lastName}`);
      } else {
        console.log(`ℹ️  Instructor exists: ${inst.email}`);
      }

      // Create 2 courses per instructor
      for (let j = 1; j <= 2; j++) {
        const courseName = `${inst.firstName}'s Course ${j}`;
        
        const existing = await Course.findOne({ name: courseName, instructor: instructor._id });
        if (existing) {
          console.log(`   ⏭️  Course exists: ${courseName}`);
          continue;
        }

        // Pick a category
        const catNames = Object.keys(categoryMap);
        const selectedCat = catNames[i % catNames.length];

        // Create course
        const course = await Course.create({
          name: courseName,
          description: `Comprehensive course on ${selectedCat} by ${inst.firstName} ${inst.lastName}. Learn industry-standard practices and build real projects.`,
          instructor: instructor._id,
          whatYouWillLearn: `Master ${selectedCat} concepts, Build practical projects, Work with industry tools, Get certification`,
          courseContent: [],
          price: 2999 + (j * 1000),
          thumbnail: `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500`,
          category: categoryMap[selectedCat],
          studentsEnrolled: [],
          instructions: ['Basic programming knowledge', 'Willingness to learn', 'Computer with internet'],
          status: 'published'
        });

        // Create 1 section with 2 subsections
        const section = await Section.create({
          courseId: course._id,
          name: 'Introduction',
          subSections: []
        });

        const sub1 = await SubSection.create({
          courseId: course._id,
          sectionId: section._id,
          title: 'Course Overview',
          timeDuration: 600,
          description: 'Introduction to the course',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        });

        const sub2 = await SubSection.create({
          courseId: course._id,
          sectionId: section._id,
          title: 'Getting Started',
          timeDuration: 900,
          description: 'Setting up the environment',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        });

        section.subSections = [sub1._id, sub2._id];
        await section.save();

        course.courseContent = [section._id];
        await course.save();

        await User.findByIdAndUpdate(instructor._id, { $push: { courses: course._id } });
        await Category.findByIdAndUpdate(categoryMap[selectedCat], { $push: { courses: course._id } });

        console.log(`   ✅ Created: ${courseName}`);
      }
      console.log('');
    }

    const totalInst = await User.countDocuments({ accountType: 'Instructor' });
    const totalCourses = await Course.countDocuments();
    
    console.log('✨ Seed complete!\n');
    console.log('📊 Summary:');
    console.log(`   Instructors: ${totalInst}`);
    console.log(`   Courses: ${totalCourses}\n`);
    console.log('🔑 All instructors use password: Test@123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seed();
