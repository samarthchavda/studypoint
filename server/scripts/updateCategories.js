require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Course = require('../models/Course');

const top5Categories = [
  {
    name: "Web Development",
    description: "Learn to build modern websites and web applications using HTML, CSS, JavaScript, React, Node.js and more",
  },
  {
    name: "Data Science",
    description: "Explore data analysis, machine learning, AI, and big data technologies",
  },
  {
    name: "Mobile Development",
    description: "Master mobile app development with Android, iOS, React Native, and Flutter",
  },
  {
    name: "Programming Languages",
    description: "Learn programming fundamentals with Python, Java, C++, JavaScript and other languages",
  },
  {
    name: "UI/UX Design",
    description: "Master user interface and user experience design with Figma, Adobe XD, and design principles",
  },
];

const updateCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    // Get all existing categories
    const existingCategories = await Category.find();
    console.log(`📊 Found ${existingCategories.length} existing categories\n`);

    // Find categories to keep (top 5)
    const categoriesToKeep = [];
    const top5Names = top5Categories.map(c => c.name);
    
    for (const cat of existingCategories) {
      if (top5Names.includes(cat.name)) {
        categoriesToKeep.push(cat);
      }
    }

    console.log(`✅ Keeping ${categoriesToKeep.length} popular categories:`);
    categoriesToKeep.forEach(cat => console.log(`   - ${cat.name}`));
    console.log();

    // Find categories to remove
    const categoriesToRemove = existingCategories.filter(
      cat => !top5Names.includes(cat.name)
    );

    if (categoriesToRemove.length > 0) {
      console.log(`🗑️  Removing ${categoriesToRemove.length} categories:`);
      
      for (const cat of categoriesToRemove) {
        // Check if any courses use this category
        const coursesWithCategory = await Course.countDocuments({ category: cat._id });
        
        if (coursesWithCategory > 0) {
          console.log(`   ⚠️  ${cat.name} - Has ${coursesWithCategory} course(s), setting to null in courses`);
          // Update courses to have null category instead of deleting
          await Course.updateMany({ category: cat._id }, { $set: { category: null } });
        } else {
          console.log(`   ✓ ${cat.name} - No courses, safe to delete`);
        }
        
        // Delete the category
        await Category.findByIdAndDelete(cat._id);
      }
      console.log();
    }

    // Add missing categories from top 5
    const missingCategories = top5Categories.filter(
      topCat => !categoriesToKeep.find(cat => cat.name === topCat.name)
    );

    if (missingCategories.length > 0) {
      console.log(`➕ Adding ${missingCategories.length} missing categories:`);
      for (const cat of missingCategories) {
        await Category.create(cat);
        console.log(`   ✓ ${cat.name}`);
      }
      console.log();
    }

    // Final count
    const finalCount = await Category.countDocuments();
    console.log('='.repeat(60));
    console.log(`✅ Update complete! Total categories: ${finalCount}`);
    console.log('='.repeat(60));
    console.log('\n📋 Current categories:');
    
    const allCategories = await Category.find();
    allCategories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name}`);
    });

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

updateCategories();
