const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');

// Sample course banner URLs (using placeholder images)
const courseBanners = {
  'Web Development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
  'Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
  'Machine Learning': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
  'Mobile Development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
  'UI/UX Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
  'Python': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
  'JavaScript': 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
  'React': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
  'Flutter': 'https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?w=800',
  'Figma': 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800'
};

const coursesData = [
  {
    courseName: 'Complete Web Development Bootcamp 2024',
    categoryName: 'Web Development',
    courseDescription: 'Master web development from scratch. Learn HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and deploy real-world projects. Become a full-stack web developer.',
    whatYouWillLearn: 'Build responsive websites using HTML5 and CSS3, Master JavaScript ES6+ and modern features, Create dynamic web apps with React and Redux, Build RESTful APIs with Node.js and Express, Work with MongoDB and Mongoose, Deploy applications to production servers, Implement authentication and authorization, Master Git and GitHub for version control',
    price: 4999,
    tag: ['Web Development', 'Full Stack', 'JavaScript', 'React', 'Node.js'],
    banner: courseBanners['Web Development']
  },
  {
    courseName: 'React JS - Complete Guide 2024',
    categoryName: 'Web Development',
    courseDescription: 'Deep dive into React.js. Learn React hooks, Context API, Redux, React Router, testing, and build production-ready applications with best practices.',
    whatYouWillLearn: 'Master React fundamentals and component lifecycle, Build reusable components with React Hooks, Manage complex state with Redux and Context API, Handle routing with React Router v6, Optimize React applications for performance, Test React components with Jest and React Testing Library, Implement advanced patterns like HOC and Render Props, Deploy React apps to production',
    price: 3999,
    tag: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    banner: courseBanners['React']
  },
  {
    courseName: 'Data Science Masterclass with Python',
    categoryName: 'Data Science',
    courseDescription: 'Complete data science course covering Python, NumPy, Pandas, Matplotlib, Seaborn, and Machine Learning. Work with real datasets and build predictive models.',
    whatYouWillLearn: 'Master Python for data analysis and manipulation, Work with NumPy arrays and Pandas DataFrames, Create stunning visualizations with Matplotlib and Seaborn, Perform statistical analysis and hypothesis testing, Build machine learning models for prediction, Work with real-world datasets and case studies, Clean and preprocess messy data, Present insights through data storytelling',
    price: 5999,
    tag: ['Data Science', 'Python', 'Machine Learning', 'Analytics'],
    banner: courseBanners['Data Science']
  },
  {
    courseName: 'Machine Learning A-Z: Hands-On Python',
    categoryName: 'Machine Learning',
    courseDescription: 'Complete machine learning course with Python. Learn supervised and unsupervised learning, neural networks, and deploy ML models to production.',
    whatYouWillLearn: 'Understand machine learning algorithms from scratch, Build classification models with high accuracy, Create regression models for predictions, Implement clustering and dimensionality reduction, Work with neural networks and deep learning basics, Deploy ML models to production environments, Handle real-world datasets and challenges, Evaluate and optimize model performance',
    price: 6999,
    tag: ['Machine Learning', 'Python', 'AI', 'Deep Learning'],
    banner: courseBanners['Machine Learning']
  },
  {
    courseName: 'Flutter & Dart - Complete Mobile App Development',
    categoryName: 'Mobile App Development',
    courseDescription: 'Build beautiful native mobile apps for iOS and Android using Flutter and Dart. Learn state management, Firebase integration, and publish apps to stores.',
    whatYouWillLearn: 'Build cross-platform apps for iOS and Android, Master Flutter widgets and custom layouts, Implement state management with Provider and Bloc, Integrate Firebase for backend services, Create smooth animations and transitions, Work with device APIs and native features, Handle API calls and data persistence, Deploy apps to App Store and Play Store',
    price: 4999,
    tag: ['Flutter', 'Dart', 'Mobile Development', 'Cross-platform'],
    banner: courseBanners['Flutter']
  },
  {
    courseName: 'React Native - Build iOS & Android Apps',
    categoryName: 'Mobile App Development',
    courseDescription: 'Develop native mobile apps using React Native. Build cross-platform applications with a single codebase and deploy to both iOS and Android platforms.',
    whatYouWillLearn: 'Develop apps for iOS and Android simultaneously, Master React Native components and APIs, Handle navigation with React Navigation, Implement push notifications and deep linking, Work with device features like camera and GPS, Integrate with REST APIs and GraphQL, Optimize app performance and bundle size, Publish apps to both app stores',
    price: 4999,
    tag: ['React Native', 'Mobile Development', 'JavaScript', 'Cross-platform'],
    banner: courseBanners['Mobile Development']
  },
  {
    courseName: 'Python Programming Masterclass - Zero to Hero',
    categoryName: 'Web Development',
    courseDescription: 'Complete Python course from basics to advanced. Learn Python fundamentals, OOP, web scraping, automation, and build real-world projects.',
    whatYouWillLearn: 'Master Python syntax and programming fundamentals, Work with data structures and algorithms, Build object-oriented programs with classes, Handle files, exceptions, and decorators, Create Python packages and modules, Automate tasks with Python scripts, Work with databases using Python, Build real-world projects and applications',
    price: 3499,
    tag: ['Python', 'Programming', 'Automation', 'Backend'],
    banner: courseBanners['Python']
  },
  {
    courseName: 'Complete UI/UX Design Bootcamp with Figma',
    categoryName: 'Design',
    courseDescription: 'Master UI/UX design principles and Figma. Learn user research, wireframing, prototyping, and create stunning designs for web and mobile applications.',
    whatYouWillLearn: 'Master design principles and color theory, Create user personas and journey maps, Build wireframes and high-fidelity mockups, Design interactive prototypes in Figma, Conduct user research and usability testing, Create responsive designs for all devices, Build and maintain design systems, Collaborate with developers effectively',
    price: 3999,
    tag: ['UI/UX', 'Design', 'Figma', 'Prototyping'],
    banner: courseBanners['UI/UX Design']
  },
  {
    courseName: 'JavaScript - The Complete Guide 2024',
    categoryName: 'Web Development',
    courseDescription: 'Deep dive into JavaScript. Master modern JavaScript, ES6+, async programming, modules, and build dynamic web applications with vanilla JavaScript.',
    whatYouWillLearn: 'Master JavaScript fundamentals and syntax, Work with ES6+ features and modern JavaScript, Understand async programming with Promises and Async/Await, Manipulate DOM and handle events, Work with modules and build tools, Implement object-oriented and functional programming, Handle API calls and work with JSON, Debug and optimize JavaScript code',
    price: 3499,
    tag: ['JavaScript', 'Web Development', 'Frontend', 'ES6'],
    banner: courseBanners['JavaScript']
  },
  {
    courseName: 'Figma UI/UX Design Essentials',
    categoryName: 'Design',
    courseDescription: 'Master Figma for UI/UX design. Learn to create professional designs, prototypes, and collaborate with teams using industry-standard tools.',
    whatYouWillLearn: 'Master Figma interface and tools, Create vector graphics and icons, Build interactive prototypes with animations, Design responsive layouts with auto-layout, Work with components and variants, Collaborate with teams in real-time, Create design systems and style guides, Export assets for development',
    price: 2999,
    tag: ['Figma', 'UI/UX', 'Design', 'Prototyping'],
    banner: courseBanners['Figma']
  }
];

async function addProperCourses() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/studynotion');
    console.log('✅ Connected to database\n');

    // Get an instructor
    const instructor = await User.findOne({ accountType: 'Instructor' });
    if (!instructor) {
      console.log('❌ No instructor found! Please create an instructor first.');
      process.exit(1);
    }
    console.log(`✅ Found instructor: ${instructor.firstName} ${instructor.lastName}\n`);

    let createdCount = 0;

    for (const courseData of coursesData) {
      // Find the category
      const category = await Category.findOne({ name: courseData.categoryName });
      if (!category) {
        console.log(`⚠️  Category "${courseData.categoryName}" not found, skipping course: ${courseData.courseName}`);
        continue;
      }

      // Check if course already exists
      const existingCourse = await Course.findOne({ courseName: courseData.courseName });
      if (existingCourse) {
        console.log(`⏭️  Course already exists: ${courseData.courseName}`);
        continue;
      }

      // Create the course first (without sections)
      const course = await Course.create({
        courseName: courseData.courseName,
        courseDescription: courseData.courseDescription,
        instructor: instructor._id,
        whatYouWillLearn: courseData.whatYouWillLearn,
        courseContent: [],
        ratingAndReview: [],
        price: courseData.price,
        thumbnail: courseData.banner,
        category: category._id,
        tag: courseData.tag,
        studentsEnrolled: [],
        instructions: ['Basic computer knowledge', 'Internet connection', 'Dedication to learn'],
        status: 'published',
        language: 'English',
        level: 'Beginner to Advanced'
      });

      // Now create sections with courseId
      const section1 = await Section.create({
        name: 'Introduction',
        courseId: course._id,
        subSections: []
      });

      const section2 = await Section.create({
        name: 'Getting Started',
        courseId: course._id,
        subSections: []
      });

      const section3 = await Section.create({
        name: 'Advanced Topics',
        courseId: course._id,
        subSections: []
      });

      // Create subsections (lectures) - timeDuration in seconds
      const subSection1 = await SubSection.create({
        title: 'Course Introduction',
        description: 'Welcome to the course! Learn what you will build and achieve.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        timeDuration: 600, // 10 minutes in seconds
        courseId: course._id,
        sectionId: section1._id
      });

      const subSection2 = await SubSection.create({
        title: 'Setup and Installation',
        description: 'Set up your development environment and install required tools.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        timeDuration: 900, // 15 minutes in seconds
        courseId: course._id,
        sectionId: section2._id
      });

      const subSection3 = await SubSection.create({
        title: 'First Project',
        description: 'Build your first project and understand core concepts.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        timeDuration: 1800, // 30 minutes in seconds
        courseId: course._id,
        sectionId: section3._id
      });

      // Add subsections to sections
      section1.subSections.push(subSection1._id);
      section2.subSections.push(subSection2._id);
      section3.subSections.push(subSection3._id);

      await section1.save();
      await section2.save();
      await section3.save();

      // Update course with sections
      course.courseContent = [section1._id, section2._id, section3._id];
      await course.save();

      // Add course to category
      category.courses.push(course._id);
      await category.save();

      // Add course to instructor
      instructor.courses.push(course._id);
      await instructor.save();

      console.log(`✅ Created: ${courseData.courseName}`);
      createdCount++;
    }

    console.log(`\n🎉 Successfully created ${createdCount} courses with proper names and banners!`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addProperCourses();
