const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const EMAIL = process.argv[2] || 'sanjay123@gmail.com';

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB');

    const user = await User.findOne({ email: EMAIL });
    if (!user) {
      console.log('❌ User not found:', EMAIL);
      return;
    }
    console.log('👤 User:', user.firstName, user.lastName, `(${user.email})`);

    // 1) Deduplicate user.courses
    const beforeCourses = user.courses.map(id => id.toString());
    const uniqueCourses = Array.from(new Set(beforeCourses)).map(id => new mongoose.Types.ObjectId(id));
    const removedFromUser = beforeCourses.length - uniqueCourses.length;
    user.courses = uniqueCourses;
    await user.save();
    console.log(`🧹 user.courses: removed ${removedFromUser} duplicate(s)`);

    // 2) Ensure each Course.studentsEnrolled contains the user only once
    let removedFromCourses = 0;
    for (const courseId of uniqueCourses) {
      const course = await Course.findById(courseId);
      if (!course) continue;
      const list = course.studentsEnrolled.map(id => id.toString());
      const filtered = list.filter((id, idx) => id !== user._id.toString() || list.indexOf(id) === idx);
      const diff = list.length - filtered.length;
      if (diff > 0) {
        removedFromCourses += diff;
        course.studentsEnrolled = filtered.map(id => new mongoose.Types.ObjectId(id));
        await course.save();
        console.log(`   • Fixed duplicates in course: ${course.name} (removed ${diff})`);
      }
    }

    // 3) Collapse duplicate CourseProgress entries per (userId, courseId)
    const progresses = await CourseProgress.find({ userId: user._id });
    const byCourse = new Map();
    for (const cp of progresses) {
      const key = cp.courseId.toString();
      if (!byCourse.has(key)) byCourse.set(key, []);
      byCourse.get(key).push(cp);
    }
    let removedProgress = 0;
    for (const [courseId, items] of byCourse.entries()) {
      if (items.length > 1) {
        // Keep the one with the largest completedVideos length
        items.sort((a, b) => (b.completedVideos?.length || 0) - (a.completedVideos?.length || 0));
        const keep = items[0];
        const remove = items.slice(1);
        const ids = remove.map(r => r._id);
        await CourseProgress.deleteMany({ _id: { $in: ids } });
        removedProgress += remove.length;
        console.log(`   • Collapsed ${remove.length} duplicate CourseProgress for course ${courseId}, kept ${keep._id}`);
      }
    }

    console.log('\n✅ Deduplication Summary');
    console.log('   - Removed from user.courses:', removedFromUser);
    console.log('   - Removed from courses.studentsEnrolled:', removedFromCourses);
    console.log('   - Removed duplicate CourseProgress:', removedProgress);
  } catch (e) {
    console.error('❌ Error:', e);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Disconnected');
  }
}

run();
