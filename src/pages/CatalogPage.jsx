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

const CatalogPage = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryObj, setCategoryObj] = useState(null);
  // const loading = useSelector((state) => state.course.loading);
  const [loading, setLoading] = useState(true);
  const [call, setCall] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();

  const fetchCategories = async () => {
    setLoading(true);
    apiConnector("GET", categoryEndpoint.CATEGORIES_API)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setCall(false);
    setLoading(false);
  };

  useEffect(() => {
    if (call) fetchCategories();
    setLoading(true);
    
    // Replace hyphens with spaces and match category name
    const catalogName = params.catalogName.replace(/-/g, " ");
    console.log("Looking for category:", catalogName);
    console.log("Available categories:", categories);
    
    const newCategoryObject = categories
      .filter((cat) => cat.name.toLowerCase() === catalogName.toLowerCase())
      .at(0);
    
    console.log("Found category object:", newCategoryObject);
    setCategoryObj(newCategoryObject);
    
    const fetchCourses = async () => {
      if (newCategoryObject) {
        console.log("Fetching courses for category:", newCategoryObject.name);
        const payload = { categoryId: newCategoryObject._id };
        await getCategoryCourses(payload, setCourses);
        setLoading(false);
      } else {
        console.log("No category found, not fetching courses");
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
