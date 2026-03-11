import { useLocation } from "react-router-dom";
import { buyCourse } from "../services/operations/paymentApi";
import { useEffect, useState } from "react";
import { getFullCourseDetails, enrollFreeCourse } from "../services/operations/courseApi";
import Spinner from "../components/comman/Spinner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import NavBar from "../components/comman/NavBar";
import CourseIntro from "../components/courseInfo/courseIntro";
import CourseBuyCard from "../components/courseInfo/CourseBuyCard";
import CourseContent from "../components/courseInfo/CourseContent";
import Footer from "../components/comman/Footer";
import { addItem } from "../slices/cartSlice";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import ReviewSlider from "../components/comman/ReviewSlider";
import { getCourseReviews } from "../services/operations/courseApi";
import { defaultCourses } from "../data/catalog-data";
import { realCourses } from "../data/courses-data";

const normalizeCourse = (course, fallbackCategory) => {
  if (!course) {
    return null;
  }

  const parsedPrice = Number(course.price);
  const normalizedPrice = Number.isFinite(parsedPrice) ? parsedPrice : null;

  return {
    ...course,
    name: course.name || course.courseName,
    courseName: course.courseName || course.name,
    description: course.description || course.courseDescription,
    courseDescription: course.courseDescription || course.description,
    whatYouWillLearn: course.whatYouWillLearn || "",
    instructions: Array.isArray(course.instructions) ? course.instructions : [],
    price: normalizedPrice,
    courseContent: Array.isArray(course.courseContent) ? course.courseContent : [],
    category: course.category || (fallbackCategory ? { name: fallbackCategory } : null),
    studentsEnrolled: Array.isArray(course.studentsEnrolled) ? course.studentsEnrolled : [],
    ratingAndReviews: Array.isArray(course.ratingAndReviews) ? course.ratingAndReviews : [],
  };
};

const findFallbackCourseById = (courseId) => {
  const realCourse = realCourses.find((item) => item._id === courseId);
  if (realCourse) {
    return normalizeCourse(realCourse);
  }

  for (const category in defaultCourses) {
    const courses = defaultCourses[category];
    const foundCourse = courses.find((item) => item._id === courseId);
    if (foundCourse) {
      return normalizeCourse(foundCourse, category);
    }
  }

  return null;
};

const CourseInfoPage = () => {
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState(null);

  const loacation = useLocation();
  const courseId = loacation.pathname.split("/").at(-1);
  const loading = useSelector((state) => state.course.loading);
  const authLoading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.profile.user);
    const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const setFallbackCourse = () => {
      const fallbackCourse = findFallbackCourseById(courseId);
      if (fallbackCourse) {
        setCourse(fallbackCourse);
        return;
      }

      console.error("Course not found in fallback data");
      setCourse(null);
    };
    
    const fetchCourseDetails = async () => {
      try {
        const response = await getFullCourseDetails({ courseId }, dispatch);
        console.log("Course Details Response:", response);
        if (response) {
          setCourse(normalizeCourse(response));
        } else {
          setFallbackCourse();
        }
      } catch (error) {
        console.log("Using default course data due to API error");
        setFallbackCourse();
      }
    };
    
    fetchCourseDetails();
  }, [courseId, dispatch]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviews = await getCourseReviews(courseId);
        console.log("Reviews Response:", reviews);
        if (reviews && reviews.length > 0) {
          setReviews(reviews);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.log("No reviews available");
        setReviews([]);
      }
    };

    getReviews();
  }, [courseId]);

  const goToCourseHandler = () => {
    navigate("/dashboard/enrolled-courses");
  };

  const addToCart = () => {
    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot add courses to wishlist");
      return;
    }
    dispatch(addItem(course));
    toast.success("Added to wishlist successfully!");
  };

  const handleBuyCourse = async () => {
    if (!user) {
      toast.error("Please login to buy courses");
      return;
    }
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot buy courses");
      return;
    }
    await buyCourse(token,user?._id,[courseId],dispatch);
  };

  const handleFreeEnroll = async () => {
    if (!user) {
      toast.error("Please login to enroll in courses");
      return;
    }
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot enroll in courses");
      return;
    }
    await enrollFreeCourse(token, courseId, navigate, dispatch);
  };

  const isStudentEnrolled = () => {
    return course?.studentsEnrolled?.some((student) => {
      if (typeof student === "string") {
        return student === user?._id;
      }

      return student?._id === user?._id;
    });
  };

  const isFree = Number(course?.price) === 0;

  return (
    <div>
      <NavBar />
      {loading || authLoading ? (
        <Spinner />
      ) : (
        <div className=" flex mx-auto">
          {/* <YellowBtn clickHandler={handleBuyCourse} text={'Buy'}/> */}

          {/* courseInfo section */}
          <div className="w-full flex flex-col gap-10 pb-20">
            <div className="w-full bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-neutral-200">
              <div className="max-w-maxContent w-11/12 py-8 mx-auto">
                <div className="flex md:flex-row flex-col gap-6 relative">
                  <div className="md:w-[calc(100%-400px)] w-full md:pr-6">
                    <CourseIntro course={course} />
                  </div>
                  <div className="md:w-[380px] w-full md:absolute md:right-0 md:top-0">
                    <CourseBuyCard
                      thumbnail={course?.thumbnail}
                      buyHandler={handleBuyCourse}
                      isBought={isStudentEnrolled()}
                      course={course}
                      price={course?.price}
                      instructions={course?.instructions}
                      addToCart={addToCart}
                      goToCourseHandler={goToCourseHandler}
                      isFree={isFree}
                      freeEnrollHandler={handleFreeEnroll}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="max-w-maxContent w-11/12 flex flex-col gap-5 mx-auto ">
                {/* what you'll learn*/}
                <div className="md:w-[calc(100%-400px)] w-full p-8 flex flex-col gap-4 border-neutral-200 border-[1px] bg-white rounded-xl shadow-sm">
                  <p className="text-3xl text-neutral-800 font-semibold">
                    What you'll learn
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course?.whatYouWillLearn?.split(',').map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-success-500 text-xl mt-1">✓</span>
                        <p className="text-neutral-700 text-sm">{item.trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements Section */}
                {course?.instructions && course.instructions.length > 0 && (
                  <div className="md:w-[calc(100%-400px)] w-full p-8 flex flex-col gap-4 border-neutral-200 border-[1px] bg-white rounded-xl shadow-sm">
                    <p className="text-2xl text-neutral-800 font-semibold">
                      Requirements
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      {course.instructions.map((instruction, index) => (
                        <li key={index} className="text-neutral-700 text-sm">
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Course Description */}
                {course?.description && (
                  <div className="md:w-[calc(100%-400px)] w-full p-8 flex flex-col gap-4 border-neutral-200 border-[1px] bg-white rounded-xl shadow-sm">
                    <p className="text-2xl text-neutral-800 font-semibold">
                      Description
                    </p>
                    <p className="text-neutral-700 text-sm leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                )}

                {/* course content */}
                <div className="md:w-[calc(100%-400px)] w-full mt-5">
                  <CourseContent 
                    content={course?.courseContent} 
                    isEnrolled={isStudentEnrolled()}
                  />
                </div>

                {/*author section*/}
                <div className="md:w-[calc(100%-400px)] w-full flex flex-col gap-4 p-8 border-neutral-200 border-[1px] bg-white rounded-xl shadow-sm">
                  <h4 className="font-semibold text-2xl text-neutral-800">
                    Instructor
                  </h4>
                  <div className="flex gap-4 items-start">
                    <img
                      className="rounded-full h-[72px] w-[72px] object-cover bg-neutral-100 border-2 border-primary-200"
                      src={course?.instructor?.image || "https://api.dicebear.com/5.x/initials/svg?seed=" + course?.instructor?.firstName}
                      alt={`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}
                      onError={(e) => {
                        e.target.src = "https://api.dicebear.com/5.x/initials/svg?seed=" + course?.instructor?.firstName;
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-neutral-800 font-semibold text-lg mb-1">
                        {course?.instructor?.firstName}{" "}
                        {course?.instructor?.lastName}
                      </p>
                      <p className="text-neutral-600 text-sm mb-2">
                        {course?.instructor?.accountType || "Instructor"} {course?.instructor?.email && `• ${course?.instructor?.email}`}
                      </p>
                      {course?.instructor?.additionalDetails?.about && (
                        <p className="text-neutral-700 text-sm leading-relaxed">
                          {course?.instructor?.additionalDetails?.about}
                        </p>
                      )}
                      {!course?.instructor?.additionalDetails?.about && (
                        <p className="text-neutral-700 text-sm leading-relaxed">
                          Experienced instructor passionate about teaching and helping students achieve their learning goals.
                        </p>
                      )}
                      <div className="flex gap-4 mt-3 text-sm text-neutral-600">
                        <span>📚 {course?.instructor?.courses?.length || 0} Courses</span>
                        <span>⭐ 4.5 Average Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* review Slider */}
              <div className="max-w-maxContent mt-20 w-11/12 mx-auto">
                <ReviewSlider reviews={reviews} />
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CourseInfoPage;
