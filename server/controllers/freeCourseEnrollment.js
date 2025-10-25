const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");

// Enroll in a free course
exports.enrollFreeCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Course ID and User ID are required",
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

    // Check if course is free
    if (course.price > 0) {
      return res.status(400).json({
        success: false,
        message: "This course is not free. Please use the payment flow.",
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is already enrolled (robust string/ObjectId-safe check)
    const alreadyEnrolled = user.courses?.some((id) => id.toString() === courseId.toString());
    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    // Enroll the student
    const enrolledCourse = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { studentsEnrolled: userId } },
      { new: true }
    );

    // Create course progress if not exists (idempotent)
    let courseProgress = await CourseProgress.findOne({ userId, courseId });
    if (!courseProgress) {
      courseProgress = await CourseProgress.create({
        userId: userId,
        courseId: courseId,
      });
    }

    // Update user's courses
    const enrolledStudent = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          courses: courseId,
          courseProgress: courseProgress._id,
        },
      },
      { new: true }
    );

    // Send enrollment email
    try {
      await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${course.name}`,
        courseEnrollmentEmail(course.name, `${enrolledStudent.firstName}`)
      );
    } catch (emailError) {
      console.log("Error sending enrollment email:", emailError);
      // Don't fail the enrollment if email fails
    }

    return res.status(200).json({
      success: true,
      message: "Successfully enrolled in free course",
      course: enrolledCourse,
    });
  } catch (error) {
    console.error("Error enrolling in free course:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to enroll in course",
      error: error.message,
    });
  }
};
