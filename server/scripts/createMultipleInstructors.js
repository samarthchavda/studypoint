const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('../models/User');
const Profile = require('../models/Profile');
const Course = require('../models/Course');

async function createInstructorsAndReassignCourses() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database\n');
    
    // Create 4 new instructor accounts
    const instructorsData = [
      {
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@studynotion.com',
        password: 'Instructor@123',
        about: 'Senior Full Stack Developer with 8+ years of experience in web technologies. Specialized in React, Node.js, and modern JavaScript frameworks. Passionate about creating practical, project-based learning experiences.',
        courses: ['Complete Web Development Bootcamp', 'React JS - The Complete Guide']
      },
      {
        firstName: 'Rahul',
        lastName: 'Verma',
        email: 'rahul.verma@studynotion.com',
        password: 'Instructor@123',
        about: 'Mobile App Development Expert with 10+ years in iOS and Android development. Built 50+ apps for Fortune 500 companies. Love teaching the art of creating beautiful, performant mobile applications.',
        courses: ['Flutter & Dart - Complete Guide', 'React Native - Build Mobile Apps']
      },
      {
        firstName: 'Anjali',
        lastName: 'Patel',
        email: 'anjali.patel@studynotion.com',
        password: 'Instructor@123',
        about: 'Data Scientist and AI Researcher with PhD in Machine Learning. Published 20+ research papers. Committed to making complex data science concepts accessible and practical for students worldwide.',
        courses: ['Data Science Masterclass', 'Machine Learning A-Z']
      },
      {
        firstName: 'Vikram',
        lastName: 'Singh',
        email: 'vikram.singh@studynotion.com',
        password: 'Instructor@123',
        about: 'Software Engineer and Programming Educator with 12+ years in enterprise software development. Expert in Java, Python, and software architecture. Dedicated to building strong programming fundamentals.',
        courses: ['Python Programming Masterclass', 'Java Programming Complete Course']
      }
    ];
    
    console.log('📝 Creating instructor accounts...\n');
    
    for (const instructorData of instructorsData) {
      // Check if instructor already exists
      let instructor = await User.findOne({ email: instructorData.email });
      
      if (instructor) {
        console.log(`⚠️  Instructor ${instructorData.firstName} ${instructorData.lastName} already exists, skipping creation`);
      } else {
        // Hash password
        const hashedPassword = await bcrypt.hash(instructorData.password, 10);
        
        // Create profile
        const profile = await Profile.create({
          gender: null,
          dateOfBirth: null,
          about: instructorData.about,
          contactNumber: null
        });
        
        // Create instructor
        instructor = await User.create({
          firstName: instructorData.firstName,
          lastName: instructorData.lastName,
          email: instructorData.email,
          password: hashedPassword,
          accountType: 'Instructor',
          approved: true,
          additionalDetails: profile._id,
          image: `https://api.dicebear.com/5.x/initials/svg?seed=${instructorData.firstName} ${instructorData.lastName}`
        });
        
        console.log(`✅ Created instructor: ${instructorData.firstName} ${instructorData.lastName}`);
      }
      
      // Assign courses to this instructor
      console.log(`   Assigning courses:`);
      for (const courseName of instructorData.courses) {
        const course = await Course.findOne({ name: courseName });
        if (course) {
          course.instructor = instructor._id;
          await course.save();
          
          // Add course to instructor's courses array
          if (!instructor.courses.includes(course._id)) {
            instructor.courses.push(course._id);
          }
          
          console.log(`   ✓ ${courseName}`);
        } else {
          console.log(`   ❌ Course not found: ${courseName}`);
        }
      }
      
      await instructor.save();
      console.log('');
    }
    
    // Handle remaining 2 courses (UI/UX) - keep with original instructor or create new one
    const uiuxInstructor = await User.findOne({ email: 'amanjagatiya43@gmail.com' });
    if (uiuxInstructor) {
      console.log('📝 Assigning UI/UX courses to original instructor...\n');
      const uiuxCourses = await Course.find({ 
        name: { $in: ['Complete UI/UX Design Bootcamp', 'Figma for Beginners'] }
      });
      
      for (const course of uiuxCourses) {
        course.instructor = uiuxInstructor._id;
        await course.save();
        
        if (!uiuxInstructor.courses.includes(course._id)) {
          uiuxInstructor.courses.push(course._id);
        }
        console.log(`   ✓ ${course.name}`);
      }
      
      await uiuxInstructor.save();
    }
    
    console.log('\n✅ All instructors created and courses reassigned!');
    console.log('\n📋 Instructor Accounts:');
    console.log('Email: priya.sharma@studynotion.com | Password: Instructor@123');
    console.log('Email: rahul.verma@studynotion.com | Password: Instructor@123');
    console.log('Email: anjali.patel@studynotion.com | Password: Instructor@123');
    console.log('Email: vikram.singh@studynotion.com | Password: Instructor@123');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createInstructorsAndReassignCourses();
