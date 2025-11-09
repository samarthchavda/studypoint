const mongoose = require("mongoose");
const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ DB Connected Successfully"))
  .catch((error) => {
    console.log("❌ DB Connection Failed");
    console.error(error);
    process.exit(1);
  });

async function createTestCourse() {
  try {
    // Find instructor
    const instructor = await User.findOne({ email: "instructor@studynotion.com" });
    if (!instructor) {
      console.log("❌ Instructor not found");
      return;
    }
    console.log("✅ Found instructor:", instructor.email);

    // Find IoT category
    const category = await Category.findOne({ name: { $regex: /iot/i } });
    if (!category) {
      console.log("❌ IoT category not found");
      console.log("Available categories:");
      const allCategories = await Category.find({});
      allCategories.forEach(cat => console.log(`  - ${cat.name}`));
      return;
    }
    console.log("✅ Found category:", category.name);

    // Create course
    const newCourse = await Course.create({
      courseName: "Introduction to IoT",
      courseDescription: "Learn the basics of Internet of Things technology and its applications",
      instructor: instructor._id,
      whatYouWillLearn: "Understand IoT fundamentals, sensors, connectivity, and real-world applications",
      price: 999,
      tag: ["IoT", "Technology"],
      category: category._id,
      thumbnail: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      status: "published",
      instructions: [
        "Basic knowledge of programming is helpful",
        "No prior IoT experience required",
        "Have a computer with internet connection"
      ],
    });

    console.log("✅ Course created successfully!");
    console.log("Course ID:", newCourse._id);
    console.log("Course Name:", newCourse.courseName);

    // Add course to instructor's courses
    await User.findByIdAndUpdate(instructor._id, {
      $push: { courses: newCourse._id },
    });
    console.log("✅ Course added to instructor");

    // Add course to category
    await Category.findByIdAndUpdate(category._id, {
      $push: { courses: newCourse._id },
    });
    console.log("✅ Course added to category");

    console.log("\n🎉 Test course created successfully!");
    
  } catch (error) {
    console.error("❌ Error creating course:", error);
  } finally {
    mongoose.connection.close();
  }
}

createTestCourse();
