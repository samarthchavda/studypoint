const mongoose = require('mongoose');
const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const ContactForm = require('../models/ContactForm');
const DemoBooking = require('../models/DemoBooking');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB\n');

    console.log('🔍 Testing Admin Stats API Response...\n');

    const totalUsers = await User.countDocuments();
    const totalInstructors = await User.countDocuments({ accountType: "Instructor" });
    const totalStudents = await User.countDocuments({ accountType: "Student" });
    const totalCourses = await Course.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalContacts = await ContactForm.countDocuments();
    const totalDemoBookings = await DemoBooking.countDocuments();

    console.log('📊 Stats that backend will return:');
    console.log(JSON.stringify({
      totalUsers,
      totalInstructors,
      totalStudents,
      totalCourses,
      totalCategories,
      totalContacts,
      totalDemoBookings,
    }, null, 2));

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

    console.log('\n📁 Category-wise courses:', categoryWiseCourses.length, 'categories');

    // Get most selling courses
    const mostSellingCourses = await Course.find()
      .select("name thumbnail price studentsEnrolled")
      .populate("instructor", "firstName lastName")
      .sort({ studentsEnrolled: -1 })
      .limit(5);

    console.log('\n🔥 Top selling courses:', mostSellingCourses.length, 'courses');

    // Get top instructors
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

    console.log('\n👨‍🏫 Top instructors:', topInstructors.length, 'instructors');

    console.log('\n✅ Complete API Response Structure:');
    console.log(JSON.stringify({
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
        mostSellingCourses: mostSellingCourses.map(c => ({
          name: c.name,
          studentsCount: c.studentsEnrolled?.length || 0
        })),
        topInstructors: [topInstructors],
      },
    }, null, 2));

  } catch (e) {
    console.error('❌ Error:', e);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Disconnected');
  }
}

run();
