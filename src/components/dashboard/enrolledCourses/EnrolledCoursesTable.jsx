import React, { useEffect } from "react";
import { useState } from "react";
import {
  getEnrolledCourses,
  getUserDetails,
} from "../../../services/operations/profileApi";
import Spinner from "../../comman/Spinner";
import ProgressBar from "@ramonak/react-progress-bar";
import formatDuration from "../../../utils/formatDuration";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFrownOpen } from "react-icons/fa";
const EnrolledCoursesTable = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const courseDeleteHandler = () => {};
  const fetchEntolledCourses = async () => {
    try {
      const response = await getEnrolledCourses(token);
      if (response) setEnrolledCourses(response);
      console.log(response);
    } catch (error) {
      console.log("error while fetching enrolled courses");
    }
  };
  useEffect(() => {
    fetchEntolledCourses();
  }, []);
const trimDes=(des)=>{
    return des.substring(0,50)+'...';
  }
  const showDuration = (duration) => {
    const courseDuration = formatDuration(duration);
    return courseDuration.hours === 0
      ? `${courseDuration.minutes}mins ${courseDuration.seconds}s`
      : `${courseDuration.hours}hrs ${courseDuration.minutes}mins`;
  };

  return (
    <div className="w-full ">
      {enrolledCourses ? (
        enrolledCourses.length > 0 ? (
          <div className="overflow-hidden border-[1px] border-richblue-700 rounded-lg">
            <table className="w-full border-collapse ">
              <tr className="bg-[#2C333F] text-sm h-14 font-medium text-[#C5C7D4]">
                <th className="text-left pl-4 ">Course Name</th>
                <th className="text-left">Duration</th>
                <th className="text-left">Progress</th>
                {/* <th></th> */}
              </tr>
              {enrolledCourses.map((item, index) => {
                return (
                  <tr key={index} className="border-[1px] border-richblack-700">
                    <td className="pl-4 py-4">
                      <Link to={`/course/${item._id}`}>
                        <div className="flex flex-col sm:flex-row gap-5">
                          <img
                            className="sm:h-[52px] w-3/5 sm:w-fit"
                            src={item.thumbnail}
                            alt=""
                          />
                          <div className="flex flex-col gap-[2px]">
                            <h3 className="text-richblack-5 font-medium">
                              {item.name}
                            </h3>
                            <p className="text-richblack-300">
                              {trimDes(item.description)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="text-[#C5C7D4] font-medium">
                      {showDuration(item?.totalDuration)}
                    </td>
                    <td className="pr-4">
                      <p className="text-richblack-50 font-semibold mb-1 text-[12px]">
                        Progress {item?.coursePercentage}%
                      </p>
                      <ProgressBar
                        completed={item?.coursePercentage}
                        bgColor={"#47A5C5"}
                        baseBgColor="#2C333F"
                        height={"8px"}
                        isLabelVisible={false}
                      />
                    </td>
                    {/* <td>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="flex flex-col gap-2 px-4 mx-auto justify-center"
                      >
                        <div className="w-1 h-1 rounded-full bg-richblack-200"></div>
                        <div className="w-1 h-1 rounded-full bg-richblack-200"></div>
                        <div className="w-1 h-1 rounded-full bg-richblack-200"></div>
                      </button>
                    </td> */}
                  </tr>
                );
              })}
            </table>
          </div>
        ) : (
          <div className="h-[20rem] w-full flex justify-center items-center">
            <p className="text-richblack-200 text-center flex gap-1 items-center font-medium flex-col text-xl">
              <FaFrownOpen className="text-yellow-25 text-2xl"/>
              You Have not Enrolled in any courses
            </p>
          </div>
        )
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default EnrolledCoursesTable;
