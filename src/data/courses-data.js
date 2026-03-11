// Real courses data exported from database
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

export const realCourses = [
  {
    _id: "699dd86cdec08b8d78e0aa7b",
    name: "Complete Web Development Bootcamp",
    courseName: "Complete Web Development Bootcamp",
    courseDescription: "Learn HTML, CSS, JavaScript, React, Node.js and more",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more",
    whatYouWillLearn: "Build responsive websites, Create full-stack applications, Master modern frameworks, Deploy to production",
    price: 4999,
    thumbnail: webDevImg,
    instructor: {
      _id: "699dd547a1985d2462afb193",
      firstName: "John",
      lastName: "Doe",
      email: "instructor1@studypoint.com",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=John+Doe"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa6c",
      name: "Web Development"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: [],
    createdAt: new Date("2024-01-15"),
    instructions: ["Basic computer knowledge", "Internet connection", "Willingness to learn"]
  },
  {
    _id: "699dd86cdec08b8d78e0aa7e",
    name: "React JS Masterclass",
    courseName: "React JS Masterclass",
    courseDescription: "Master React.js and build modern web applications",
    description: "Master React.js and build modern web applications",
    whatYouWillLearn: "Master React fundamentals, Build dynamic UIs, Manage state efficiently, Create production-ready apps",
    price: 2999,
    thumbnail: reactImg,
    instructor: {
      _id: "699dd547a1985d2462afb193",
      firstName: "John",
      lastName: "Doe",
      email: "instructor1@studypoint.com",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=John+Doe"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa6c",
      name: "Web Development"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: [],
    createdAt: new Date("2024-01-10"),
    instructions: ["JavaScript basics", "HTML & CSS knowledge", "Code editor installed"]
  },
  {
    _id: "699dd86cdec08b8d78e0aa81",
    name: "Data Science with Python",
    courseName: "Data Science with Python",
    courseDescription: "Learn data analysis, visualization, and machine learning",
    description: "Learn data analysis, visualization, and machine learning",
    whatYouWillLearn: "Python for data analysis, Machine learning algorithms, Data visualization, Statistical analysis",
    price: 5999,
    thumbnail: dataScienceImg,
    instructor: {
      _id: "699dd547a1985d2462afb198",
      firstName: "Sarah",
      lastName: "Smith",
      email: "instructor2@studypoint.com",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Sarah+Smith"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa6f",
      name: "Data Science"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: [],
    createdAt: new Date("2024-01-08"),
    instructions: ["Basic Python knowledge", "Mathematics fundamentals", "Computer with 8GB RAM"]
  },
  {
    _id: "699dd86cdec08b8d78e0aa84",
    name: "Machine Learning A-Z",
    courseName: "Machine Learning A-Z",
    courseDescription: "Complete guide to machine learning algorithms",
    description: "Complete guide to machine learning algorithms",
    whatYouWillLearn: "ML algorithms, Neural networks, Model deployment, Real-world applications",
    price: 6999,
    thumbnail: mlImg,
    instructor: {
      _id: "699dd547a1985d2462afb198",
      firstName: "Sarah",
      lastName: "Smith",
      email: "instructor2@studypoint.com",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Sarah+Smith"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa6f",
      name: "Data Science"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: [],
    createdAt: new Date("2024-01-05"),
    instructions: ["Python programming", "Linear algebra basics", "Statistics knowledge"]
  },
  {
    _id: "699dd86cdec08b8d78e0aa87",
    name: "iOS App Development with Swift",
    courseName: "iOS App Development with Swift",
    courseDescription: "Build native iOS apps using Swift and SwiftUI",
    description: "Build native iOS apps using Swift and SwiftUI",
    whatYouWillLearn: "Swift programming, iOS frameworks, App design, App Store deployment",
    price: 4499,
    thumbnail: flutterImg,
    instructor: {
      _id: "699dd548a1985d2462afb19d",
      firstName: "Michael",
      lastName: "Johnson",
      email: "instructor3@studypoint.com",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Michael+Johnson"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa72",
      name: "Mobile Development"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: [],
    createdAt: new Date("2024-01-07"),
    instructions: ["Mac computer required", "Xcode installed", "Basic programming knowledge"]
  },
  {
    _id: "699dd86cdec08b8d78e0aa8a",
    name: "React Native - Build Mobile Apps",
    courseName: "React Native - Build Mobile Apps",
    courseDescription: "Create cross-platform mobile apps with React Native",
    description: "Create cross-platform mobile apps with React Native",
    whatYouWillLearn: "React Native basics, Navigation, Native features, App publishing",
    price: 3999,
    thumbnail: reactNativeImg,
    instructor: {
      _id: "699dd548a1985d2462afb19d",
      firstName: "Michael",
      lastName: "Johnson",
      email: "instructor3@studypoint.com",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Michael+Johnson"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa72",
      name: "Mobile Development"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: [],
    createdAt: new Date("2024-01-09"),
    instructions: ["JavaScript knowledge", "React basics", "Node.js installed"]
  },
  {
    _id: "699dd8cfe57465e0ce399b59",
    name: "Python Programming Masterclass",
    courseName: "Python Programming Masterclass",
    courseDescription: "Learn Python from zero to hero with hands-on projects",
    description: "Learn Python from zero to hero with hands-on projects",
    whatYouWillLearn: "Python fundamentals, OOP concepts, File handling, Error handling, Libraries",
    price: 999,
    thumbnail: pythonImg,
    instructor: {
      _id: "699dd7570c1bfebd724fc863",
      firstName: "chavda",
      lastName: "sam",
      email: "chavdasamarth3@gmail.com",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=chavda+sam"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa6c",
      name: "Web Development"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: [],
    createdAt: new Date("2024-01-02"),
    instructions: ["No prior programming experience needed", "Computer with any OS", "Enthusiasm to learn"]
  },
  // Programming Languages Category
  {
    _id: "prog001",
    name: "JavaScript - The Complete Guide 2024",
    courseName: "JavaScript - The Complete Guide 2024",
    courseDescription: "Master JavaScript from basics to advanced. ES6+, Async/Await, DOM manipulation, and modern JS development",
    description: "Master JavaScript from basics to advanced. ES6+, Async/Await, DOM manipulation, and modern JS development",
    whatYouWillLearn: "JavaScript fundamentals, Modern ES6+ features, Async programming, DOM manipulation, Object-oriented JS",
    price: 2299,
    thumbnail: jsImg,
    instructor: {
      _id: "699dd547a1985d2462afb193",
      firstName: "John",
      lastName: "Doe",
      email: "instructor1@studypoint.com",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=John+Doe"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa75",
      name: "Programming Languages"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: [],
    createdAt: new Date("2024-01-12"),
    instructions: ["Basic HTML knowledge", "Text editor installed", "Web browser"]
  },
  {
    _id: "prog002",
    name: "Learn HTML - Web Foundations",
    courseName: "Learn HTML - Web Foundations",
    courseDescription: "Master HTML5 fundamentals. Build the foundation for web development with semantic HTML",
    description: "Master HTML5 fundamentals. Build the foundation for web development with semantic HTML",
    whatYouWillLearn: "HTML syntax, Semantic elements, Forms and inputs, Tables and lists, Best practices, Accessibility",
    price: 999,
    thumbnail: htmlImg,
    instructor: {
      _id: "699dd547a1985d2462afb198",
      firstName: "Sarah",
      lastName: "Smith",
      email: "instructor2@studypoint.com",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Sarah+Smith"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa75",
      name: "Programming Languages"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: [],
    createdAt: new Date("2024-01-13"),
    instructions: ["No prior experience needed", "Computer with internet", "Text editor"]
  },
  {
    _id: "prog003",
    name: "Learn CSS - Styling Websites",
    courseName: "Learn CSS - Styling Websites",
    courseDescription: "Master CSS3 and modern styling techniques. Create beautiful, responsive websites",
    description: "Master CSS3 and modern styling techniques. Create beautiful, responsive websites",
    whatYouWillLearn: "CSS fundamentals, Flexbox layout, Grid system, Animations and transitions, Responsive design, CSS variables",
    price: 1299,
    thumbnail: cssImg,
    instructor: {
      _id: "699dd548a1985d2462afb19d",
      firstName: "Michael",
      lastName: "Johnson",
      email: "instructor3@studypoint.com",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Michael+Johnson"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa75",
      name: "Programming Languages"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: [],
    createdAt: new Date("2024-01-14"),
    instructions: ["Basic HTML knowledge", "Text editor", "Modern web browser"]
  },
  {
    _id: "prog004",
    name: "Bootstrap Framework Learning",
    courseName: "Bootstrap Framework Learning",
    courseDescription: "Learn Bootstrap framework for rapid web development. Build responsive websites quickly",
    description: "Learn Bootstrap framework for rapid web development. Build responsive websites quickly",
    whatYouWillLearn: "Bootstrap components, Grid system, Responsive utilities, Customization, JavaScript plugins, Real projects",
    price: 1499,
    thumbnail: bootstrapImg,
    instructor: {
      _id: "699dd7570c1bfebd724fc863",
      firstName: "chavda",
      lastName: "sam",
      email: "chavdasamarth3@gmail.com",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=chavda+sam"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa75",
      name: "Programming Languages"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: [],
    createdAt: new Date("2024-01-16"),
    instructions: ["HTML & CSS basics", "Basic JavaScript knowledge", "Code editor"]
  },
  // UI/UX Design Category
  {
    _id: "uiux001",
    name: "Complete UI/UX Design Bootcamp",
    courseName: "Complete UI/UX Design Bootcamp",
    courseDescription: "Learn user interface and user experience design. Master Figma, design principles, and create stunning designs",
    description: "Learn user interface and user experience design. Master Figma, design principles, and create stunning designs",
    whatYouWillLearn: "Design principles, User research methods, Wireframing and prototyping, Figma mastery, Portfolio building, Design systems",
    price: 2499,
    thumbnail: uiuxImg,
    instructor: {
      _id: "699dd547a1985d2462afb198",
      firstName: "Sarah",
      lastName: "Smith",
      email: "instructor2@studypoint.com",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Sarah+Smith"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa78",
      name: "UI/UX Design"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: [],
    createdAt: new Date("2024-01-06"),
    instructions: ["No design experience needed", "Computer with internet", "Figma account (free)"]
  },
  {
    _id: "uiux002",
    name: "Figma UI/UX Design Essentials",
    courseName: "Figma UI/UX Design Essentials",
    courseDescription: "Master Figma design tool. Learn interface design, prototyping, and collaboration features",
    description: "Master Figma design tool. Learn interface design, prototyping, and collaboration features",
    whatYouWillLearn: "Figma interface, Components and variants, Auto-layout, Prototyping and animations, Design systems, Team collaboration",
    price: 1499,
    thumbnail: figmaImg,
    instructor: {
      _id: "699dd548a1985d2462afb19d",
      firstName: "Michael",
      lastName: "Johnson",
      email: "instructor3@studypoint.com",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Michael+Johnson"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa78",
      name: "UI/UX Design"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: [],
    createdAt: new Date("2024-01-04"),
    instructions: ["Basic design understanding", "Figma account", "Computer with good internet"]
  }
];

// Get courses by category name
export const getCoursesByCategory = (categoryName) => {
  return realCourses.filter(
    course => course.category.name.toLowerCase() === categoryName.toLowerCase()
  );
};

// Get all categories
export const getAllCategories = () => {
  const categories = {};
  realCourses.forEach(course => {
    if (course.category && !categories[course.category._id]) {
      categories[course.category._id] = course.category;
    }
  });
  return Object.values(categories);
};
