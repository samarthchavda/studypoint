// Default catalog data - fallback when API is unavailable
// Import local images
import webDevImg from '../assets/courseImages/complete-web-development-bootcamp-2024.jpg';
import reactImg from '../assets/courseImages/react-js-complete-guide-2024.jpg';
import jsImg from '../assets/courseImages/javascript-the-complete-guide-2024.jpg';
import dataScienceImg from '../assets/courseImages/data-science-masterclass-with-python.jpg';
import mlImg from '../assets/courseImages/machine-learning-a-z-hands-on-python.jpg';
import flutterImg from '../assets/courseImages/flutter-dart-complete-mobile-app-development.jpg';
import reactNativeImg from '../assets/courseImages/react-native-build-ios-android-apps.jpg';
import pythonImg from '../assets/courseImages/python-programming-masterclass-zero-to-hero.jpg';
import htmlImg from '../assets/courseImages/learn-html.jpg';
import cssImg from '../assets/courseImages/learn-css.jpg';
import uiuxImg from '../assets/courseImages/complete-ui-ux-design-bootcamp-with-figma.jpg';
import figmaImg from '../assets/courseImages/figma-ui-ux-design-essentials.jpg';
import bootstrapImg from '../assets/courseImages/bootstrap-learning.jpg';

export const defaultCategories = [
  {
    _id: "cat1",
    name: "Web Development",
    description: "Learn to build modern websites and web applications using HTML, CSS, JavaScript, React, Node.js and more"
  },
  {
    _id: "cat2",
    name: "Data Science",
    description: "Explore data analysis, machine learning, AI, and big data technologies"
  },
  {
    _id: "cat3",
    name: "Mobile Development",
    description: "Master mobile app development with Android, iOS, React Native, and Flutter"
  },
  {
    _id: "cat4",
    name: "Programming Languages",
    description: "Learn programming fundamentals with Python, Java, C++, JavaScript and other languages"
  },
  {
    _id: "cat5",
    name: "UI/UX Design",
    description: "Master user interface and user experience design with Figma, Adobe XD, and design principles"
  },
  {
    _id: "cat6",
    name: "Artificial Intelligence",
    description: "Dive into AI, deep learning, neural networks, and cutting-edge machine intelligence"
  },
  {
    _id: "cat7",
    name: "IOT",
    description: "Internet of Things - Connect devices, sensors, and build smart systems"
  }
];

export const defaultCourses = {
  "Web Development": [
    {
      _id: "course1",
      name: "Complete Web Development Bootcamp",
      courseName: "Complete Web Development Bootcamp",
      courseDescription: "Master HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and become a full-stack developer.",
      description: "Master HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and become a full-stack developer.",
      whatYouWillLearn: "Build responsive websites, Create full-stack applications, Master modern frameworks, Deploy to production",
      price: 2999,
      thumbnail: webDevImg,
      instructor: { firstName: "John", lastName: "Doe", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-15"),
      instructions: ["Basic computer knowledge", "Internet connection", "Willingness to learn"]
    },
    {
      _id: "course2",
      name: "React JS - The Complete Guide",
      courseName: "React JS - The Complete Guide",
      courseDescription: "Learn React from scratch. Hooks, Context API, Redux, and build amazing single-page applications.",
      description: "Learn React from scratch. Hooks, Context API, Redux, and build amazing single-page applications.",
      whatYouWillLearn: "Master React fundamentals, Build dynamic UIs, Manage state efficiently, Create production-ready apps",
      price: 2499,
      thumbnail: reactImg,
      instructor: { firstName: "Jane", lastName: "Smith", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-10"),
      instructions: ["JavaScript basics", "HTML & CSS knowledge", "Code editor installed"]
    },
    {
      _id: "course3",
      name: "JavaScript - The Complete Guide 2024",
      courseName: "JavaScript - The Complete Guide 2024",
      courseDescription: "Master JavaScript from basics to advanced. ES6+, Async/Await, DOM manipulation, and modern JS development.",
      description: "Master JavaScript from basics to advanced. ES6+, Async/Await, DOM manipulation, and modern JS development.",
      whatYouWillLearn: "JavaScript fundamentals, Modern ES6+ features, Async programming, DOM manipulation",
      price: 2299,
      thumbnail: jsImg,
      instructor: { firstName: "Mike", lastName: "Johnson", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-12"),
      instructions: ["Basic HTML knowledge", "Text editor installed", "Web browser"]
    }
  ],
  "Data Science": [
    {
      _id: "course4",
      name: "Data Science Masterclass",
      courseName: "Data Science Masterclass",
      courseDescription: "Complete data science course covering Python, Pandas, NumPy, Machine Learning, and real-world projects.",
      description: "Complete data science course covering Python, Pandas, NumPy, Machine Learning, and real-world projects.",
      whatYouWillLearn: "Python for data analysis, Machine learning algorithms, Data visualization, Statistical analysis",
      price: 3499,
      thumbnail: dataScienceImg,
      instructor: { firstName: "Sarah", lastName: "Williams", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-08"),
      instructions: ["Basic Python knowledge", "Mathematics fundamentals", "Computer with 8GB RAM"]
    },
    {
      _id: "course5",
      name: "Machine Learning A-Z",
      courseName: "Machine Learning A-Z",
      courseDescription: "Master machine learning algorithms, deep learning, and AI. Build real ML models from scratch.",
      description: "Master machine learning algorithms, deep learning, and AI. Build real ML models from scratch.",
      whatYouWillLearn: "ML algorithms, Neural networks, Model deployment, Real-world applications",
      price: 3999,
      thumbnail: mlImg,
      instructor: { firstName: "David", lastName: "Brown", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-05"),
      instructions: ["Python programming", "Linear algebra basics", "Statistics knowledge"]
    }
  ],
  "Mobile Development": [
    {
      _id: "course6",
      name: "Flutter & Dart - Complete Guide",
      courseName: "Flutter & Dart - Complete Guide",
      courseDescription: "Build beautiful native mobile apps for iOS and Android using Flutter and Dart programming language.",
      description: "Build beautiful native mobile apps for iOS and Android using Flutter and Dart programming language.",
      whatYouWillLearn: "Flutter widgets, State management, API integration, App deployment",
      price: 2799,
      thumbnail: flutterImg,
      instructor: { firstName: "Emma", lastName: "Davis", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-07"),
      instructions: ["Basic programming knowledge", "Android Studio or VS Code", "Mobile device or emulator"]
    },
    {
      _id: "course7",
      name: "React Native - Build Mobile Apps",
      courseName: "React Native - Build Mobile Apps",
      courseDescription: "Create cross-platform mobile applications using React Native. Build for iOS and Android with one codebase.",
      description: "Create cross-platform mobile applications using React Native. Build for iOS and Android with one codebase.",
      whatYouWillLearn: "React Native basics, Navigation, Native features, App publishing",
      price: 2599,
      thumbnail: reactNativeImg,
      instructor: { firstName: "Chris", lastName: "Wilson", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-09"),
      instructions: ["JavaScript knowledge", "React basics", "Node.js installed"]
    }
  ],
  "Programming Languages": [
    {
      _id: "course8",
      name: "Python Programming Masterclass",
      courseName: "Python Programming Masterclass",
      courseDescription: "Learn Python from basics to advanced. Perfect for beginners and experienced developers.",
      description: "Learn Python from basics to advanced. Perfect for beginners and experienced developers.",
      whatYouWillLearn: "Python fundamentals, OOP concepts, File handling, Error handling, Libraries",
      price: 1999,
      thumbnail: pythonImg,
      instructor: { firstName: "Alex", lastName: "Taylor", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-11"),
      instructions: ["No prior programming experience needed", "Computer with any OS", "Enthusiasm to learn"]
    },
    {
      _id: "course9",
      name: "Learn HTML - Web Foundations",
      courseName: "Learn HTML - Web Foundations",
      courseDescription: "Master HTML5 fundamentals. Build the foundation for web development with semantic HTML.",
      description: "Master HTML5 fundamentals. Build the foundation for web development with semantic HTML.",
      whatYouWillLearn: "HTML syntax, Semantic elements, Forms, Tables, Best practices",
      price: 999,
      thumbnail: htmlImg,
      instructor: { firstName: "Lisa", lastName: "Anderson", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-13"),
      instructions: ["No prior experience needed", "Computer with internet", "Text editor"]
    },
    {
      _id: "course10",
      name: "Learn CSS - Styling Websites",
      courseName: "Learn CSS - Styling Websites",
      courseDescription: "Master CSS3 and modern styling techniques. Create beautiful, responsive websites.",
      description: "Master CSS3 and modern styling techniques. Create beautiful, responsive websites.",
      whatYouWillLearn: "CSS fundamentals, Flexbox, Grid, Animations, Responsive design",
      price: 1299,
      thumbnail: cssImg,
      instructor: { firstName: "Tom", lastName: "Garcia", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-14"),
      instructions: ["Basic HTML knowledge", "Text editor", "Modern web browser"]
    },
    {
      _id: "course14",
      name: "Bootstrap Framework Learning",
      courseName: "Bootstrap Framework Learning",
      courseDescription: "Learn Bootstrap framework for rapid web development. Build responsive websites quickly.",
      description: "Learn Bootstrap framework for rapid web development. Build responsive websites quickly.",
      whatYouWillLearn: "Bootstrap components, Grid system, Responsive utilities, Customization",
      price: 1299,
      thumbnail: bootstrapImg,
      instructor: { firstName: "John", lastName: "Smith", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-02"),
      instructions: ["HTML & CSS basics", "Basic JavaScript knowledge", "Code editor"]
    }
  ],
  "UI/UX Design": [
    {
      _id: "course11",
      name: "Complete UI/UX Design Bootcamp",
      courseName: "Complete UI/UX Design Bootcamp",
      courseDescription: "Learn user interface and user experience design. Master Figma, design principles, and create stunning designs.",
      description: "Learn user interface and user experience design. Master Figma, design principles, and create stunning designs.",
      whatYouWillLearn: "Design principles, User research, Prototyping, Figma mastery, Portfolio building",
      price: 2499,
      thumbnail: uiuxImg,
      instructor: { firstName: "Sophie", lastName: "Martinez", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-06"),
      instructions: ["No design experience needed", "Computer with internet", "Figma account (free)"]
    },
    {
      _id: "course12",
      name: "Figma UI/UX Design Essentials",
      courseName: "Figma UI/UX Design Essentials",
      courseDescription: "Master Figma design tool. Learn interface design, prototyping, and collaboration features.",
      description: "Master Figma design tool. Learn interface design, prototyping, and collaboration features.",
      whatYouWillLearn: "Figma interface, Components, Auto-layout, Prototyping, Design systems",
      price: 1499,
      thumbnail: figmaImg,
      instructor: { firstName: "Rachel", lastName: "Kim", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-04"),
      instructions: ["Basic design understanding", "Figma account", "Computer with good internet"]
    }
  ],
  "Artificial Intelligence": [
    {
      _id: "course13",
      name: "Machine Learning with Python",
      courseName: "Machine Learning with Python",
      courseDescription: "Explore artificial intelligence and machine learning. Build ML models and AI applications.",
      description: "Explore artificial intelligence and machine learning. Build ML models and AI applications.",
      whatYouWillLearn: "Neural networks, Deep learning, TensorFlow, PyTorch, AI applications",
      price: 4499,
      thumbnail: mlImg,
      instructor: { firstName: "James", lastName: "Lee", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-03"),
      instructions: ["Python programming", "Linear algebra basics", "Statistics knowledge"]
    }
  ],
  "IOT": [
    {
      _id: "course15",
      name: "Internet of Things Fundamentals",
      courseName: "Internet of Things Fundamentals",
      courseDescription: "Learn IoT basics, connect devices, sensors, and build smart systems with Arduino and Raspberry Pi.",
      description: "Learn IoT basics, connect devices, sensors, and build smart systems with Arduino and Raspberry Pi.",
      whatYouWillLearn: "IoT concepts, Arduino programming, Sensor integration, Cloud connectivity, Smart home projects",
      price: 1999,
      thumbnail: bootstrapImg,
      instructor: { firstName: "John", lastName: "Smith", image: "" },
      ratingAndReviews: [],
      studentsEnrolled: [],
      status: "published",
      createdAt: new Date("2024-01-02"),
      instructions: ["Basic programming knowledge", "Arduino kit (optional)", "Enthusiasm for electronics"]
    }
  ]
};

// Get courses by category name
export const getCoursesByCategory = (categoryName) => {
  // Try exact match first
  if (defaultCourses[categoryName]) {
    return defaultCourses[categoryName];
  }
  
  // Try case-insensitive match
  const key = Object.keys(defaultCourses).find(
    k => k.toLowerCase() === categoryName.toLowerCase()
  );
  
  return key ? defaultCourses[key] : [];
};

// Get category by name
export const getCategoryByName = (categoryName) => {
  return defaultCategories.find(
    cat => cat.name.toLowerCase() === categoryName.toLowerCase()
  );
};
