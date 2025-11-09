const mongoose = require('mongoose');
const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
require('dotenv').config();

const FREE_COURSES = [
  {
    courseName: 'Learn HTML',
    courseDescription: 'This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.',
    whatYouWillLearn: 'Create and structure web pages with HTML, Add text, links, and images to websites, Understand HTML5 semantic elements, Build forms and handle user input, Use tables and lists effectively, Embed videos and media content',
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800',
    tag: ['HTML', 'Web Development', 'Frontend', 'Free'],
    sections: [
      {
        name: 'HTML Basics',
        subsections: [
          { title: 'Introduction to HTML', description: 'Learn what HTML is and how it works', timeDuration: 600 },
          { title: 'HTML Document Structure', description: 'Understanding the basic structure of HTML documents', timeDuration: 900 }
        ]
      }
    ]
  },
  {
    courseName: 'Learn CSS',
    courseDescription: 'Free to learn CSS basics: selectors, the box model, colors/fonts, and modern layout with Flexbox and Grid.',
    whatYouWillLearn: 'Style web pages with CSS, Work with selectors and specificity, Master the CSS box model, Use colors, fonts, and backgrounds, Create layouts with Flexbox and Grid, Build responsive designs with media queries',
    thumbnail: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800',
    tag: ['CSS', 'Web Development', 'Frontend', 'Free'],
    sections: [
      {
        name: 'CSS Fundamentals',
        subsections: [
          { title: 'Introduction to CSS', description: 'Learn CSS basics and how to style web pages', timeDuration: 700 },
          { title: 'CSS Flexbox and Grid', description: 'Modern CSS layout with Flexbox and Grid', timeDuration: 1200 }
        ]
      }
    ]
  },
  {
    courseName: 'Bootstrap Learning',
    courseDescription: 'Learn Bootstrap 5 to build responsive, mobile‑first websites using the grid system, utilities, and ready‑made components.',
    whatYouWillLearn: 'Build responsive websites with Bootstrap, Use Bootstrap grid system effectively, Work with Bootstrap components, Customize Bootstrap themes, Create mobile-first designs, Use Bootstrap utilities and classes',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
    tag: ['Bootstrap', 'CSS', 'Web Development', 'Frontend', 'Free'],
    sections: [
      {
        name: 'Bootstrap Basics',
        subsections: [
          { title: 'Getting Started with Bootstrap', description: 'Introduction to Bootstrap framework', timeDuration: 800 },
          { title: 'Bootstrap Components', description: 'Using Bootstrap components for rapid development', timeDuration: 1400 }
        ]
      }
    ]
  }
];

async function addFreeCoursesForHomepage() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    // Get Web Development category
    let category = await Category.findOne({ name: /web development/i });
    if (!category) {
      category = await Category.create({
        name: 'Web Development',
        description: 'Learn web development from scratch',
        courses: []
      });
      console.log('✅ Created Web Development category');
    }

    // Get an instructor
    const instructor = await User.findOne({ accountType: 'Instructor' });
    if (!instructor) {
      console.log('❌ No instructor found! Please create an instructor first.');
      process.exit(1);
    }
    console.log(`✅ Found instructor: ${instructor.firstName} ${instructor.lastName}\n`);

    const createdCourses = [];

    for (const courseData of FREE_COURSES) {
      // Check if course already exists
      const existingCourse = await Course.findOne({ courseName: courseData.courseName });
      if (existingCourse) {
        console.log(`⏭️  Course already exists: ${courseData.courseName}`);
        console.log(`   Course ID: ${existingCourse._id}\n`);
        createdCourses.push(existingCourse);
        continue;
      }

      // Create the course first (without sections)
      const course = await Course.create({
        courseName: courseData.courseName,
        courseDescription: courseData.courseDescription,
        instructor: instructor._id,
        whatYouWillLearn: courseData.whatYouWillLearn,
        courseContent: [],
        ratingAndReview: [],
        price: 0, // FREE COURSE
        thumbnail: courseData.thumbnail,
        category: category._id,
        tag: courseData.tag,
        studentsEnrolled: [],
        instructions: ['Basic computer knowledge', 'Internet connection', 'Text editor (VS Code recommended)', 'Eagerness to learn!'],
        status: 'published',
        language: 'English',
        level: 'Beginner'
      });

      // Create sections and subsections
      const sectionIds = [];
      
      for (const sectionData of courseData.sections) {
        // Create section
        const section = await Section.create({
          name: sectionData.name,
          courseId: course._id,
          subSections: []
        });

        // Create subsections
        const subsectionIds = [];
        for (const subData of sectionData.subsections) {
          const subsection = await SubSection.create({
            title: subData.title,
            description: subData.description,
            timeDuration: subData.timeDuration,
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder video
            courseId: course._id,
            sectionId: section._id
          });
          subsectionIds.push(subsection._id);
        }

        // Update section with subsections
        section.subSections = subsectionIds;
        await section.save();
        sectionIds.push(section._id);
      }

      // Update course with sections
      course.courseContent = sectionIds;
      await course.save();

      // Add course to category
      category.courses.push(course._id);
      await category.save();

      // Add course to instructor
      instructor.courses.push(course._id);
      await instructor.save();

      console.log(`✅ Created FREE course: ${courseData.courseName}`);
      console.log(`   Course ID: ${course._id}`);
      console.log(`   Price: ₹0 (FREE)\n`);
      
      createdCourses.push(course);
    }

    console.log('\n🎉 Free courses setup complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📋 Course IDs to update in Card.jsx:\n');
    
    createdCourses.forEach(course => {
      console.log(`"${course.courseName}": "${course._id}",`);
    });
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n✅ Students can now enroll in these courses for FREE!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addFreeCoursesForHomepage();
