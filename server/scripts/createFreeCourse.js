const mongoose = require('mongoose');
const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const Profile = require('../models/Profile');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

// Create free course
const createFreeCourse = async () => {
  try {
    console.log('🚀 Starting free course creation...\n');

    // Step 1: Find or create "Web Development" category
    let category = await Category.findOne({ name: /web development/i });
    
    if (!category) {
      console.log('📁 Creating "Web Development" category...');
      category = await Category.create({
        name: 'Web Development',
        description: 'Learn web development from scratch',
        courses: []
      });
      console.log('✅ Category created:', category.name);
    } else {
      console.log('✅ Found existing category:', category.name);
    }

    // Step 2: Find or create instructor
    let instructor = await User.findOne({ accountType: 'Instructor' });
    
    if (!instructor) {
      console.log('👨‍🏫 Creating instructor account...');
      const instructorProfile = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: 'Experienced web development instructor',
        contactNumber: null
      });
      
      instructor = await User.create({
        firstName: 'StudyNotion',
        lastName: 'Team',
        email: 'instructor@studynotion.com',
        password: '$2a$10$dummyHashedPassword', // You should hash this properly
        accountType: 'Instructor',
        additionalDetails: instructorProfile._id,
        image: 'https://api.dicebear.com/5.x/initials/svg?seed=Instructor',
        courses: []
      });
      console.log('✅ Instructor created:', instructor.email);
    } else {
      console.log('✅ Found existing instructor:', instructor.email);
    }

    // Step 3: Check if free course already exists
    const existingCourse = await Course.findOne({ 
      name: 'HTML, CSS & Bootstrap - Complete Guide',
      price: 0 
    });

    if (existingCourse) {
      console.log('⚠️  Free course already exists:', existingCourse.name);
      console.log('Course ID:', existingCourse._id);
      return;
    }

    // Step 4: Create the free course first (without sections)
    console.log('🎓 Creating FREE course...');
    const freeCourse = await Course.create({
      name: 'HTML, CSS & Bootstrap - Complete Guide',
      description: 'Master web development fundamentals with this comprehensive free course. Learn HTML5, CSS3, and Bootstrap to build beautiful, responsive websites from scratch. Perfect for beginners!',
      instructor: instructor._id,
      whatYouWillLearn: 'Build responsive websites, Master HTML5 and CSS3, Use Bootstrap framework, Create modern layouts, Understand web design principles',
      courseContent: [],
      price: 0, // FREE COURSE
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', // Sample coding image
      tag: ['Web Development', 'HTML', 'CSS', 'Bootstrap', 'Frontend'],
      category: category._id,
      instructions: [
        'Basic computer knowledge required',
        'No prior programming experience needed',
        'A computer with internet connection',
        'Text editor (VS Code recommended)',
        'Enthusiasm to learn!'
      ],
      status: 'published',
      studentsEnrolled: [],
      ratingAndReviews: []
    });

    console.log('✅ Course created:', freeCourse.name);

    // Step 5: Create sections and subsections
    console.log('📚 Creating course sections...');

    // Section 1: HTML Basics
    const htmlSection = await Section.create({
      courseId: freeCourse._id,
      name: 'HTML Fundamentals',
      subSections: []
    });

    const htmlSubSections = await SubSection.insertMany([
      {
        courseId: freeCourse._id,
        sectionId: htmlSection._id,
        title: 'Introduction to HTML',
        timeDuration: 930, // 15:30 in seconds
        description: 'Learn the basics of HTML and web structure',
        videoUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE' // Sample educational video
      },
      {
        courseId: freeCourse._id,
        sectionId: htmlSection._id,
        title: 'HTML Tags and Elements',
        timeDuration: 1245, // 20:45 in seconds
        description: 'Understanding HTML tags, elements, and attributes',
        videoUrl: 'https://www.youtube.com/watch?v=pQN-pnXPaVg'
      },
      {
        courseId: freeCourse._id,
        sectionId: htmlSection._id,
        title: 'Forms and Input Elements',
        timeDuration: 1100, // 18:20 in seconds
        description: 'Creating forms and handling user input in HTML',
        videoUrl: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE'
      }
    ]);

    htmlSection.subSections = htmlSubSections.map(sub => sub._id);
    await htmlSection.save();
    console.log('✅ HTML Section created with', htmlSubSections.length, 'lectures');

    // Section 2: CSS Styling
    const cssSection = await Section.create({
      courseId: freeCourse._id,
      name: 'CSS Styling',
      subSections: []
    });

    const cssSubSections = await SubSection.insertMany([
      {
        courseId: freeCourse._id,
        sectionId: cssSection._id,
        title: 'Introduction to CSS',
        timeDuration: 1000, // 16:40 in seconds
        description: 'Learn CSS basics and how to style web pages',
        videoUrl: 'https://www.youtube.com/watch?v=yfoY53QXEnI'
      },
      {
        courseId: freeCourse._id,
        sectionId: cssSection._id,
        title: 'CSS Flexbox and Grid',
        timeDuration: 1335, // 22:15 in seconds
        description: 'Modern CSS layout with Flexbox and Grid',
        videoUrl: 'https://www.youtube.com/watch?v=JJSoEo8JSnc'
      },
      {
        courseId: freeCourse._id,
        sectionId: cssSection._id,
        title: 'Responsive Design',
        timeDuration: 1170, // 19:30 in seconds
        description: 'Making websites responsive for all devices',
        videoUrl: 'https://www.youtube.com/watch?v=srvUrASNj0s'
      }
    ]);

    cssSection.subSections = cssSubSections.map(sub => sub._id);
    await cssSection.save();
    console.log('✅ CSS Section created with', cssSubSections.length, 'lectures');

    // Section 3: Bootstrap Framework
    const bootstrapSection = await Section.create({
      courseId: freeCourse._id,
      name: 'Bootstrap Framework',
      subSections: []
    });

    const bootstrapSubSections = await SubSection.insertMany([
      {
        courseId: freeCourse._id,
        sectionId: bootstrapSection._id,
        title: 'Getting Started with Bootstrap',
        timeDuration: 865, // 14:25 in seconds
        description: 'Introduction to Bootstrap framework',
        videoUrl: 'https://www.youtube.com/watch?v=-qfEOE4vtxE'
      },
      {
        courseId: freeCourse._id,
        sectionId: bootstrapSection._id,
        title: 'Bootstrap Components',
        timeDuration: 1550, // 25:50 in seconds
        description: 'Using Bootstrap components for rapid development',
        videoUrl: 'https://www.youtube.com/watch?v=eow125xV5-c'
      },
      {
        courseId: freeCourse._id,
        sectionId: bootstrapSection._id,
        title: 'Building a Complete Website',
        timeDuration: 1800, // 30:00 in seconds
        description: 'Create a full responsive website using Bootstrap',
        videoUrl: 'https://www.youtube.com/watch?v=V_lAhqLXT9A'
      }
    ]);

    bootstrapSection.subSections = bootstrapSubSections.map(sub => sub._id);
    await bootstrapSection.save();
    console.log('✅ Bootstrap Section created with', bootstrapSubSections.length, 'lectures');

    // Step 6: Update course with sections
    freeCourse.courseContent = [htmlSection._id, cssSection._id, bootstrapSection._id];
    await freeCourse.save();
    console.log('✅ Course updated with sections');

    // Step 7: Update category with course
    category.courses.push(freeCourse._id);
    await category.save();

    // Step 8: Update instructor with course
    instructor.courses.push(freeCourse._id);
    await instructor.save();

    console.log('\n🎉 FREE COURSE CREATED SUCCESSFULLY!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Course Name:', freeCourse.name);
    console.log('💰 Price: FREE (₹0)');
    console.log('🆔 Course ID:', freeCourse._id);
    console.log('📁 Category:', category.name);
    console.log('👨‍🏫 Instructor:', instructor.firstName, instructor.lastName);
    console.log('📚 Sections:', freeCourse.courseContent.length);
    console.log('🎥 Total Lectures:', htmlSubSections.length + cssSubSections.length + bootstrapSubSections.length);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n✅ Students can now enroll in this course for FREE!');
    console.log('🔗 Navigate to: /courses/' + freeCourse._id);

  } catch (error) {
    console.error('❌ Error creating free course:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
  }
};

// Run the script
connectDB().then(() => {
  createFreeCourse();
});
