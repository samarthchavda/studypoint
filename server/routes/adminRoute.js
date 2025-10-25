const express = require("express");
const router = express.Router();

// Import controllers
const {
  getAllUsers,
  getAllContacts,
  getAllDemoBookings,
  getStats,
  deleteUser,
  deleteContact,
  deleteDemoBooking,
} = require("../controllers/adminCon");

// Import middleware
const { auth, isAdmin } = require("../middlewares/auth");

// Admin routes - protected with auth and isAdmin middleware
router.get("/getAllUsers", auth, isAdmin, getAllUsers);
router.get("/getAllContacts", auth, isAdmin, getAllContacts);
router.get("/getAllDemoBookings", auth, isAdmin, getAllDemoBookings);
router.delete("/deleteUser", auth, isAdmin, deleteUser);
router.delete("/deleteContact", auth, isAdmin, deleteContact);
router.delete("/deleteDemoBooking", auth, isAdmin, deleteDemoBooking);
router.get("/getStats", auth, isAdmin, getStats);

module.exports = router;