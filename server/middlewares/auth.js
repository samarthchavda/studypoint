const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Optional Authentication middleware (doesn't fail if no token)
exports.optionalAuth = async (req, res, next) => {
  try {
    // Extract token from request
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    // If token exists, verify it
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      } catch (error) {
        // Token is invalid, but we don't fail - just continue without user
        console.log("Invalid token in optional auth, continuing without user");
      }
    }

    next();
  } catch (error) {
    // Don't fail, just continue without user
    next();
  }
};

// Authentication middleware
exports.auth = async (req, res, next) => {
  try {
    // Extract token from request
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("token", token);

    // If token is missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded token", decoded);
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

// Student middleware
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(403).json({
        success: false,
        message: "This is a protected route for students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

// Instructor middleware
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.role !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "This is a protected route for instructors only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

// Admin middleware
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "This is a protected route for admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};