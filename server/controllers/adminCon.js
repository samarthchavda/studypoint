const User = require("../models/User");
const ContactForm = require("../models/ContactForm");
const DemoBooking = require("../models/DemoBooking");
const Course = require("../models/Course");
const Category = require("../models/Category");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("additionalDetails")
      .populate("courses")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactForm.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Contacts fetched successfully",
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
      error: error.message,
    });
  }
};

// Get all demo bookings
exports.getAllDemoBookings = async (req, res) => {
  try {
    const demoBookings = await DemoBooking.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Demo bookings fetched successfully",
      data: demoBookings,
    });
  } catch (error) {
    console.error("Error fetching demo bookings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch demo bookings",
      error: error.message,
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent deleting admin users
    if (user.accountType === "Admin") {
      return res.status(403).json({
        success: false,
        message: "Cannot delete admin users",
      });
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const { contactId } = req.body;

    if (!contactId) {
      return res.status(400).json({
        success: false,
        message: "Contact ID is required",
      });
    }

    const contact = await ContactForm.findByIdAndDelete(contactId);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete contact",
      error: error.message,
    });
  }
};

// Delete demo booking
exports.deleteDemoBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const booking = await DemoBooking.findByIdAndDelete(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Demo booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Demo booking deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting demo booking:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete demo booking",
      error: error.message,
    });
  }
};

// Get admin statistics
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalInstructors = await User.countDocuments({ accountType: "Instructor" });
    const totalStudents = await User.countDocuments({ accountType: "Student" });
    const totalCourses = await Course.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalContacts = await ContactForm.countDocuments();
    const totalDemoBookings = await DemoBooking.countDocuments();

    // Get category-wise courses
    const categoryWiseCourses = await Course.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $group: {
          _id: "$category",
          name: { $first: "$categoryDetails.name" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$name",
          count: 1,
        },
      },
    ]);

    // Get most selling courses (based on studentsEnrolled count)
    const mostSellingCourses = await Course.find()
      .select("name thumbnail price studentsEnrolled")
      .populate("instructor", "firstName lastName")
      .sort({ studentsEnrolled: -1 })
      .limit(5);

    // Get top instructors (based on number of students enrolled in their courses)
    const topInstructors = await Course.aggregate([
      {
        $group: {
          _id: "$instructor",
          totalStudents: { $sum: { $size: "$studentsEnrolled" } },
          totalCourses: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "instructorDetails",
        },
      },
      {
        $unwind: "$instructorDetails",
      },
      {
        $project: {
          _id: 0,
          instructorId: "$_id",
          name: {
            $concat: [
              "$instructorDetails.firstName",
              " ",
              "$instructorDetails.lastName",
            ],
          },
          email: "$instructorDetails.email",
          totalStudents: 1,
          totalCourses: 1,
        },
      },
      {
        $sort: { totalStudents: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Statistics fetched successfully",
      data: {
        stats: [{
          totalUsers,
          totalInstructors,
          totalStudents,
          totalCourses,
          totalCategories,
          totalContacts,
          totalDemoBookings,
        }],
        categoryWiseCourses,
        mostSellingCourses,
        topInstructors: [topInstructors],
      },
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
};

// Get all courses with detailed information
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "firstName lastName email image")
      .populate("category", "name")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

// Delete course (admin only)
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Remove course from enrolled students
    if (course.studentsEnrolled && course.studentsEnrolled.length > 0) {
      await User.updateMany(
        { _id: { $in: course.studentsEnrolled } },
        { $pull: { courses: courseId } }
      );
    }

    // Remove course from instructor
    await User.findByIdAndUpdate(
      course.instructor,
      { $pull: { courses: courseId } }
    );

    // Remove course from category
    await Category.findByIdAndUpdate(
      course.category,
      { $pull: { courses: courseId } }
    );

    // Delete all sections and subsections
    const Section = require("../models/Section");
    const SubSection = require("../models/SubSection");
    
    if (course.courseContent && course.courseContent.length > 0) {
      for (const sectionId of course.courseContent) {
        const section = await Section.findById(sectionId);
        if (section && section.subSection && section.subSection.length > 0) {
          await SubSection.deleteMany({ _id: { $in: section.subSection } });
        }
        await Section.findByIdAndDelete(sectionId);
      }
    }

    // Delete all ratings and reviews
    const RatingAndReview = require("../models/RatingAndReview");
    if (course.ratingAndReviews && course.ratingAndReviews.length > 0) {
      await RatingAndReview.deleteMany({ _id: { $in: course.ratingAndReviews } });
    }

    // Finally delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    });
  }
};


