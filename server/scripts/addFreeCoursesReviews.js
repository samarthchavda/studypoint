const mongoose = require('mongoose');
const Course = require('../models/Course');
const RatingAndReview = require('../models/RatingAndReview');
const User = require('../models/User');
require('dotenv').config();

async function addReviewsToFreeCourses() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    const students = await User.find({ accountType: 'Student' }).limit(10);
    console.log(`✅ Found ${students.length} students\n`);

    const freeCoursesReviews = {
      'Learn HTML': [
        { rating: 5, review: 'Perfect for beginners! Great introduction to HTML basics.' },
        { rating: 5, review: 'Clear and concise. Learned HTML fundamentals quickly.' },
        { rating: 4, review: 'Good starting point for web development. Recommended!' },
        { rating: 5, review: 'Excellent free course! Very helpful for learning HTML.' }
      ],
      'Learn CSS': [
        { rating: 5, review: 'Amazing CSS tutorial! Learned styling from scratch.' },
        { rating: 5, review: 'Great course for understanding CSS fundamentals.' },
        { rating: 4, review: 'Very useful for beginners. Clear explanations.' },
        { rating: 5, review: 'Best free CSS course! Highly recommended.' }
      ],
      'Bootstrap Learning': [
        { rating: 5, review: 'Excellent introduction to Bootstrap framework!' },
        { rating: 5, review: 'Learned to build responsive websites quickly.' },
        { rating: 4, review: 'Great course for learning Bootstrap basics.' },
        { rating: 5, review: 'Very practical and hands-on. Love it!' }
      ]
    };

    let totalAdded = 0;

    for (const [courseName, reviews] of Object.entries(freeCoursesReviews)) {
      const course = await Course.findOne({ courseName });
      
      if (!course) {
        console.log(`⏭️  Course not found: ${courseName}`);
        continue;
      }

      const existingReviews = await RatingAndReview.find({ course: course._id });
      if (existingReviews.length > 0) {
        console.log(`⏭️  ${courseName}: Already has ${existingReviews.length} reviews`);
        continue;
      }

      console.log(`📝 Adding reviews to: ${courseName}`);
      const reviewIds = [];

      for (let i = 0; i < reviews.length; i++) {
        const student = students[i % students.length];
        const ratingReview = await RatingAndReview.create({
          user: student._id,
          course: course._id,
          rating: reviews[i].rating,
          review: reviews[i].review
        });
        reviewIds.push(ratingReview._id);
        totalAdded++;
      }

      course.ratingAndReviews = reviewIds;
      await course.save();

      const avg = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
      console.log(`   ✅ Added ${reviews.length} reviews (Avg: ${avg}⭐)\n`);
    }

    console.log(`\n🎉 Added ${totalAdded} reviews to free courses!\n`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addReviewsToFreeCourses();
