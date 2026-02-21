const mongoose = require("mongoose");
require("dotenv").config();

exports.conncetToDatabase = () => {
  const mongoURI = process.env.MONGODB_URL;
  
  if (!mongoURI) {
    console.error("❌ MongoDB URI is not defined!");
    console.log("⚠️ Serverless function will continue without database");
    return; // Don't exit - serverless functions should handle gracefully
  }

  mongoose
    .connect(mongoURI, {
      serverSelectionTimeoutMS: 30000, // Increased timeout for better connection
      socketTimeoutMS: 45000,
      tls: true, // Enable TLS
      tlsAllowInvalidCertificates: false, // Set to true only if you have certificate issues
    })
    .then(() => {
      console.log("✅ Database connected successfully");
      console.log(`📊 Connected to: ${mongoURI.split('@')[1] || 'MongoDB'}`);
    })
    .catch((error) => {
      console.error("❌ Database connection failed");
      console.error(error.message);
      console.log("⚠️ Server will continue without database connection");
      // Don't exit - let the serverless function continue
    });

  // Handle connection events
  mongoose.connection.on('connected', () => {
    console.log('✅ Mongoose connected to DB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ Mongoose disconnected from DB');
  });
};
