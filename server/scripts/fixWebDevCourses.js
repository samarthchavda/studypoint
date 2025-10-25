const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');

async function fixWebDevCourses() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database\n');
    
    // Find the Web Development courses
    const webBootcamp = await Course.findOne({ name: 'Complete Web Development Bootcamp' });
    const reactGuide = await Course.findOne({ name: 'React JS - The Complete Guide' });
    
    if (!webBootcamp) {
      console.log('❌ Web Development Bootcamp not found');
      process.exit(1);
    }
    
    if (!reactGuide) {
      console.log('❌ React JS Guide not found');
      process.exit(1);
    }
    
    console.log('Found both courses. Adding sections and subsections...\n');
    
    // Add sections to Web Development Bootcamp
    console.log('📝 Adding content to Complete Web Development Bootcamp');
    
    // Create Section 1
    const section1 = await Section.create({
      courseId: webBootcamp._id,
      name: 'HTML & CSS Fundamentals'
    });
    
    // Create subsections for Section 1
    const subsection1_1 = await SubSection.create({
      courseId: webBootcamp._id,
      sectionId: section1._id,
      title: 'Introduction to HTML',
      description: 'Learn HTML basics and structure',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      timeDuration: 1800
    });
    
    const subsection1_2 = await SubSection.create({
      courseId: webBootcamp._id,
      sectionId: section1._id,
      title: 'CSS Basics and Styling',
      description: 'Learn CSS fundamentals',
      videoUrl: 'https://www.youtube.com/embed/OXGznpKZ_sA',
      timeDuration: 2100
    });
    
    section1.subSections = [subsection1_1._id, subsection1_2._id];
    await section1.save();
    
    // Create Section 2
    const section2 = await Section.create({
      courseId: webBootcamp._id,
      name: 'JavaScript Essentials'
    });
    
    // Create subsections for Section 2
    const subsection2_1 = await SubSection.create({
      courseId: webBootcamp._id,
      sectionId: section2._id,
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript basics',
      videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
      timeDuration: 2400
    });
    
    const subsection2_2 = await SubSection.create({
      courseId: webBootcamp._id,
      sectionId: section2._id,
      title: 'DOM Manipulation',
      description: 'Working with the Document Object Model',
      videoUrl: 'https://www.youtube.com/embed/5fb2aPlgoys',
      timeDuration: 1900
    });
    
    section2.subSections = [subsection2_1._id, subsection2_2._id];
    await section2.save();
    
    webBootcamp.courseContent = [section1._id, section2._id];
    await webBootcamp.save();
    console.log('   ✅ Added 2 sections with 4 lectures\n');
    
    // Add sections to React JS Guide
    console.log('📝 Adding content to React JS - The Complete Guide');
    
    // Create Section 3
    const section3 = await Section.create({
      courseId: reactGuide._id,
      name: 'React Fundamentals'
    });
    
    // Create subsections for Section 3
    const subsection3_1 = await SubSection.create({
      courseId: reactGuide._id,
      sectionId: section3._id,
      title: 'Introduction to React',
      description: 'Getting started with React',
      videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0',
      timeDuration: 2000
    });
    
    const subsection3_2 = await SubSection.create({
      courseId: reactGuide._id,
      sectionId: section3._id,
      title: 'React Components',
      description: 'Building reusable components',
      videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
      timeDuration: 2200
    });
    
    section3.subSections = [subsection3_1._id, subsection3_2._id];
    await section3.save();
    
    // Create Section 4
    const section4 = await Section.create({
      courseId: reactGuide._id,
      name: 'State Management'
    });
    
    // Create subsections for Section 4
    const subsection4_1 = await SubSection.create({
      courseId: reactGuide._id,
      sectionId: section4._id,
      title: 'React Hooks - useState',
      description: 'Managing component state with hooks',
      videoUrl: 'https://www.youtube.com/embed/O6P86uwfdR0',
      timeDuration: 1800
    });
    
    const subsection4_2 = await SubSection.create({
      courseId: reactGuide._id,
      sectionId: section4._id,
      title: 'React Hooks - useEffect',
      description: 'Side effects in React',
      videoUrl: 'https://www.youtube.com/embed/0ZJgIjIuY7U',
      timeDuration: 2100
    });
    
    section4.subSections = [subsection4_1._id, subsection4_2._id];
    await section4.save();
    
    reactGuide.courseContent = [section3._id, section4._id];
    await reactGuide.save();
    console.log('   ✅ Added 2 sections with 4 lectures\n');
    
    console.log('✅ Successfully fixed both Web Development courses!');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixWebDevCourses();
