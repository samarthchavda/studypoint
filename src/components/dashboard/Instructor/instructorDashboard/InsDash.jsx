import React, { useEffect, useState } from "react";
import { getInstructorDashboardInfo } from "../../../../services/operations/profileApi";
import Spinner from "../../../comman/Spinner";
import Visuals from "./Visulas";
import Statistics from "./Statistics";
import Courses from "./Courses";
import { useSelector } from "react-redux";
const InsDash = () => {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currChart, setCurrChart] = useState("students");
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      const fetchedCourses = await getInstructorDashboardInfo(
        token,
        setLoading
      );
      console.log(fetchedCourses);

      if (fetchedCourses) {
        setCourses(fetchedCourses);
      }
    };
    fetchInstructorCourses();
  }, []);
  const user = useSelector((state) => state.profile.user);
  return loading ? (
    <Spinner />
  ) : courses && courses.length > 0 ? (
    <div className="w-full md:pl-6 pl-3 sm:pr-0 pr-3 pt-6 md:pb-6 pb-3 flex flex-col mx-auto gap-4">
      <h1 className="text-2xl font-semibold text-richblack-5 ">
        Hi {`${user?.firstName} ${user?.lastName}`} 👋
      </h1>
      <div className="grid md:gap-5 gap-3  grid-cols-4">
        <div className=" bg-richblack-800 pl-6 pt-4 lg:col-span-3 sm:col-span-2 col-span-4 rounded-lg flex flex-col gap-4 pb-4">
          <h3 className="font-semibold text-richblack-5">Visualize</h3>
          <div className="">
            <button
              className={`${
                currChart === "students"
                  ? "bg-richblack-900/50 text-yellow-100"
                  : "text-yellow-200/60"
              } font-medium px-3 py-2 rounded-lg`}
              onClick={() => setCurrChart("students")}
            >
              Students
            </button>
            <button
              className={`${
                currChart === "income"
                  ? "bg-richblack-900/50 text-yellow-100"
                  : "text-yellow-200/60"
              } font-medium px-3 py-2 rounded-lg`}
              onClick={() => setCurrChart("income")}
            >
              Income
            </button>
          </div>
          <div className="pb-2">
            <Visuals type={currChart} courses={courses} />
          </div>
        </div>
        <div className="lg:col-span-1 sm:col-span-2 col-span-4">
          <Statistics courses={courses} />
        </div>
        <div className="col-span-4">
          <Courses courses={courses} />
        </div>
      </div>
    </div>
  ) : (
    <p>No courses found</p>
  );
};

export default InsDash;
