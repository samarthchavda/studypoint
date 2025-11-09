import React, { useEffect, useState } from "react";
import { getCategoryCourses } from "../../services/operations/courseApi";
import CourseCard from "../comman/CourseCard";
import HighlightedText from "./HighlightedText";
import { Link } from "react-router-dom";
import { IoMdArrowRoundForward } from "react-icons/io";
import apiConnector from "../../services/apiConnector";
import { categoryEndpoint } from "../../services/apis";

const AllCoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch ALL published courses instead of just Web Development
        const response = await apiConnector("GET", categoryEndpoint.CATEGORIES_API);
        const categories = response.data.data;
        
        // Collect courses from all categories
        let allCourses = [];
        
        for (const category of categories) {
          try {
            await getCategoryCourses({ categoryId: category._id }, (data) => {
              if (data.categoryCourses) {
                allCourses = [...allCourses, ...data.categoryCourses];
              }
            });
          } catch (error) {
            console.error(`Error fetching courses for ${category.name}:`, error);
          }
        }
        
        // Remove duplicates based on _id
        const uniqueCourses = Array.from(new Map(allCourses.map(course => [course._id, course])).values());
        
        // Sort courses: published and recent first
        const sortedCourses = uniqueCourses
          .filter(course => course.status === 'published')
          .sort((a, b) => {
            // Sort by creation date (newest first)
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        
        setCourses(sortedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="w-11/12 mx-auto py-20">
        <div className="flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="w-11/12 mx-auto py-20">
        <h2 className="text-3xl font-semibold text-richblack-5 text-center">
          No courses available yet
        </h2>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-20">
      <div className="mb-12">
        <h2 className="text-4xl font-semibold text-richblack-5 text-center mb-3">
          Explore Our <HighlightedText text="Courses" />
        </h2>
        <p className="text-richblack-300 text-center max-w-2xl mx-auto">
          Discover a wide range of courses designed by industry experts to help you master new skills and advance your career
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {courses.slice(0, 6).map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          to="/catalog/IOT"
          className="bg-yellow-50 text-richblack-900 px-6 py-3 rounded-md font-semibold hover:scale-95 transition-all flex items-center gap-2"
        >
          View All Courses
          <IoMdArrowRoundForward />
        </Link>
      </div>
    </div>
  );
};

export default AllCoursesSection;
