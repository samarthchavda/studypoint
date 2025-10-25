const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('../models/User');
const Profile = require('../models/Profile');
const Course = require('../models/Course');
const Category = require('../models/Category');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');

async function createAICategoryAndCourses() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database\n');
    
    // Step 1: Create AI Category
    console.log('📁 Creating AI category...');
    let aiCategory = await Category.findOne({ name: 'Artificial Intelligence' });
    
    if (!aiCategory) {
      aiCategory = await Category.create({
        name: 'Artificial Intelligence',
        description: 'Explore the cutting-edge world of Artificial Intelligence, Machine Learning, Deep Learning, and AI applications.'
      });
      console.log('✅ Created AI category\n');
    } else {
      console.log('⚠️  AI category already exists\n');
    }
    
    // Step 2: Create AI Instructor
    console.log('👤 Creating AI instructor...');
    let aiInstructor = await User.findOne({ email: 'dr.arjun.mehta@studynotion.com' });
    
    if (!aiInstructor) {
      const hashedPassword = await bcrypt.hash('Instructor@123', 10);
      
      const profile = await Profile.create({
        gender: 'Male',
        dateOfBirth: null,
        about: 'Dr. Arjun Mehta is a leading AI researcher and educator with a PhD in Artificial Intelligence from MIT. With 15+ years of experience in AI research and development, he has published 50+ research papers and worked on cutting-edge AI projects at top tech companies. Passionate about making AI accessible to everyone through practical, hands-on teaching.',
        contactNumber: null
      });
      
      aiInstructor = await User.create({
        firstName: 'Dr. Arjun',
        lastName: 'Mehta',
        email: 'dr.arjun.mehta@studynotion.com',
        password: hashedPassword,
        accountType: 'Instructor',
        approved: true,
        additionalDetails: profile._id,
        image: 'https://api.dicebear.com/5.x/initials/svg?seed=Dr. Arjun Mehta',
        courses: []
      });
      
      console.log('✅ Created AI instructor: Dr. Arjun Mehta\n');
    } else {
      console.log('⚠️  AI instructor already exists\n');
    }
    
    // Step 3: Create AI Courses
    console.log('📚 Creating AI courses...\n');
    
    const aiCoursesData = [
      {
        name: 'Artificial Intelligence Fundamentals',
        description: 'Master the fundamentals of Artificial Intelligence, including search algorithms, knowledge representation, expert systems, and AI planning. Learn how AI systems think and solve complex problems.',
        whatYouWillLearn: 'Understand core AI concepts and algorithms, Implement search and optimization techniques, Build knowledge-based systems, Master problem-solving strategies in AI, Work with constraint satisfaction problems, Apply AI techniques to real-world scenarios',
        price: 4999,
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        tag: ['AI', 'Fundamentals', 'Algorithms'],
        instructions: ['Basic programming knowledge', 'Understanding of data structures', 'Mathematical background (algebra, probability)']
      },
      {
        name: 'Deep Learning & Neural Networks',
        description: 'Dive deep into neural networks and deep learning. Learn to build and train neural networks, CNNs, RNNs, and transformers. Master TensorFlow and PyTorch for creating state-of-the-art AI models.',
        whatYouWillLearn: 'Build neural networks from scratch, Master CNNs for computer vision, Implement RNNs and LSTMs for sequences, Work with Transformers and Attention mechanisms, Use TensorFlow and PyTorch frameworks, Deploy deep learning models to production',
        price: 5999,
        thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
        tag: ['Deep Learning', 'Neural Networks', 'TensorFlow'],
        instructions: ['Python programming proficiency', 'Basic machine learning knowledge', 'Understanding of calculus and linear algebra']
      }
    ];
    
    for (const courseData of aiCoursesData) {
      // Check if course already exists
      let course = await Course.findOne({ name: courseData.name });
      
      if (course) {
        console.log(`⚠️  Course "${courseData.name}" already exists, skipping\n`);
        continue;
      }
      
      // Create the course
      course = await Course.create({
        name: courseData.name,
        description: courseData.description,
        whatYouWillLearn: courseData.whatYouWillLearn,
        price: courseData.price,
        thumbnail: courseData.thumbnail,
        tag: courseData.tag,
        category: aiCategory._id,
        instructor: aiInstructor._id,
        status: 'published',
        instructions: courseData.instructions,
        studentsEnrolled: [],
        ratingAndReviews: []
      });
      
      console.log(`✅ Created course: ${courseData.name}`);
      
      // Create sections and subsections
      const sections = [
        {
          name: 'Introduction and Basics',
          subsections: [
            {
              title: 'Course Introduction',
              description: 'Overview of the course and learning objectives',
              videoUrl: 'https://www.youtube.com/embed/ad79nYk2keg',
              timeDuration: 1500
            },
            {
              title: 'Setting Up Your Environment',
              description: 'Install necessary tools and libraries',
              videoUrl: 'https://www.youtube.com/embed/i_LwzRVP7bg',
              timeDuration: 1800
            }
          ]
        },
        {
          name: 'Core Concepts',
          subsections: [
            {
              title: 'Understanding Key Principles',
              description: 'Deep dive into fundamental concepts',
              videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
              timeDuration: 2400
            },
            {
              title: 'Practical Implementation',
              description: 'Hands-on coding exercises',
              videoUrl: 'https://www.youtube.com/embed/Ilg3gGewQ5U',
              timeDuration: 2700
            }
          ]
        },
        {
          name: 'Advanced Topics',
          subsections: [
            {
              title: 'Advanced Techniques',
              description: 'Explore advanced methodologies',
              videoUrl: 'https://www.youtube.com/embed/IHZwWFHWa-w',
              timeDuration: 3000
            },
            {
              title: 'Real-World Projects',
              description: 'Build practical applications',
              videoUrl: 'https://www.youtube.com/embed/jmznx0Q1fP0',
              timeDuration: 3600
            }
          ]
        }
      ];
      
      for (const sectionData of sections) {
        const section = await Section.create({
          courseId: course._id,
          name: sectionData.name
        });
        
        const subsectionIds = [];
        for (const subData of sectionData.subsections) {
          const subsection = await SubSection.create({
            courseId: course._id,
            sectionId: section._id,
            title: subData.title,
            description: subData.description,
            videoUrl: subData.videoUrl,
            timeDuration: subData.timeDuration
          });
          subsectionIds.push(subsection._id);
        }
        
        section.subSections = subsectionIds;
        await section.save();
        
        course.courseContent.push(section._id);
      }
      
      await course.save();
      console.log(`   ✓ Added 3 sections with 6 lectures\n`);
      
      // Add course to instructor
      aiInstructor.courses.push(course._id);
      
      // Add course to category
      aiCategory.courses.push(course._id);
    }
    
    await aiInstructor.save();
    await aiCategory.save();
    
    console.log('✅ All AI courses created and assigned!');
    console.log('\n📋 Summary:');
    console.log(`Category: ${aiCategory.name} (${aiCategory.courses.length} courses)`);
    console.log(`Instructor: ${aiInstructor.firstName} ${aiInstructor.lastName}`);
    console.log(`Email: ${aiInstructor.email}`);
    console.log(`Password: Instructor@123`);
    console.log(`\nCourses created:`);
    aiCoursesData.forEach(c => console.log(`  - ${c.name}`));
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAICategoryAndCourses();
