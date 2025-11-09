const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

async function checkCategories() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    const categories = await Category.find();
    console.log('📁 Available Categories:\n');
    
    categories.forEach(cat => {
      const urlFormat = cat.name.replace(/ /g, '-');
      console.log(`   - ${cat.name}`);
      console.log(`     URL: /catalog/${urlFormat}\n`);
    });

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkCategories();
