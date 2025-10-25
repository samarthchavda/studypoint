import React, { useState } from "react";
import formatDuration from "../../utils/formatDuration";
import SubSectionWindow from "./SubSectionWindow";
import { MdKeyboardArrowDown } from "react-icons/md";

const SectionBar = ({ section, isEnrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const lecturesLength = () => {
    const seconds = section?.subSections?.reduce(
      (acc, subSection) => acc + subSection?.timeDuration,
      0
    );
    return formatDuration(seconds);
  };

  const length = lecturesLength();

  return (
    <div className="border-[1px] border-richblack-600 mb-2">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer justify-between 
          bg-richblack-700 px-8 py-4 hover:bg-richblack-600"
      >
        <div className="flex items-center gap-1">
          <span>
            <MdKeyboardArrowDown 
              className="text-richblack-50 text-xl"
              style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
            />
          </span>
          <h4 className="text-sm text-richblack-5 font-medium">
            {section?.name}
          </h4>
        </div>
        <p className="flex items-center gap-2">
          <span className="text-yellow-50 block text-sm">
            {section?.subSections?.length} lectures
          </span>
          <span className="text-richblack-25 block text-sm">
            {length?.hours > 0 ? `${length?.hours}h` : 
             length?.minutes > 0 ? `${length?.minutes}m` : 
             `${length?.seconds}s`}
          </span>
        </p>
      </div>
      
      {isOpen && (
        <div className="bg-richblack-900">
          <SubSectionWindow 
            subSections={section?.subSections}
            isEnrolled={isEnrolled}
          />
        </div>
      )}
    </div>
  );
};

export default SectionBar;