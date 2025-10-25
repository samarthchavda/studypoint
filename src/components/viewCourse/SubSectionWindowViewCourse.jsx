import React from "react";
import { useSelector } from "react-redux";
import { MdOutlineMonitor } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
const SubSectionWindowViewCourse = ({ subSections }) => {
  const subSectionId = useParams().subSectionId;
  const navigate = useNavigate();
  const completedLectures = useSelector(
    (state) => state.viewCourse.completedLectures
  );
  const isLectureCompleted = (subSectionId) => {
    return completedLectures.includes(subSectionId);
  };
  return (
    <div className="text-sm px-6 flex flex-col py-3">
      {subSections?.map((subSection, index) => {
        const isCompleted = isLectureCompleted(subSection._id);
        const isLoaded = subSectionId === subSection._id ? true : false;
        return (
          <div
            onClick={() =>
              navigate(
                `view-course/${subSection?.courseId}/sectionId/${subSection?.sectionId}/sub-sectionId/${subSection?._id}`
              )
            }
            className={`x flex cursor-pointer items-center gap-2`}
          >
            {isLoaded ? (
              <FaPlay className="text-blue-100 " />
            ) : (
              <input
                type="checkbox"
                disabled
                checked={isCompleted}
                name="isCompleted"
                id="isCompleted"
              />
            )}

            <h3
              className={`${
                isLoaded
                  ? "text-blue-100 font-semibold"
                  : isCompleted
                  ? "text-richblack-400 font-medium line-through"
                  : "text-richblack-25 font-medium  "
              } text-sm`}
            >
              {subSection?.title}
            </h3>
            <MdOutlineMonitor
              className={`${
                isCompleted || isLoaded
                  ? "text-richblack-50"
                  : "text-richblack-300"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SubSectionWindowViewCourse;
