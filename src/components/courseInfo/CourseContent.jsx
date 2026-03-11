import React from "react";
import { LuDot } from "react-icons/lu";
import formatDuration from "../../utils/formatDuration";
import { MdScubaDiving } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import SectionBar from "./SectionBar";

const CourseContent = ({ content, isEnrolled = false }) => {
  const courseContent = Array.isArray(content) ? content : [];

  const subSectionsLength = () =>
    courseContent.reduce(
      (acc, section) => acc + (Array.isArray(section?.subSections) ? section.subSections.length : 0),
      0
    );

  const totalLecturesLength = () => {
    const lengthInSeconds = courseContent.reduce(
      (acc, section) =>
        acc +
        (section?.subSections || []).reduce(
          (subAcc, subSection) => subAcc + (Number(subSection?.timeDuration) || 0),
          0
        ),
      0
    );
    const length = formatDuration(lengthInSeconds);
    return length;
  };
  const length = totalLecturesLength();
  const totalLectures = subSectionsLength();
  const durationText =
    length?.hours > 0
      ? `${length.hours}h : ${length.minutes}m`
      : `${length?.minutes || 0}m : ${length?.seconds || 0}s`;

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h3 className="text-neutral-800 text-2xl font-semibold">
          Course Content
        </h3>
        <p className="text-sm text-neutral-700 flex items-center font-medium">
          {courseContent.length} section(s)
          <LuDot className="text-2xl" />
          {totalLectures} lecture(s) <LuDot className="text-2xl" />
          {durationText} total length
        </p>

        {/* Preview Banner for Non-Enrolled Students */}
        {!isEnrolled && (
          <div className="bg-accent-50 border-l-4 border-accent-500 text-neutral-800 p-4 rounded-md flex items-center gap-3">
            <FaLock className="text-xl text-accent-600" />
            <div>
              <p className="font-semibold text-base">Course Preview Mode</p>
              <p className="text-sm text-neutral-700">
                This is a preview showing {totalLectures} lecture{totalLectures === 1 ? "" : "s"}. Purchase this course to unlock all content and start learning.
              </p>
            </div>
          </div>
        )}

        <div>
          {courseContent.map((section) => (
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
