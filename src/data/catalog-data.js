// Default catalog data - fallback when API is unavailable
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
      courseName: "Complete Web Development Bootcamp",
      courseDescription: "Master HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and become a full-stack developer.",
      whatYouWillLearn: "Build responsive websites, Create full-stack applications, Master modern frameworks, Deploy to production",
      price: 2999,
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      instructor: { firstName: "John", lastName: "Doe" },
      ratingAndReviews: [],
      studentsEnrolled: []
    },
    {
      _id: "course2",
      courseName: "React JS - The Complete Guide",
      courseDescription: "Learn React from scratch. Hooks, Context API, Redux, and build amazing single-page applications.",
      whatYouWillLearn: "Master React fundamentals, Build dynamic UIs, Manage state efficiently, Create production-ready apps",
      price: 2499,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      instructor: { firstName: "Jane", lastName: "Smith" },
      ratingAndReviews: [],
      studentsEnrolled: []
    },
    {
      _id: "course3",
      courseName: "Node.js & Express - Backend Development",
      courseDescription: "Build powerful backend APIs with Node.js, Express, and MongoDB. Learn authentication, REST APIs, and more.",
      whatYouWillLearn: "Create REST APIs, Implement authentication, Database integration, Server deployment",
      price: 2799,
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
      instructor: { firstName: "Mike", lastName: "Johnson" },
      ratingAndReviews: [],
      studentsEnrolled: []
    }
  ],
  "Data Science": [
    {
      _id: "course4",
      courseName: "Data Science Masterclass",
      courseDescription: "Complete data science course covering Python, Pandas, NumPy, Machine Learning, and real-world projects.",
      whatYouWillLearn: "Python for data analysis, Machine learning algorithms, Data visualization, Statistical analysis",
      price: 3499,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      instructor: { firstName: "Sarah", lastName: "Williams" },
      ratingAndReviews: [],
      studentsEnrolled: []
    },
    {
      _id: "course5",
      courseName: "Machine Learning A-Z",
      courseDescription: "Master machine learning algorithms, deep learning, and AI. Build real ML models from scratch.",
      whatYouWillLearn: "ML algorithms, Neural networks, Model deployment, Real-world applications",
      price: 3999,
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
      instructor: { firstName: "David", lastName: "Brown" },
      ratingAndReviews: [],
      studentsEnrolled: []
    }
  ],
  "Mobile Development": [
    {
      _id: "course6",
      courseName: "Flutter & Dart - Complete Guide",
      courseDescription: "Build beautiful native mobile apps for iOS and Android using Flutter and Dart programming language.",
      whatYouWillLearn: "Flutter widgets, State management, API integration, App deployment",
      price: 2799,
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
      instructor: { firstName: "Emma", lastName: "Davis" },
      ratingAndReviews: [],
      studentsEnrolled: []
    },
    {
      _id: "course7",
      courseName: "React Native - Build Mobile Apps",
      courseDescription: "Create cross-platform mobile applications using React Native. Build for iOS and Android with one codebase.",
      whatYouWillLearn: "React Native basics, Navigation, Native features, App publishing",
      price: 2599,
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
      instructor: { firstName: "Chris", lastName: "Wilson" },
      ratingAndReviews: [],
      studentsEnrolled: []
    }
  ],
  "Programming Languages": [
    {
      _id: "course8",
      courseName: "Python Programming Masterclass",
      courseDescription: "Learn Python from basics to advanced. Perfect for beginners and experienced developers.",
      whatYouWillLearn: "Python fundamentals, OOP concepts, File handling, Error handling, Libraries",
      price: 1999,
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
      instructor: { firstName: "Alex", lastName: "Taylor" },
      ratingAndReviews: [],
      studentsEnrolled: []
    },
    {
      _id: "course9",
      courseName: "Java Programming Complete Course",
      courseDescription: "Master Java programming language. Learn OOP, data structures, and build enterprise applications.",
      whatYouWillLearn: "Java syntax, Object-oriented programming, Collections, Multithreading",
      price: 2299,
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
      instructor: { firstName: "Lisa", lastName: "Anderson" },
      ratingAndReviews: [],
      studentsEnrolled: []
    }
  ],
  "UI/UX Design": [
    {
      _id: "course10",
      courseName: "Complete UI/UX Design Bootcamp",
      courseDescription: "Learn user interface and user experience design. Master Figma, design principles, and create stunning designs.",
      whatYouWillLearn: "Design principles, User research, Prototyping, Figma mastery, Portfolio building",
      price: 2499,
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      instructor: { firstName: "Sophie", lastName: "Martinez" },
      ratingAndReviews: [],
      studentsEnrolled: []
    },
    {
      _id: "course11",
      courseName: "Figma for Beginners",
      courseDescription: "Master Figma design tool. Learn interface design, prototyping, and collaboration features.",
      whatYouWillLearn: "Figma interface, Components, Auto-layout, Prototyping, Design systems",
      price: 1499,
      thumbnail: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800",
      instructor: { firstName: "Tom", lastName: "Garcia" },
      ratingAndReviews: [],
      studentsEnrolled: []
    }
  ],
  "Artificial Intelligence": [
    {
      _id: "course12",
      courseName: "AI and Deep Learning",
      courseDescription: "Explore artificial intelligence and deep learning. Build neural networks and AI applications.",
      whatYouWillLearn: "Neural networks, Deep learning, TensorFlow, PyTorch, AI applications",
      price: 4499,
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      instructor: { firstName: "James", lastName: "Lee" },
      ratingAndReviews: [],
      studentsEnrolled: []
    }
  ],
  "IOT": [
    {
      _id: "course13",
      courseName: "Internet of Things Fundamentals",
      courseDescription: "Learn IoT basics. Connect sensors, devices, and build smart systems using Arduino and Raspberry Pi.",
      whatYouWillLearn: "IoT concepts, Arduino, Raspberry Pi, Sensors, Cloud integration",
      price: 2899,
      thumbnail: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800",
      instructor: { firstName: "Rachel", lastName: "Kim" },
      ratingAndReviews: [],
      studentsEnrolled: []
    }
  ]
};

// Get courses by category name
export const getCoursesByCategory = (categoryName) => {
  return defaultCourses[categoryName] || [];
};

// Get category by name
export const getCategoryByName = (categoryName) => {
  return defaultCategories.find(
    cat => cat.name.toLowerCase() === categoryName.toLowerCase()
  );
};
