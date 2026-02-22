const mongoose = require("mongoose");
require("dotenv").config();

let isConnected = false;

exports.conncetToDatabase = async () => {
  const mongoURI = process.env.MONGODB_URL;
  
  if (!mongoURI) {
    console.error("❌ MongoDB URI is not defined!");
    throw new Error("MongoDB URI is required");
  }

  // If already connected, return
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log("✅ Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
      tls: true,
      tlsAllowInvalidCertificates: false,
    });
    
    isConnected = true;
    console.log("✅ Database connected successfully");
    console.log(`📊 Connected to: ${mongoURI.split('@')[1] || 'MongoDB'}`);
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error(error.message);
    isConnected = false;
    throw error;
  }

  // Handle connection events
  mongoose.connection.on('connected', () => {
    console.log('✅ Mongoose connected to DB');
    isConnected = true;
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err.message);
    isConnected = false;
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ Mongoose disconnected from DB');
    isConnected = false;
  });
};

// Export connection status checker
exports.ensureConnection = async () => {
  if (!isConnected || mongoose.connection.readyState !== 1) {
    await exports.conncetToDatabase();
  }
};
