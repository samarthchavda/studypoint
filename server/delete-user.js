require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Profile = require('./models/Profile');

async function deleteUser() {
  try {
    console.log('\n🗑️  Deleting User...\n');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB\n');
    
    // Email to delete (add @gmail.com if not included)
    const emailToDelete = 'samarthkumar.chavda@gmail.com';
    
    // Find the user
    const user = await User.findOne({ email: emailToDelete });
    
    if (!user) {
      console.log(`❌ User not found: ${emailToDelete}`);
      console.log('\nTrying without @gmail.com...');
      
      // Try different variations
      const altEmail = emailToDelete.includes('@') ? emailToDelete : emailToDelete + '@gmail.com';
      const userAlt = await User.findOne({ email: altEmail });
      
      if (!userAlt) {
        console.log('❌ User not found with any variation');
        
        // Show all users
        const allUsers = await User.find({}).select('email firstName lastName');
        console.log('\n📋 All users in database:');
        allUsers.forEach(u => {
          console.log(`  - ${u.email} (${u.firstName} ${u.lastName})`);
        });
        
        await mongoose.connection.close();
        process.exit(0);
      }
      
      // Delete the profile
      if (userAlt.additionalDetails) {
        await Profile.findByIdAndDelete(userAlt.additionalDetails);
        console.log('✅ Deleted user profile');
      }
      
      // Delete the user
      await User.findByIdAndDelete(userAlt._id);
      console.log(`✅ Deleted user: ${userAlt.email}`);
      
      await mongoose.connection.close();
      process.exit(0);
    }
    
    console.log(`Found user: ${user.email}`);
    console.log(`  Name: ${user.firstName} ${user.lastName}`);
    console.log(`  Account Type: ${user.accountType}`);
    
    // Delete the profile
    if (user.additionalDetails) {
      await Profile.findByIdAndDelete(user.additionalDetails);
      console.log('✅ Deleted user profile');
    }
    
    // Delete the user
    await User.findByIdAndDelete(user._id);
    console.log(`✅ Deleted user: ${user.email}`);
    
    console.log('\n✨ User deleted successfully!');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    process.exit(1);
  }
}

deleteUser();
