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
    
    // Try to find category from API data or use default
    let newCategoryObject = categories.find(
      (cat) => cat.name.toLowerCase() === catalogName.toLowerCase()
    );
    
    // Fallback to default categories if not found
    if (!newCategoryObject) {
      newCategoryObject = getCategoryByName(catalogName);
    }
    
    setCategoryObj(newCategoryObject);
    
    const fetchCourses = async () => {
      if (newCategoryObject) {
        // Try to fetch from API
        try {
          const payload = { categoryId: newCategoryObject._id };
          await getCategoryCourses(payload, setCourses);
        } catch (error) {
          console.log("Using default courses due to API error");
          // Use default courses if API fails
          const defaultCoursesForCategory = getCoursesByCategory(newCategoryObject.name);
          setCourses({
            categoryCourses: defaultCoursesForCategory,
            topSellingCourses: defaultCoursesForCategory.slice(0, 2),
            diffCategoryCourses: defaultCoursesForCategory
          });
        }
      } else {
        // Use default courses if no category found
        const defaultCoursesForCategory = getCoursesByCategory(catalogName);
        setCourses({
          categoryCourses: defaultCoursesForCategory,
          topSellingCourses: defaultCoursesForCategory.slice(0, 2),
          diffCategoryCourses: defaultCoursesForCategory
        });
      }
      setLoading(false);
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
