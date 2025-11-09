const mongoose = require("mongoose");
require("dotenv").config();

exports.conncetToDatabase = () => {
  const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URL;
  
  if (!mongoURI) {
    console.error("❌ MongoDB URI is not defined in .env file!");
    console.log("Please add MONGO_URI or MONGODB_URL to your .env file");
    process.exit(1);
  }

  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("✅ Database connected successfully");
      console.log(`📊 Connected to: ${mongoURI.split('@')[1] || 'MongoDB'}`);
    })
    .catch((error) => {
      console.error("❌ Database connection failed");
      console.error(error);
      console.log("\n💡 Tips:");
      console.log("1. Check if MongoDB is running");
      console.log("2. Verify MONGO_URI in .env file");
      console.log("3. Check network connection\n");
      // Don't exit immediately, let server handle it
      setTimeout(() => process.exit(1), 2000);
    });

  // Handle connection events
  mongoose.connection.on('connected', () => {
    console.log('✅ Mongoose connected to DB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ Mongoose disconnected from DB');
  });
};
