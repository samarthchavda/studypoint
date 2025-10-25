import React, { useEffect, useState } from "react";
import LocationBar from "../../../components/dashboard/LocationBar";
import YellowBtn from "../../../components/comman/YellowBtn";
import { IoIosAddCircle } from "react-icons/io";
import CoursesTable from "../../../components/dashboard/Instructor/myCourses/CoursesTable";
import { getInstructorCourses } from "../../../services/operations/profileApi";
import Spinner from "../../../components/comman/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep, setCourseInfo } from "../../../slices/courseSlice";
const MyCourses = () => {
  const [courses, setCourses] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getCourses = async () => {
      const fetchCourses = await getInstructorCourses(token, dispatch);
      if (fetchCourses) {
        setCourses(fetchCourses);
      }
    };
    getCourses();
  }, []);
  const updateCourses = (newCourses) => {
    setCourses(newCourses);
  };
  return loading ? (
    <Spinner />
  ) : courses && courses.length > 0 ? (
    <div className="sm:pr-0 pr-3">
      <div className="flex sm:flex-row flex-col w-full items-start sm:items-center justify-between">
        <div className="p-6">
          <LocationBar />
        </div>
        <div className=" pl-6 pb-3 self-start sm:self-center">
          <YellowBtn
            clickHandler={() => {
              dispatch(setStep(1));
              dispatch(setCourseInfo(null));
              navigate("/dashboard/add-course");
            }}
            text={
              <>
                <IoIosAddCircle />
                New
              </>
            }
          />
        </div>
      </div>
      <CoursesTable updateCourses={updateCourses} courses={courses} />
    </div>
  ) : (
    <div className="flex items-center flex-col gap-5 h-full justify-center ">
      <p className="text-3xl  text-richblack-5">
        You have not Added any courses
      </p>
      <YellowBtn
        clickHandler={() => {
          dispatch(setStep(1));
          dispatch(setCourseInfo(null));
          navigate("/dashboard/add-course");
        }}
        text={
          <>
            <IoIosAddCircle />
            Add course
          </>
        }
      />
    </div>
  );
};

export default MyCourses;
