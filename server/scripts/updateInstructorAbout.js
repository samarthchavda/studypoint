const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Profile = require('../models/Profile');

async function updateInstructorAbout() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database\n');
    
    // Find the instructor
    const instructor = await User.findOne({ email: 'amanjagatiya43@gmail.com' });
    
    if (!instructor) {
      console.log('❌ Instructor not found');
      process.exit(1);
    }
    
    console.log('Found instructor:', instructor.firstName, instructor.lastName);
    console.log('Profile ID:', instructor.additionalDetails);
    
    // Update or create the profile with about section
    const profile = await Profile.findByIdAndUpdate(
      instructor.additionalDetails,
      {
        about: 'Experienced instructor with 10+ years in the industry. Passionate about teaching and helping students achieve their learning goals. Specialized in creating engaging and practical course content that prepares students for real-world challenges.'
      },
      { new: true, upsert: true }
    );
    
    console.log('\n✅ Updated instructor about section');
    console.log('About:', profile.about);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateInstructorAbout();
