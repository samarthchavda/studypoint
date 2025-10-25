import React from "react";
import { LuDot } from "react-icons/lu";
import formatDuration from "../../utils/formatDuration";
import { MdScubaDiving } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import SectionBar from "./SectionBar";

const CourseContent = ({ content, isEnrolled = false }) => {
  const subSectionsLength = () =>
    content?.reduce((acc, section) => acc + section?.subSections.length, 0);
  const totalLecturesLength = () => {
    const lengthInSeconds = content?.reduce(
      (acc, section) =>
        acc +
        section?.subSections.reduce(
          (acc, subSection) => acc + subSection?.timeDuration,
          0
        ),
      0
    );
    const length = formatDuration(lengthInSeconds);
    return length;
  };
  const sectionLegth = (section) => {
    const seconds = section?.subSections?.reduce(
      (acc, subSection) => acc + subSection?.timeDuration,
      0
    );
    const length = formatDuration(seconds);
  };
  const length = totalLecturesLength();
  const totalLectures = subSectionsLength();

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h3 className="text-richblack-5 text-2xl font-semibold">
          Course Content
        </h3>
        <p className="text-sm text-richblack-50 flex items-center">
          {content?.length} section(s)
          <LuDot className="text-2xl" />
          {totalLectures} lecture(s) <LuDot className="text-2xl" />
          {length?.hours == 0
            ? `${length?.minutes}m : ${length?.seconds}s`
            : `${length?.hours}h : ${length?.minutes}m`}{" "}
          total length
        </p>

        {/* Preview Banner for Non-Enrolled Students */}
        {!isEnrolled && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 text-richblack-900 p-4 rounded-md flex items-center gap-3">
            <FaLock className="text-xl text-yellow-700" />
            <div>
              <p className="font-semibold text-base">Course Preview Mode</p>
              <p className="text-sm">
                This is a preview showing {totalLectures} lectures. Purchase this course to unlock all content and start learning.
              </p>
            </div>
          </div>
        )}

        <div>
          {content?.map((section) => (
            <SectionBar 
              key={section._id}
              section={section} 
              isEnrolled={isEnrolled}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default CourseContent;
