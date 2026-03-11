import React, { useEffect, useState } from "react";
import {
  getCategoryCourses,
  getCourseReviews,
} from "../services/operations/courseApi";
import { useParams } from "react-router-dom";
import { categoryEndpoint } from "../services/apis";
import apiConnector from "../services/apiConnector";
import { useDispatch, useSelector } from "react-redux";
import TitleBar from "../components/catalog/TitleBar";
import Spinner from "../components/comman/Spinner";
import NavBar from "../components/comman/NavBar";
import SliderCourses from "../components/catalog/SliderCourses";
import GridCourses from "../components/catalog/GridCourses";
import Footer from "../components/comman/Footer";
import { defaultCategories, getCoursesByCategory, getCategoryByName } from "../data/catalog-data";
import { realCourses, getCoursesByCategory as getRealCoursesByCategory } from "../data/courses-data";

const CatalogPage = () => {
  const [courses, setCourses] = useState({ categoryCourses: [], topSellingCourses: [], diffCategoryCourses: [] });
  const [categories, setCategories] = useState(defaultCategories); // Use default categories
  const [categoryObj, setCategoryObj] = useState(null);
  const [loading, setLoading] = useState(true);
  const [call, setCall] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await apiConnector("GET", categoryEndpoint.CATEGORIES_API);
      if (response?.data?.data && response.data.data.length > 0) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.log("Using default categories due to API error:", error);
      setCategories(defaultCategories);
    }
    setCall(false);
    setLoading(false);
  };

  useEffect(() => {
    if (call) fetchCategories();
    setLoading(true);
    
    // Replace hyphens with spaces and match category name
    const catalogName = params.catalogName.replace(/-/g, " ");
    console.log("Catalog Name:", catalogName);
    
    // Try to find category from API data or use default
    let newCategoryObject = categories.find(
      (cat) => cat.name.toLowerCase() === catalogName.toLowerCase()
    );
    
    // Fallback to default categories if not found
    if (!newCategoryObject) {
      newCategoryObject = getCategoryByName(catalogName);
    }
    
    console.log("Category Object:", newCategoryObject);
    setCategoryObj(newCategoryObject);
    
    const fetchCourses = async () => {
      // Try to fetch from API first (real database courses)
      if (newCategoryObject && newCategoryObject._id) {
        try {
          const payload = { categoryId: newCategoryObject._id };
          const result = await getCategoryCourses(payload, setCourses);
          console.log("API Courses Result:", result);
          
          // Check if API returned courses
          const apiCourses = result?.categoryCourses || result?.data?.categoryCourses || [];
          if (apiCourses.length > 0) {
            console.log(`Using ${apiCourses.length} API courses for ${catalogName}`);
            setLoading(false);
            return; // Exit if API fetch successful with courses
          }
          console.log("API returned no courses, trying fallback...");
        } catch (error) {
          console.log("API fetch failed, trying fallback courses:", error);
        }
      }
      
      // Fallback to real courses from JSON export if API fails or returns empty
      const realCoursesForCategory = getRealCoursesByCategory(catalogName);
      console.log("Real Courses for", catalogName, ":", realCoursesForCategory);
      
      if (realCoursesForCategory.length > 0) {
        console.log(`Using ${realCoursesForCategory.length} real courses for ${catalogName}`);
        setCourses({
          categoryCourses: realCoursesForCategory,
          topSellingCourses: realCoursesForCategory.slice(0, Math.min(2, realCoursesForCategory.length)),
          diffCategoryCourses: realCoursesForCategory
        });
        setLoading(false);
      } else {
        // Final fallback to old default courses
        const defaultCoursesForCategory = getCoursesByCategory(catalogName);
        console.log("Default Courses for", catalogName, ":", defaultCoursesForCategory);
        
        if (defaultCoursesForCategory.length > 0) {
          console.log(`Using ${defaultCoursesForCategory.length} default courses for ${catalogName}`);
          setCourses({
            categoryCourses: defaultCoursesForCategory,
            topSellingCourses: defaultCoursesForCategory.slice(0, Math.min(2, defaultCoursesForCategory.length)),
            diffCategoryCourses: defaultCoursesForCategory
          });
        } else {
          console.log("No courses found for", catalogName);
          setCourses({
            categoryCourses: [],
            topSellingCourses: [],
            diffCategoryCourses: []
          });
        }
        setLoading(false);
      }
    };
    fetchCourses();
  }, [params, categories]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <NavBar />
      <TitleBar para={categoryObj?.description} />
      <div className="max-w-maxContent w-11/12 mx-auto mb-14">
        <SliderCourses type={"start"} courses={courses.categoryCourses} />
        <SliderCourses type={"top"} courses={courses.topSellingCourses} />
        <GridCourses courses={courses.diffCategoryCourses} />
      </div>
      <Footer />
    </>
  );
};

export default CatalogPage;
