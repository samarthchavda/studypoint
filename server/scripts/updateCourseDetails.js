const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');
const User = require('../models/User');
const Profile = require('../models/Profile');

async function updateCourseDetails() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('Connected to database\n');

    // Get all courses
    const courses = await Course.find({});
    console.log(`Found ${courses.length} courses\n`);

    const learningOutcomes = {
      'Complete Web Development Bootcamp': 'Build responsive websites using HTML and CSS, Master JavaScript fundamentals and ES6+ features, Create dynamic web apps with React, Build backend APIs with Node.js and Express, Work with MongoDB databases, Deploy applications to production',
      'React JS - The Complete Guide': 'Master React fundamentals and hooks, Build reusable components, Manage state with Redux and Context API, Handle routing with React Router, Optimize React applications, Test React components',
      'Flutter & Dart - Complete Guide': 'Build beautiful cross-platform apps, Master Flutter widgets and layouts, Implement state management, Work with Firebase backend, Create smooth animations, Deploy apps to stores',
      'React Native - Build Mobile Apps': 'Develop iOS and Android apps with React Native, Master React Native components, Handle navigation and routing, Work with device APIs, Implement push notifications, Publish apps to app stores',
      'Data Science Masterclass': 'Master Python for data analysis, Work with NumPy and Pandas, Create visualizations with Matplotlib, Perform statistical analysis, Build machine learning models, Work with real datasets',
      'Machine Learning A-Z': 'Understand ML algorithms, Build classification models, Create regression models, Implement clustering techniques, Work with neural networks, Deploy ML models',
      'Python Programming Masterclass': 'Master Python syntax and fundamentals, Work with data structures, Build object-oriented programs, Handle files and exceptions, Create Python packages, Build real-world projects',
      'Java Programming Complete Course': 'Learn Java fundamentals, Master object-oriented programming, Work with collections framework, Build GUI applications, Handle multithreading, Create enterprise applications',
      'Complete UI/UX Design Bootcamp': 'Master design principles, Create user personas and journey maps, Build wireframes and prototypes, Conduct user research, Design responsive interfaces, Create design systems',
      'Figma for Beginners': 'Master Figma interface and tools, Create vector graphics, Build interactive prototypes, Design responsive layouts, Collaborate with teams, Create design components'
    };

    // Update instructor about
    const instructors = await User.find({ accountType: 'Instructor' }).populate('additionalDetails');
    for (const instructor of instructors) {
      if (!instructor.additionalDetails.about) {
        await Profile.findByIdAndUpdate(
          instructor.additionalDetails._id,
          { 
            about: `Experienced ${instructor.accountType} with 10+ years in the industry. Passionate about teaching and helping students achieve their goals. Specialized in creating engaging and practical course content.`
          }
        );
        console.log(`✅ Updated about for ${instructor.firstName} ${instructor.lastName}`);
      }
    }

    // Update each course
    for (const course of courses) {
      const learningText = learningOutcomes[course.name] || 'Build practical skills, Master core concepts, Work on real projects, Get job-ready skills';
      
      await Course.findByIdAndUpdate(
        course._id,
        { 
          whatYouWillLearn: learningText
        }
      );
      
      console.log(`✅ Updated: ${course.name}`);
    }

    console.log('\n✅ All courses updated successfully!');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateCourseDetails();
