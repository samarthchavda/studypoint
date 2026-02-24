// Real courses data exported from database
export const realCourses = [
  {
    _id: "699dd86cdec08b8d78e0aa7b",
    courseName: "Complete Web Development Bootcamp",
    courseDescription: "Learn HTML, CSS, JavaScript, React, Node.js and more",
    price: 4999,
    thumbnail: "https://via.placeholder.com/800x400?text=Web+Development+Bootcamp",
    instructor: {
      _id: "699dd547a1985d2462afb193",
      firstName: "John",
      lastName: "Doe",
      email: "instructor1@studynotion.com"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa6c",
      name: "Web Development"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: []
  },
  {
    _id: "699dd86cdec08b8d78e0aa7e",
    courseName: "React JS Masterclass",
    courseDescription: "Master React.js and build modern web applications",
    price: 2999,
    thumbnail: "https://via.placeholder.com/800x400?text=React+Masterclass",
    instructor: {
      _id: "699dd547a1985d2462afb193",
      firstName: "John",
      lastName: "Doe",
      email: "instructor1@studynotion.com"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa6c",
      name: "Web Development"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: []
  },
  {
    _id: "699dd86cdec08b8d78e0aa81",
    courseName: "Data Science with Python",
    courseDescription: "Learn data analysis, visualization, and machine learning",
    price: 5999,
    thumbnail: "https://via.placeholder.com/800x400?text=Data+Science",
    instructor: {
      _id: "699dd547a1985d2462afb198",
      firstName: "Sarah",
      lastName: "Smith",
      email: "instructor2@studynotion.com"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa6f",
      name: "Data Science"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: []
  },
  {
    _id: "699dd86cdec08b8d78e0aa84",
    courseName: "Machine Learning A-Z",
    courseDescription: "Complete guide to machine learning algorithms",
    price: 6999,
    thumbnail: "https://via.placeholder.com/800x400?text=Machine+Learning",
    instructor: {
      _id: "699dd547a1985d2462afb198",
      firstName: "Sarah",
      lastName: "Smith",
      email: "instructor2@studynotion.com"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa6f",
      name: "Data Science"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: []
  },
  {
    _id: "699dd86cdec08b8d78e0aa87",
    courseName: "iOS App Development with Swift",
    courseDescription: "Build native iOS apps using Swift and SwiftUI",
    price: 4499,
    thumbnail: "https://via.placeholder.com/800x400?text=iOS+Development",
    instructor: {
      _id: "699dd548a1985d2462afb19d",
      firstName: "Michael",
      lastName: "Johnson",
      email: "instructor3@studynotion.com"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa72",
      name: "Mobile Development"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: []
  },
  {
    _id: "699dd86cdec08b8d78e0aa8a",
    courseName: "React Native - Build Mobile Apps",
    courseDescription: "Create cross-platform mobile apps with React Native",
    price: 3999,
    thumbnail: "https://via.placeholder.com/800x400?text=React+Native",
    instructor: {
      _id: "699dd548a1985d2462afb19d",
      firstName: "Michael",
      lastName: "Johnson",
      email: "instructor3@studynotion.com"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa72",
      name: "Mobile Development"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: []
  },
  {
    _id: "699dd8cfe57465e0ce399b59",
    courseName: "data entry",
    courseDescription: "sjdasdjadkjad",
    price: 999,
    thumbnail: "https://via.placeholder.com/800x400?text=Course+Thumbnail",
    instructor: {
      _id: "699dd7570c1bfebd724fc863",
      firstName: "chavda",
      lastName: "sam",
      email: "chavdasamarth3@gmail.com"
    },
    category: {
      _id: "699dd86bdec08b8d78e0aa6c",
      name: "Web Development"
    },
    status: "published",
    studentsEnrolled: [],
    ratingAndReviews: []
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
