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
    <div className="border-[1px] border-neutral-200 mb-2 rounded-lg overflow-hidden">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer justify-between 
          bg-neutral-50 px-8 py-4 hover:bg-neutral-100 transition-colors"
      >
        <div className="flex items-center gap-1">
          <span>
            <MdKeyboardArrowDown 
              className="text-neutral-700 text-xl transition-transform duration-200"
              style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
            />
          </span>
          <h4 className="text-sm text-neutral-800 font-semibold">
            {section?.name}
          </h4>
        </div>
        <p className="flex items-center gap-2">
          <span className="text-primary-600 block text-sm font-medium">
            {section?.subSections?.length} lectures
          </span>
          <span className="text-neutral-600 block text-sm">
            {length?.hours > 0 ? `${length?.hours}h` : 
             length?.minutes > 0 ? `${length?.minutes}m` : 
             `${length?.seconds}s`}
          </span>
        </p>
      </div>
      
      {isOpen && (
        <div className="bg-white border-t border-neutral-200">
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