const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('../models/User');
const Profile = require('../models/Profile');
const Course = require('../models/Course');
const RatingAndReview = require('../models/RatingAndReview');

const demoStudents = [
  {
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@demo.com",
    password: "Demo@123"
  },
  {
    firstName: "Rahul",
    lastName: "Verma",
    email: "rahul.verma@demo.com",
    password: "Demo@123"
  },
  {
    firstName: "Sneha",
    lastName: "Patel",
    email: "sneha.patel@demo.com",
    password: "Demo@123"
  },
  {
    firstName: "Amit",
    lastName: "Kumar",
    email: "amit.kumar@demo.com",
    password: "Demo@123"
  },
  {
    firstName: "Neha",
    lastName: "Singh",
    email: "neha.singh@demo.com",
    password: "Demo@123"
  }
];

const reviewTemplates = [
  {
    rating: 5,
    review: "Excellent course! The content is well-structured and easy to follow. The instructor explains complex concepts in a simple way. Highly recommended for beginners!"
  },
  {
    rating: 5,
    review: "This course exceeded my expectations. The hands-on projects really helped me understand the concepts better. Great value for money!"
  },
  {
    rating: 4,
    review: "Very informative and detailed course. The instructor is knowledgeable and explains everything clearly. Would love to see more advanced topics covered."
  },
  {
    rating: 5,
    review: "Best investment I've made in my learning journey! The course content is comprehensive and the support from the instructor is amazing. Thank you!"
  },
  {
    rating: 4,
    review: "Great course with practical examples. The pacing is perfect for beginners. Looking forward to applying these skills in real projects."
  }
];

async function addDemoReviews() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('Connected to database\n');

    // Create demo student accounts
    const createdStudents = [];
    console.log('=== Creating Demo Students ===');
    
    for (const student of demoStudents) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: student.email });
      
      if (existingUser) {
        console.log(`Student ${student.email} already exists`);
        createdStudents.push(existingUser);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(student.password, 10);

      // Create profile
      const profile = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: `Passionate learner interested in technology and self-improvement.`,
        contactNumber: null
      });

      // Create user
      const user = await User.create({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        password: hashedPassword,
        accountType: 'Student',
        additionalDetails: profile._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${student.firstName} ${student.lastName}`,
        active: true,
        approved: true
      });

      createdStudents.push(user);
      console.log(`✅ Created student: ${student.firstName} ${student.lastName} (${student.email})`);
    }

    console.log(`\n✅ Total ${createdStudents.length} students ready\n`);

    // Get all courses
    const courses = await Course.find({});
    console.log(`=== Adding Reviews to ${courses.length} Courses ===\n`);

    let totalReviewsAdded = 0;

    for (const course of courses) {
      console.log(`Adding reviews to: ${course.name}`);
      
      // Add 3-4 random reviews per course
      const numReviews = Math.floor(Math.random() * 2) + 3; // 3 or 4 reviews
      const selectedStudents = [...createdStudents].sort(() => 0.5 - Math.random()).slice(0, numReviews);
      const selectedReviews = [...reviewTemplates].sort(() => 0.5 - Math.random()).slice(0, numReviews);

      for (let i = 0; i < numReviews; i++) {
        const student = selectedStudents[i];
        const reviewData = selectedReviews[i];

        // Check if review already exists
        const existingReview = await RatingAndReview.findOne({
          user: student._id,
          course: course._id
        });

        if (existingReview) {
          console.log(`  - Review by ${student.firstName} ${student.lastName} already exists`);
          continue;
        }

        // Create review
        const review = await RatingAndReview.create({
          user: student._id,
          rating: reviewData.rating,
          review: reviewData.review,
          course: course._id
        });

        // Add review to course
        await Course.findByIdAndUpdate(
          course._id,
          { $push: { ratingAndReviews: review._id } }
        );

        console.log(`  ✅ Added ${reviewData.rating}⭐ review by ${student.firstName} ${student.lastName}`);
        totalReviewsAdded++;
      }
    }

    console.log(`\n✅ Successfully added ${totalReviewsAdded} reviews!`);
    console.log('\n=== Demo Account Credentials ===');
    console.log('Email: <any-student-email-above>');
    console.log('Password: Demo@123\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addDemoReviews();
