const express = require("express");
const router = express.Router();

// Import course controllers
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/courseCon");

// Import category controllers
const {
  showAllCategories,
  createCategory,
  getCategoryPageDetails,
} = require("../controllers/categoryCon");

// Import section controllers
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/sectionCon");

// Import subsection controllers
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/subSection");

// Import rating and review controllers
const {
  createRating,
  getAverageRating,
  getAllRating,
  getReviews,
} = require("../controllers/ratingAndReview");

// Import course progress controller
const { updateCourseProgress } = require("../controllers/courseProgress");

// Import auth middleware
const { auth, isInstructor, isStudent, isAdmin, optionalAuth } = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
// Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Get Full Details for a Specific Course (supports both authenticated and non-authenticated)
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.get("/getFullCourseDetails/:courseId", optionalAuth, getFullCourseDetails); // Public route for preview with optional auth
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse);
// Delete a Course
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", getCategoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getReviews);

module.exports = router;