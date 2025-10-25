require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Course = require('../models/Course');
const User = require('../models/User');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');

const sampleCourses = {
  "Web Development": [
    {
      name: "Complete Web Development Bootcamp",
      description: "Master HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and become a full-stack developer.",
      whatYouWillLearn: "Build responsive websites, Create full-stack applications, Master modern frameworks, Deploy to production",
      price: 2999,
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      status: "published",
      instructions: ["Basic computer knowledge", "Internet connection", "Willingness to learn"],
      sections: [
        {
          sectionName: "HTML Fundamentals",
          subsections: [
            { title: "Introduction to HTML", description: "Learn HTML basics and structure", timeDuration: "30" },
            { title: "HTML Forms and Tables", description: "Master forms and tables", timeDuration: "45" }
          ]
        },
        {
          sectionName: "CSS Styling",
          subsections: [
            { title: "CSS Basics", description: "Learn CSS fundamentals", timeDuration: "40" },
            { title: "Flexbox and Grid", description: "Modern layout techniques", timeDuration: "50" }
          ]
        }
      ]
    },
    {
      name: "React JS - The Complete Guide",
      description: "Learn React from scratch. Hooks, Context API, Redux, and build amazing single-page applications.",
      whatYouWillLearn: "Master React fundamentals, Build dynamic UIs, Manage state efficiently, Create production-ready apps",
      price: 2499,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      status: "published",
      instructions: ["JavaScript knowledge required", "HTML & CSS basics", "Code editor installed"],
      sections: [
        {
          sectionName: "React Basics",
          subsections: [
            { title: "What is React?", description: "Introduction to React", timeDuration: "25" },
            { title: "Components and Props", description: "Understanding React components", timeDuration: "35" }
          ]
        }
      ]
    }
  ],
  "Data Science": [
    {
      name: "Data Science Masterclass",
      description: "Complete data science course covering Python, Pandas, NumPy, Machine Learning, and real-world projects.",
      whatYouWillLearn: "Python for data analysis, Machine learning algorithms, Data visualization, Statistical analysis",
      price: 3499,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      status: "published",
      instructions: ["Basic math knowledge", "Computer with 8GB RAM", "Python installation"],
      sections: [
        {
          sectionName: "Python for Data Science",
          subsections: [
            { title: "Python Basics", description: "Learn Python programming", timeDuration: "60" },
            { title: "Pandas Library", description: "Data manipulation with Pandas", timeDuration: "55" }
          ]
        }
      ]
    },
    {
      name: "Machine Learning A-Z",
      description: "Master machine learning algorithms, deep learning, and AI. Build real ML models from scratch.",
      whatYouWillLearn: "ML algorithms, Neural networks, Model deployment, Real-world applications",
      price: 3999,
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
      status: "published",
      instructions: ["Python programming", "Basic statistics", "Linear algebra basics"],
      sections: [
        {
          sectionName: "Machine Learning Fundamentals",
          subsections: [
            { title: "What is ML?", description: "Introduction to machine learning", timeDuration: "30" },
            { title: "Linear Regression", description: "First ML algorithm", timeDuration: "45" }
          ]
        }
      ]
    }
  ],
  "Mobile Development": [
    {
      name: "Flutter & Dart - Complete Guide",
      description: "Build beautiful native mobile apps for iOS and Android using Flutter and Dart programming language.",
      whatYouWillLearn: "Flutter widgets, State management, API integration, App deployment",
      price: 2799,
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
      status: "published",
      instructions: ["Basic programming knowledge", "Android Studio or VS Code", "Mobile device or emulator"],
      sections: [
        {
          sectionName: "Flutter Basics",
          subsections: [
            { title: "Introduction to Flutter", description: "Getting started with Flutter", timeDuration: "35" },
            { title: "Flutter Widgets", description: "Understanding widgets", timeDuration: "40" }
          ]
        }
      ]
    },
    {
      name: "React Native - Build Mobile Apps",
      description: "Create cross-platform mobile applications using React Native. One codebase for iOS and Android.",
      whatYouWillLearn: "React Native basics, Navigation, Native modules, Publishing apps",
      price: 2599,
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
      status: "published",
      instructions: ["JavaScript knowledge", "React basics recommended", "Node.js installed"],
      sections: [
        {
          sectionName: "React Native Fundamentals",
          subsections: [
            { title: "Setup and Installation", description: "Getting started", timeDuration: "30" },
            { title: "Core Components", description: "Building blocks of RN", timeDuration: "40" }
          ]
        }
      ]
    }
  ],
  "Programming Languages": [
    {
      name: "Python Programming Masterclass",
      description: "Complete Python course from basics to advanced. Learn OOP, data structures, algorithms, and build projects.",
      whatYouWillLearn: "Python fundamentals, OOP concepts, Data structures, Algorithm design",
      price: 1999,
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
      status: "published",
      instructions: ["No programming experience needed", "Computer with any OS", "Enthusiasm to learn"],
      sections: [
        {
          sectionName: "Python Basics",
          subsections: [
            { title: "Introduction to Python", description: "Your first Python program", timeDuration: "25" },
            { title: "Variables and Data Types", description: "Understanding Python data types", timeDuration: "35" }
          ]
        }
      ]
    },
    {
      name: "Java Programming Complete Course",
      description: "Master Java programming language. From basics to advanced topics including Spring Boot.",
      whatYouWillLearn: "Java fundamentals, OOP in Java, Collections framework, Spring Boot basics",
      price: 2299,
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
      status: "published",
      instructions: ["Basic computer knowledge", "JDK installation", "IDE like IntelliJ or Eclipse"],
      sections: [
        {
          sectionName: "Java Fundamentals",
          subsections: [
            { title: "Introduction to Java", description: "Getting started with Java", timeDuration: "30" },
            { title: "Java Syntax", description: "Understanding Java syntax", timeDuration: "40" }
          ]
        }
      ]
    }
  ],
  "UI/UX Design": [
    {
      name: "Complete UI/UX Design Bootcamp",
      description: "Learn user interface and user experience design. Master Figma, design principles, and create stunning designs.",
      whatYouWillLearn: "Design principles, Figma mastery, User research, Prototyping",
      price: 2399,
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      status: "published",
      instructions: ["No design experience needed", "Figma account (free)", "Creative mindset"],
      sections: [
        {
          sectionName: "Design Fundamentals",
          subsections: [
            { title: "Introduction to UI/UX", description: "What is UI and UX?", timeDuration: "30" },
            { title: "Design Principles", description: "Core design principles", timeDuration: "45" }
          ]
        }
      ]
    },
    {
      name: "Figma for Beginners",
      description: "Master Figma from scratch. Learn interface design, prototyping, and collaboration.",
      whatYouWillLearn: "Figma tools, Component design, Prototyping, Design systems",
      price: 1799,
      thumbnail: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800",
      status: "published",
      instructions: ["Figma account", "Basic computer skills", "Design interest"],
      sections: [
        {
          sectionName: "Figma Basics",
          subsections: [
            { title: "Figma Interface", description: "Understanding Figma", timeDuration: "25" },
            { title: "Creating Designs", description: "Your first design", timeDuration: "40" }
          ]
        }
      ]
    }
  ]
};

const createCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    // Get instructor user
    const instructor = await User.findOne({ accountType: 'Instructor' });
    if (!instructor) {
      console.error('❌ No instructor found. Please create an instructor account first.');
      process.exit(1);
    }

    console.log(`👨‍🏫 Using instructor: ${instructor.firstName} ${instructor.lastName}\n`);

    // Get all categories
    const categories = await Category.find();
    console.log(`📚 Found ${categories.length} categories\n`);

    let totalCreated = 0;

    for (const category of categories) {
      const coursesForCategory = sampleCourses[category.name];
      
      if (!coursesForCategory) {
        console.log(`⚠️  No sample courses defined for ${category.name}`);
        continue;
      }

      console.log(`\n📖 Creating courses for: ${category.name}`);
      console.log('─'.repeat(60));

      for (const courseData of coursesForCategory) {
        // Check if course already exists
        const existingCourse = await Course.findOne({ 
          name: courseData.name,
          instructor: instructor._id 
        });

        if (existingCourse) {
          console.log(`   ⚠️  "${courseData.name}" already exists, skipping...`);
          continue;
        }

        // Create course
        const course = await Course.create({
          name: courseData.name,
          description: courseData.description,
          instructor: instructor._id,
          whatYouWillLearn: courseData.whatYouWillLearn,
          price: courseData.price,
          thumbnail: courseData.thumbnail,
          category: category._id,
          tag: [],
          status: courseData.status,
          instructions: courseData.instructions,
          studentsEnrolled: [],
        });

        // Create sections and subsections
        const createdSections = [];
        for (const sectionData of courseData.sections) {
          const section = await Section.create({
            courseId: course._id,
            name: sectionData.sectionName,
          });

          const createdSubSections = [];
          for (const subData of sectionData.subsections) {
            const subsection = await SubSection.create({
              courseId: course._id,
              sectionId: section._id,
              title: subData.title,
              description: subData.description,
              timeDuration: subData.timeDuration,
              videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder
            });
            createdSubSections.push(subsection._id);
          }

          section.subSections = createdSubSections;
          await section.save();
          createdSections.push(section._id);
        }

        course.courseContent = createdSections;
        await course.save();

        // Add course to instructor's courses
        instructor.courses.push(course._id);

        console.log(`   ✅ "${courseData.name}" - ₹${courseData.price}`);
        totalCreated++;
      }
    }

    await instructor.save();

    console.log('\n' + '='.repeat(60));
    console.log(`🎉 Successfully created ${totalCreated} courses!`);
    console.log('='.repeat(60));

    // Show summary
    console.log('\n📊 SUMMARY:');
    for (const category of categories) {
      const courseCount = await Course.countDocuments({ category: category._id });
      console.log(`   ${category.name}: ${courseCount} course(s)`);
    }

    const totalCourses = await Course.countDocuments();
    console.log(`\n   Total Courses: ${totalCourses}`);
    console.log('='.repeat(60) + '\n');

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

createCourses();
