const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    
    const health = {
      server: 'OK',
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV || 'not set',
        hasMONGODB_URL: !!process.env.MONGODB_URL,
        hasMAIL_HOST: !!process.env.MAIL_HOST,
        hasMAIL_USER: !!process.env.MAIL_USER,
        hasMAIL_PASS: !!process.env.MAIL_PASS,
        MAIL_HOST: process.env.MAIL_HOST,
        MAIL_USER: process.env.MAIL_USER ? 'set (hidden)' : 'NOT SET'
      },
      database: {
        connected: mongoose.connection.readyState === 1,
        state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
      }
    };

    return res.status(200).json({
      success: true,
      health
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;
