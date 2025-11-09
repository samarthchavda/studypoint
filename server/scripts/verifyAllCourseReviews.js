const mongoose = require('mongoose');
const Course = require('../models/Course');
const RatingAndReview = require('../models/RatingAndReview');
const Category = require('../models/Category');
require('dotenv').config();

async function verifyAllCourseReviews() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    const categories = await Category.find().populate({
      path: 'courses',
      populate: {
        path: 'ratingAndReviews'
      }
    });

    console.log('📊 Course Review Summary by Category:\n');
    console.log('='.repeat(70));

    let totalCourses = 0;
    let coursesWithReviews = 0;
    let coursesWithoutReviews = 0;

    for (const category of categories) {
      console.log(`\n📁 ${category.name} (${category.courses.length} courses)`);
      console.log('-'.repeat(70));

      if (category.courses.length === 0) {
        console.log('   (No courses in this category)');
        continue;
      }

      for (const course of category.courses) {
        totalCourses++;
        const reviewCount = course.ratingAndReviews?.length || 0;
        
        if (reviewCount > 0) {
          coursesWithReviews++;
          const reviews = await RatingAndReview.find({ course: course._id });
          const avgRating = reviews.length > 0 
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : '0.0';
          console.log(`   ✅ ${course.courseName}: ${reviewCount} reviews (${avgRating}⭐)`);
        } else {
          coursesWithoutReviews++;
          console.log(`   ❌ ${course.courseName}: 0 reviews`);
        }
      }
    }

    console.log('\n' + '='.repeat(70));
    console.log(`\n📈 Overall Summary:`);
    console.log(`   Total Courses: ${totalCourses}`);
    console.log(`   Courses with Reviews: ${coursesWithReviews} ✅`);
    console.log(`   Courses without Reviews: ${coursesWithoutReviews} ❌`);
    console.log(`   Coverage: ${((coursesWithReviews/totalCourses)*100).toFixed(1)}%\n`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

verifyAllCourseReviews();
