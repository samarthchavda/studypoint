const mongoose = require('mongoose');
const Course = require('../models/Course');
const RatingAndReview = require('../models/RatingAndReview');
const User = require('../models/User');
require('dotenv').config();

// Sample reviews for different courses
const reviewsData = {
  'React JS - Complete Guide 2024': [
    { rating: 5, review: 'Excellent course! Very comprehensive and well-structured. Learned a lot about React hooks and state management.' },
    { rating: 5, review: 'Best React course I have taken. The instructor explains concepts clearly and the projects are very practical.' },
    { rating: 4, review: 'Great content and examples. Would recommend to anyone wanting to learn React.' },
    { rating: 5, review: 'Outstanding course! The explanations are crystal clear and the pace is perfect.' }
  ],
  'Python Programming Masterclass - Zero to Hero': [
    { rating: 5, review: 'Perfect for beginners! The instructor takes time to explain everything from basics to advanced concepts.' },
    { rating: 5, review: 'This course is amazing! I went from zero Python knowledge to building my own projects.' },
    { rating: 4, review: 'Very detailed course with lots of practical examples. Highly recommended!' },
    { rating: 5, review: 'Best Python course on the platform. Clear explanations and great exercises.' }
  ],
  'JavaScript - The Complete Guide 2024': [
    { rating: 5, review: 'Comprehensive JavaScript course covering everything from basics to advanced topics!' },
    { rating: 5, review: 'Excellent teaching style. Makes complex concepts easy to understand.' },
    { rating: 4, review: 'Great course for both beginners and intermediate developers.' },
    { rating: 5, review: 'This course helped me master JavaScript. Highly recommended!' }
  ],
  'Data Science Masterclass with Python': [
    { rating: 5, review: 'Incredible course! Covers all essential data science topics with real-world projects.' },
    { rating: 5, review: 'Best data science course I have taken. Very practical and hands-on.' },
    { rating: 4, review: 'Great content and excellent instructor. Worth every penny!' }
  ],
  'Machine Learning A-Z: Hands-On Python': [
    { rating: 5, review: 'Outstanding ML course! Covers everything from basics to advanced algorithms.' },
    { rating: 5, review: 'This course made machine learning easy to understand. Highly recommended!' },
    { rating: 4, review: 'Excellent course with practical examples and projects.' }
  ],
  'Flutter & Dart - Complete Mobile App Development': [
    { rating: 5, review: 'Best Flutter course! Built multiple apps while learning.' },
    { rating: 5, review: 'Comprehensive and well-structured. Perfect for mobile app development.' },
    { rating: 4, review: 'Great course for learning Flutter from scratch.' }
  ],
  'React Native - Build iOS & Android Apps': [
    { rating: 5, review: 'Excellent React Native course! Very practical and project-based.' },
    { rating: 4, review: 'Great course for building cross-platform mobile apps.' },
    { rating: 5, review: 'Clear explanations and hands-on projects. Highly recommended!' }
  ],
  'Complete UI/UX Design Bootcamp with Figma': [
    { rating: 5, review: 'Amazing UI/UX course! Learned so much about design principles.' },
    { rating: 5, review: 'Best design course I have taken. Very practical and industry-focused.' },
    { rating: 4, review: 'Great course for aspiring designers. Covers all essential topics.' }
  ],
  'Figma UI/UX Design Essentials': [
    { rating: 5, review: 'Perfect Figma course for beginners! Easy to follow and very practical.' },
    { rating: 4, review: 'Great introduction to Figma and UI/UX design.' }
  ]
};

async function addReviewsToCourses() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    // Get some students to assign as reviewers
    const students = await User.find({ accountType: 'Student' }).limit(10);
    
    if (students.length === 0) {
      console.log('⚠️  No students found. Creating sample students...');
      // Create sample students if none exist
      for (let i = 1; i <= 5; i++) {
        await User.create({
          firstName: `Student${i}`,
          lastName: 'User',
          email: `student${i}@example.com`,
          password: '$2a$10$dummyHashedPassword',
          accountType: 'Student',
          image: `https://api.dicebear.com/5.x/initials/svg?seed=Student${i}`,
          courses: []
        });
      }
      const newStudents = await User.find({ accountType: 'Student' }).limit(10);
      students.push(...newStudents);
    }

    console.log(`✅ Found ${students.length} students\n`);

    let totalReviewsAdded = 0;

    for (const [courseName, reviews] of Object.entries(reviewsData)) {
      const course = await Course.findOne({ courseName });
      
      if (!course) {
        console.log(`⏭️  Course not found: ${courseName}`);
        continue;
      }

      // Check if reviews already exist
      const existingReviews = await RatingAndReview.find({ course: course._id });
      if (existingReviews.length > 0) {
        console.log(`⏭️  Reviews already exist for: ${courseName}`);
        continue;
      }

      console.log(`📝 Adding reviews to: ${courseName}`);

      const reviewIds = [];

      for (let i = 0; i < reviews.length; i++) {
        const student = students[i % students.length];
        const { rating, review } = reviews[i];

        const ratingReview = await RatingAndReview.create({
          user: student._id,
          course: course._id,
          rating: rating,
          review: review
        });

        reviewIds.push(ratingReview._id);
        totalReviewsAdded++;
      }

      // Update course with reviews
      course.ratingAndReviews = reviewIds;
      await course.save();

      console.log(`   ✅ Added ${reviews.length} reviews\n`);
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n🎉 Successfully added ${totalReviewsAdded} reviews across courses!`);
    console.log('\n📊 Courses now have ratings and reviews visible to users.\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addReviewsToCourses();
