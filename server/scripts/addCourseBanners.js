require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');

// Professional course banner images from Unsplash
const courseBanners = {
  "Web Development": [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&h=400&fit=crop"
  ],
  "Data Science": [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=400&fit=crop"
  ],
  "Machine Learning": [
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop"
  ],
  "Mobile App Development": [
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&h=400&fit=crop"
  ],
  "Design": [
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop"
  ],
  "Cloud Computing": [
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=800&h=400&fit=crop"
  ]
};

async function addCourseBannersAndInstructorNames() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get all courses with their category and instructor info
    const courses = await Course.find()
      .populate('category', 'name')
      .populate('instructor', 'firstName lastName');

    console.log(`📚 Found ${courses.length} courses to update\n`);

    let categoryIndex = {};

    for (const course of courses) {
      const categoryName = course.category ? course.category.name : 'Unknown';
      
      // Track which banner image to use for this category
      if (!categoryIndex[categoryName]) {
        categoryIndex[categoryName] = 0;
      }

      const banners = courseBanners[categoryName] || courseBanners["Web Development"];
      const bannerUrl = banners[categoryIndex[categoryName] % banners.length];
      categoryIndex[categoryName]++;

      // Update course with banner
      course.thumbnail = bannerUrl;

      // Add instructor name to course description if not already there
      const instructorName = course.instructor 
        ? `${course.instructor.firstName} ${course.instructor.lastName}`
        : 'Expert Instructor';

      // Check if instructor name is already in description
      if (!course.courseDescription.includes('Instructor:')) {
        course.courseDescription = `Taught by ${instructorName}. ${course.courseDescription}`;
      }

      await course.save();

      console.log(`✅ Updated: ${course.courseName}`);
      console.log(`   Category: ${categoryName}`);
      console.log(`   Instructor: ${instructorName}`);
      console.log(`   Banner: ${bannerUrl}`);
      console.log('');
    }

    console.log(`\n✅ Successfully updated ${courses.length} courses with banners and instructor names!`);

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addCourseBannersAndInstructorNames();
