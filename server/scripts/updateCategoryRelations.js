const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');
const Category = require('../models/Category');

async function updateCategoryRelations() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('Connected to database');
    
    // Get all courses
    const courses = await Course.find({});
    console.log(`Found ${courses.length} courses`);
    
    // Group courses by category
    const coursesByCategory = {};
    courses.forEach(course => {
      const catId = course.category.toString();
      if (!coursesByCategory[catId]) coursesByCategory[catId] = [];
      coursesByCategory[catId].push(course._id);
    });
    
    // Update each category
    for (const [categoryId, courseIds] of Object.entries(coursesByCategory)) {
      const category = await Category.findByIdAndUpdate(
        categoryId,
        { $set: { courses: courseIds } },
        { new: true }
      );
      console.log(`✅ Updated category "${category.name}" with ${courseIds.length} courses`);
    }
    
    console.log('\n✅ All categories updated successfully!');
    
    // Verify the update
    console.log('\n=== VERIFICATION ===');
    const categories = await Category.find({});
    for (const cat of categories) {
      console.log(`${cat.name}: ${cat.courses?.length || 0} courses`);
    }
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateCategoryRelations();
