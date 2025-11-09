require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Course = require('../models/Course');
const Category = require('../models/Category');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const RatingAndReview = require('../models/RatingAndReview');
const bcrypt = require('bcrypt');

// Course data organized by category
const categoryCoursesData = {
  "Web Development": [
    {
      courseName: "Complete Web Development Bootcamp",
      courseDescription: "Master HTML, CSS, JavaScript, React, Node.js and build full-stack web applications from scratch.",
      price: 4999,
      whatYouWillLearn: "Build responsive websites, Create REST APIs, Work with databases, Deploy applications to cloud",
      sections: [
        { name: "Frontend Fundamentals", subsections: ["HTML Basics", "CSS Styling", "JavaScript ES6"] },
        { name: "Backend Development", subsections: ["Node.js Setup", "Express Framework", "MongoDB Integration"] }
      ]
    },
    {
      courseName: "Advanced JavaScript Masterclass",
      courseDescription: "Deep dive into JavaScript concepts, async programming, design patterns, and modern ES6+ features.",
      price: 3499,
      whatYouWillLearn: "Master closures, promises, async/await, ES6+ features, functional programming",
      sections: [
        { name: "Core Concepts", subsections: ["Closures & Scope", "Prototypes", "Event Loop"] },
        { name: "Modern JavaScript", subsections: ["Promises", "Async/Await", "Modules"] }
      ]
    },
    {
      courseName: "React JS - Build Modern Web Apps",
      courseDescription: "Learn React from basics to advanced, including Hooks, Context API, Redux, and Next.js fundamentals.",
      price: 3999,
      whatYouWillLearn: "Build dynamic UIs, State management, Component architecture, Performance optimization",
      sections: [
        { name: "React Fundamentals", subsections: ["Components", "Props & State", "Hooks"] },
        { name: "Advanced React", subsections: ["Context API", "Redux Basics", "Performance"] }
      ]
    },
    {
      courseName: "Full Stack MERN Development",
      courseDescription: "Complete guide to building full-stack applications using MongoDB, Express, React, and Node.js.",
      price: 5999,
      whatYouWillLearn: "Build complete web apps, Authentication, File uploads, Payment integration, Deployment",
      sections: [
        { name: "MERN Stack Setup", subsections: ["Environment Setup", "Project Structure", "Database Design"] },
        { name: "Building Features", subsections: ["User Auth", "CRUD Operations", "API Development"] }
      ]
    }
  ],
  "Data Science": [
    {
      courseName: "Python for Data Science & Machine Learning",
      courseDescription: "Learn Python programming, data analysis, visualization, and machine learning algorithms.",
      price: 5499,
      whatYouWillLearn: "Python programming, NumPy, Pandas, Data visualization, ML algorithms, Model deployment",
      sections: [
        { name: "Python Basics", subsections: ["Python Fundamentals", "NumPy", "Pandas"] },
        { name: "Machine Learning", subsections: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation"] }
      ]
    },
    {
      courseName: "Data Analysis with R Programming",
      courseDescription: "Master R programming for statistical analysis, data manipulation, and creating visualizations.",
      price: 4299,
      whatYouWillLearn: "R programming, Statistical analysis, Data manipulation, ggplot2, Tidyverse, Reports",
      sections: [
        { name: "R Fundamentals", subsections: ["R Basics", "Data Structures", "Functions"] },
        { name: "Data Analysis", subsections: ["dplyr", "ggplot2", "Statistical Tests"] }
      ]
    },
    {
      courseName: "Deep Learning & Neural Networks",
      courseDescription: "Learn deep learning concepts, neural networks, CNNs, RNNs using TensorFlow and Keras.",
      price: 6499,
      whatYouWillLearn: "Neural networks, CNN, RNN, Transfer learning, TensorFlow, Keras, Model optimization",
      sections: [
        { name: "Neural Networks", subsections: ["Introduction", "Activation Functions", "Backpropagation"] },
        { name: "Deep Learning", subsections: ["CNNs", "RNNs", "Transfer Learning"] }
      ]
    },
    {
      courseName: "Big Data Analytics with Hadoop & Spark",
      courseDescription: "Learn big data processing, Hadoop ecosystem, Apache Spark, and distributed computing.",
      price: 5999,
      whatYouWillLearn: "Hadoop, HDFS, MapReduce, Spark, PySpark, Data pipelines, Real-time processing",
      sections: [
        { name: "Hadoop Ecosystem", subsections: ["HDFS", "MapReduce", "YARN"] },
        { name: "Apache Spark", subsections: ["Spark Core", "Spark SQL", "PySpark"] }
      ]
    }
  ],
  "Machine Learning": [
    {
      courseName: "Machine Learning A-Z: Hands-On Python",
      courseDescription: "Learn ML algorithms, regression, classification, clustering with real-world projects.",
      price: 5299,
      whatYouWillLearn: "Supervised learning, Unsupervised learning, Model evaluation, Feature engineering",
      sections: [
        { name: "ML Fundamentals", subsections: ["Introduction to ML", "Data Preprocessing", "Linear Regression"] },
        { name: "Advanced Algorithms", subsections: ["Decision Trees", "Random Forest", "SVM"] }
      ]
    },
    {
      courseName: "Deep Learning Specialization",
      courseDescription: "Master neural networks, CNNs, RNNs, and deploy deep learning models.",
      price: 6199,
      whatYouWillLearn: "Neural networks, CNN, RNN, LSTM, TensorFlow, Keras, Model deployment",
      sections: [
        { name: "Neural Networks", subsections: ["Perceptrons", "Backpropagation", "Optimization"] },
        { name: "Advanced DL", subsections: ["CNNs", "RNNs", "GANs"] }
      ]
    },
    {
      courseName: "Applied Machine Learning Projects",
      courseDescription: "Build real-world ML projects including image classification, NLP, and recommendation systems.",
      price: 5799,
      whatYouWillLearn: "End-to-end ML projects, Model deployment, MLOps, Production systems",
      sections: [
        { name: "Project 1", subsections: ["Problem Definition", "Data Collection", "Model Building"] },
        { name: "Deployment", subsections: ["Flask API", "Docker", "Cloud Deployment"] }
      ]
    },
    {
      courseName: "Time Series Analysis & Forecasting",
      courseDescription: "Learn time series analysis, ARIMA, LSTM for forecasting stock prices, sales, and trends.",
      price: 4799,
      whatYouWillLearn: "Time series analysis, ARIMA, LSTM, Prophet, Forecasting techniques",
      sections: [
        { name: "Time Series Basics", subsections: ["Trends & Seasonality", "Stationarity", "ACF & PACF"] },
        { name: "Forecasting Models", subsections: ["ARIMA", "LSTM", "Prophet"] }
      ]
    }
  ],
  "Mobile App Development": [
    {
      courseName: "Complete Flutter Development Course",
      courseDescription: "Build beautiful cross-platform mobile apps with Flutter and Dart.",
      price: 4599,
      whatYouWillLearn: "Flutter widgets, State management, Firebase, Animations, Publishing apps",
      sections: [
        { name: "Flutter Basics", subsections: ["Dart Programming", "Widgets", "Layouts"] },
        { name: "Advanced Flutter", subsections: ["State Management", "Firebase", "Animations"] }
      ]
    },
    {
      courseName: "React Native - Complete Guide",
      courseDescription: "Master React Native and build native iOS and Android apps with JavaScript.",
      price: 4499,
      whatYouWillLearn: "React Native components, Navigation, Redux, API integration, App deployment",
      sections: [
        { name: "React Native Basics", subsections: ["Setup", "Components", "Styling"] },
        { name: "Advanced Features", subsections: ["Navigation", "Redux", "Native Modules"] }
      ]
    },
    {
      courseName: "iOS App Development with SwiftUI",
      courseDescription: "Build modern iOS apps using SwiftUI, the latest Apple framework.",
      price: 4899,
      whatYouWillLearn: "SwiftUI, Swift programming, Core Data, CloudKit, App Store publishing",
      sections: [
        { name: "Swift & SwiftUI", subsections: ["Swift Basics", "SwiftUI Views", "Data Flow"] },
        { name: "iOS Features", subsections: ["Core Data", "Networking", "Animations"] }
      ]
    },
    {
      courseName: "Android Development Masterclass",
      courseDescription: "Complete Android development with Kotlin and Jetpack Compose.",
      price: 4699,
      whatYouWillLearn: "Kotlin, Jetpack Compose, Room database, MVVM, Material Design",
      sections: [
        { name: "Kotlin Fundamentals", subsections: ["Kotlin Syntax", "OOP", "Coroutines"] },
        { name: "Android Development", subsections: ["Jetpack Compose", "Room", "MVVM"] }
      ]
    }
  ],
  "Design": [
    {
      courseName: "UI/UX Design Complete Course",
      courseDescription: "Master user interface and user experience design principles and tools.",
      price: 3999,
      whatYouWillLearn: "Design principles, Figma, Adobe XD, Prototyping, User research, Wireframing",
      sections: [
        { name: "Design Fundamentals", subsections: ["Color Theory", "Typography", "Layout"] },
        { name: "Tools & Practice", subsections: ["Figma Basics", "Prototyping", "User Testing"] }
      ]
    },
    {
      courseName: "Graphic Design Masterclass",
      courseDescription: "Learn graphic design, Adobe Photoshop, Illustrator, and create stunning visuals.",
      price: 3799,
      whatYouWillLearn: "Photoshop, Illustrator, Logo design, Branding, Print design, Digital art",
      sections: [
        { name: "Photoshop Mastery", subsections: ["Photo Editing", "Compositing", "Effects"] },
        { name: "Illustrator", subsections: ["Vector Graphics", "Logo Design", "Illustrations"] }
      ]
    },
    {
      courseName: "Web Design with Figma",
      courseDescription: "Design modern websites and mobile apps using Figma from scratch.",
      price: 3299,
      whatYouWillLearn: "Figma tools, Component design, Auto-layout, Prototyping, Collaboration",
      sections: [
        { name: "Figma Basics", subsections: ["Interface", "Shapes & Text", "Components"] },
        { name: "Advanced Design", subsections: ["Auto-layout", "Variants", "Prototyping"] }
      ]
    },
    {
      courseName: "Motion Graphics & Animation",
      courseDescription: "Create stunning animations and motion graphics using After Effects.",
      price: 4299,
      whatYouWillLearn: "After Effects, Animation principles, Motion graphics, Video editing, Visual effects",
      sections: [
        { name: "After Effects Basics", subsections: ["Interface", "Keyframes", "Layers"] },
        { name: "Motion Design", subsections: ["Animation", "Text Effects", "Compositing"] }
      ]
    }
  ],
  "Artificial Intelligence": [
    {
      courseName: "Complete AI & Machine Learning Guide",
      courseDescription: "Comprehensive course covering AI fundamentals, ML algorithms, and practical implementations.",
      price: 6999,
      whatYouWillLearn: "AI concepts, ML algorithms, Neural networks, NLP, Computer vision, AI projects",
      sections: [
        { name: "AI Fundamentals", subsections: ["Introduction to AI", "Search Algorithms", "Knowledge Representation"] },
        { name: "Machine Learning", subsections: ["Regression", "Classification", "Clustering"] }
      ]
    },
    {
      courseName: "Natural Language Processing Masterclass",
      courseDescription: "Master NLP techniques, text processing, sentiment analysis, and building chatbots.",
      price: 5799,
      whatYouWillLearn: "Text processing, Sentiment analysis, Named entity recognition, Transformers, BERT, GPT",
      sections: [
        { name: "NLP Basics", subsections: ["Text Processing", "Tokenization", "Word Embeddings"] },
        { name: "Advanced NLP", subsections: ["Transformers", "BERT", "ChatBot Development"] }
      ]
    },
    {
      courseName: "Computer Vision with OpenCV & Deep Learning",
      courseDescription: "Learn computer vision, image processing, object detection, and facial recognition.",
      price: 6299,
      whatYouWillLearn: "Image processing, Object detection, Face recognition, YOLO, OpenCV, CNN applications",
      sections: [
        { name: "Computer Vision Basics", subsections: ["Image Processing", "Feature Detection", "OpenCV"] },
        { name: "Deep Learning for Vision", subsections: ["CNNs", "Object Detection", "Face Recognition"] }
      ]
    },
    {
      courseName: "Reinforcement Learning & AI Agents",
      courseDescription: "Master reinforcement learning, Q-learning, policy gradients, and build intelligent agents.",
      price: 6799,
      whatYouWillLearn: "RL fundamentals, Q-learning, Policy gradients, Deep RL, Multi-agent systems",
      sections: [
        { name: "RL Fundamentals", subsections: ["MDP", "Value Functions", "Q-Learning"] },
        { name: "Deep RL", subsections: ["DQN", "Policy Gradients", "Actor-Critic"] }
      ]
    }
  ],
  "Cloud Computing": [
    {
      courseName: "AWS Certified Solutions Architect Course",
      courseDescription: "Complete AWS course covering EC2, S3, RDS, Lambda, and preparing for certification.",
      price: 4999,
      whatYouWillLearn: "AWS services, EC2, S3, RDS, Lambda, CloudFormation, Security, Certification prep",
      sections: [
        { name: "AWS Basics", subsections: ["IAM", "EC2", "S3"] },
        { name: "Advanced AWS", subsections: ["RDS", "Lambda", "CloudFormation"] }
      ]
    },
    {
      courseName: "Microsoft Azure Cloud Fundamentals",
      courseDescription: "Learn Azure cloud platform, virtual machines, app services, and database management.",
      price: 4799,
      whatYouWillLearn: "Azure services, Virtual machines, App services, Azure SQL, Storage, DevOps",
      sections: [
        { name: "Azure Basics", subsections: ["Azure Portal", "Virtual Machines", "Storage"] },
        { name: "Azure Services", subsections: ["App Services", "Azure SQL", "Functions"] }
      ]
    },
    {
      courseName: "Google Cloud Platform Complete Guide",
      courseDescription: "Master GCP services including Compute Engine, Cloud Storage, BigQuery, and Kubernetes.",
      price: 4899,
      whatYouWillLearn: "GCP services, Compute Engine, Cloud Storage, BigQuery, Kubernetes, Cloud Functions",
      sections: [
        { name: "GCP Fundamentals", subsections: ["Compute Engine", "Cloud Storage", "Networking"] },
        { name: "Advanced GCP", subsections: ["BigQuery", "Kubernetes Engine", "Cloud Functions"] }
      ]
    },
    {
      courseName: "DevOps & Cloud Infrastructure",
      courseDescription: "Learn DevOps practices, CI/CD, Docker, Kubernetes, and cloud infrastructure automation.",
      price: 5499,
      whatYouWillLearn: "DevOps practices, Docker, Kubernetes, CI/CD, Terraform, Ansible, Monitoring",
      sections: [
        { name: "DevOps Basics", subsections: ["CI/CD", "Docker", "Git"] },
        { name: "Infrastructure as Code", subsections: ["Kubernetes", "Terraform", "Ansible"] }
      ]
    }
  ]
};

// Student accounts data
const studentsData = [
  { firstName: "Priya", lastName: "Sharma", email: "priya.sharma@student.com" },
  { firstName: "Rahul", lastName: "Patel", email: "rahul.patel@student.com" },
  { firstName: "Ananya", lastName: "Desai", email: "ananya.desai@student.com" },
  { firstName: "Vikram", lastName: "Singh", email: "vikram.singh@student.com" },
  { firstName: "Sneha", lastName: "Reddy", email: "sneha.reddy@student.com" },
  { firstName: "Arjun", lastName: "Kumar", email: "arjun.kumar@student.com" },
  { firstName: "Meera", lastName: "Iyer", email: "meera.iyer@student.com" },
  { firstName: "Rohan", lastName: "Gupta", email: "rohan.gupta@student.com" }
];

// Review texts for variety
const reviewTexts = [
  "Excellent course! Very well structured and easy to follow.",
  "Great content and practical examples. Highly recommended!",
  "The instructor explains concepts clearly. Worth every penny.",
  "Comprehensive course covering all important topics.",
  "Good course but could use more hands-on projects.",
  "Amazing learning experience. Helped me land a job!",
  "Well paced course with good exercises.",
  "Solid fundamentals and advanced topics covered well."
];

async function createProperCoursesAndStudents() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get all categories
    const categories = await Category.find({});
    console.log(`📚 Found ${categories.length} categories\n`);

    // Get all instructors
    const instructors = await User.find({ accountType: 'Instructor' });
    console.log(`👨‍🏫 Found ${instructors.length} instructors\n`);

    if (instructors.length === 0) {
      console.log('❌ No instructors found. Please create instructors first.');
      process.exit(1);
    }

    // First, delete all existing courses, sections, subsections, and reviews
    console.log('🗑️  Cleaning up existing courses...');
    await RatingAndReview.deleteMany({});
    await SubSection.deleteMany({});
    await Section.deleteMany({});
    await Course.deleteMany({});
    console.log('✅ Cleaned up old data\n');

    // Create students
    console.log('👥 Creating student accounts...\n');
    const hashedPassword = await bcrypt.hash('Student@123', 10);
    const students = [];

    for (const studentData of studentsData) {
      const profile = await Profile.create({
        gender: null,
        phoneNumber: null,
        about: `Passionate learner interested in technology and development`,
        dob: null,
        countryCode: null
      });

      const student = await User.create({
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        password: hashedPassword,
        accountType: 'Student',
        additionalDetails: profile._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${studentData.firstName} ${studentData.lastName}`,
        courses: []
      });

      students.push(student);
      console.log(`✅ Created student: ${student.firstName} ${student.lastName} (${student.email})`);
    }

    console.log(`\n✅ Created ${students.length} student accounts\n`);

    // Create courses for each category
    let courseCount = 0;
    let instructorIndex = 0;

    for (const category of categories) {
      const categoryName = category.name;
      const coursesForCategory = categoryCoursesData[categoryName];

      if (!coursesForCategory) {
        console.log(`⚠️  No course data for category: ${categoryName}`);
        continue;
      }

      console.log(`\n📖 Creating courses for ${categoryName}...`);

      for (const courseData of coursesForCategory) {
        const instructor = instructors[instructorIndex % instructors.length];
        instructorIndex++;

        // Create course
        const course = await Course.create({
          courseName: courseData.courseName,
          courseDescription: courseData.courseDescription,
          instructor: instructor._id,
          price: courseData.price,
          whatYouWillLearn: courseData.whatYouWillLearn,
          category: category._id,
          tag: ['Popular', 'Trending'],
          status: 'published',
          thumbnail: `https://api.dicebear.com/5.x/shapes/svg?seed=${courseData.courseName}`,
          courseContent: [],
          ratingAndReviews: [],
          studentsEnrolled: []
        });

        // Create sections and subsections
        const sectionIds = [];
        for (const sectionData of courseData.sections) {
          const section = await Section.create({
            name: sectionData.name,
            courseId: course._id,
            subSections: []
          });

          const subsectionIds = [];
          for (const subsectionTitle of sectionData.subsections) {
            const subsection = await SubSection.create({
              title: subsectionTitle,
              description: `Learn about ${subsectionTitle} in detail with practical examples`,
              videoUrl: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
              timeDuration: Math.floor(Math.random() * 30) + 10,
              courseId: course._id,
              sectionId: section._id
            });
            subsectionIds.push(subsection._id);
          }

          section.subSections = subsectionIds;
          await section.save();
          sectionIds.push(section._id);
        }

        course.courseContent = sectionIds;

        // Add random students and create reviews
        const numStudents = Math.floor(Math.random() * 5) + 3; // 3-7 students per course
        const enrolledStudents = [];
        const reviews = [];

        for (let i = 0; i < numStudents; i++) {
          const randomStudent = students[Math.floor(Math.random() * students.length)];
          
          if (!enrolledStudents.includes(randomStudent._id.toString())) {
            enrolledStudents.push(randomStudent._id);

            // Create review
            const rating = Math.floor(Math.random() * 2) + 4; // 4-5 stars
            const review = await RatingAndReview.create({
              user: randomStudent._id,
              course: course._id,
              rating: rating,
              review: reviewTexts[Math.floor(Math.random() * reviewTexts.length)]
            });
            reviews.push(review._id);

            // Update student's courses
            await User.findByIdAndUpdate(randomStudent._id, {
              $addToSet: { courses: course._id }
            });
          }
        }

        course.studentsEnrolled = enrolledStudents;
        course.ratingAndReviews = reviews;
        await course.save();

        // Update instructor's courses
        await User.findByIdAndUpdate(instructor._id, {
          $addToSet: { courses: course._id }
        });

        // Update category's courses
        await Category.findByIdAndUpdate(category._id, {
          $addToSet: { course: course._id }
        });

        courseCount++;
        console.log(`  ✅ ${courseData.courseName} (${enrolledStudents.length} students, ${reviews.length} reviews)`);
      }
    }

    console.log(`\n✅ Successfully created ${courseCount} courses with proper names!`);
    console.log(`✅ All courses have students enrolled and reviews added\n`);

    // Summary
    const totalCourses = await Course.countDocuments();
    const totalStudents = await User.countDocuments({ accountType: 'Student' });
    const totalReviews = await RatingAndReview.countDocuments();

    console.log('📊 Final Summary:');
    console.log(`   Total Courses: ${totalCourses}`);
    console.log(`   Total Students: ${totalStudents}`);
    console.log(`   Total Reviews: ${totalReviews}`);
    console.log(`   Total Instructors: ${instructors.length}`);
    console.log(`   Total Categories: ${categories.length}\n`);

    console.log('🔑 Student Login Credentials (All passwords: Student@123):');
    studentsData.forEach(student => {
      console.log(`   ${student.firstName} ${student.lastName}: ${student.email}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createProperCoursesAndStudents();
