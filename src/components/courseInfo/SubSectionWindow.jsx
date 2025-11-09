import React, { useState } from "react";
import formatDuration from "../../utils/formatDuration";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { FaLock } from "react-icons/fa";

const SubSectionWindow = ({ subSections, isEnrolled = false, showFirstFree = true }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const openVideoPreview = (videoUrl) => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-col py-4 px-8">
      {subSections?.map((subSection, index) => {
        const length = formatDuration(subSection?.timeDuration);
        const isExpanded = expandedSections[subSection._id];
        const isFreePreview = showFirstFree && index === 0; // First video is free preview
        const isLocked = !isEnrolled && !isFreePreview;

        return (
          <div 
            key={subSection._id}
            className="border-b border-richblack-600 last:border-none"
          >
            <div
              onClick={() => !isLocked && setExpandedSections(prev => ({
                ...prev,
                [subSection._id]: !prev[subSection._id]
              }))}
              className={`flex items-center justify-between ${!isLocked ? 'cursor-pointer hover:bg-richblack-700' : 'cursor-not-allowed opacity-70'} py-2 rounded-lg px-4`}
            >
              <div className="flex items-center gap-2">
                {isLocked ? (
                  <FaLock className="text-richblack-400" />
                ) : (
                  <HiOutlineVideoCamera className="text-richblack-50" />
                )}
                <p className="text-sm text-richblack-50 flex items-center gap-2">
                  {subSection?.title}
                  {isFreePreview && (
                    <span className="bg-yellow-50 text-richblack-900 px-2 py-0.5 rounded text-xs font-semibold">
                      FREE PREVIEW
                    </span>
                  )}
                  {isLocked && (
                    <span className="text-richblack-400 text-xs italic">
                      (Locked - Buy to unlock)
                    </span>
                  )}
                </p>
                {!isLocked && (
                  <MdKeyboardArrowDown 
                    className="text-richblack-50 text-xl"
                    style={{ transform: `rotate(${isExpanded ? 180 : 0}deg)` }}
                  />
                )}
              </div>
              <span className="text-richblack-25 text-sm">
                {length?.hours > 0 ? `${length?.hours}h` : 
                 length?.minutes > 0 ? `${length?.minutes}m` : 
                 `${length?.seconds}s`}
              </span>
            </div>
            
            {isExpanded && !isLocked && (
              <div className="pl-[2.5rem] pb-3 flex flex-col gap-3">
                <p className="text-sm text-richblack-50">
                  {subSection?.description}
                </p>
                {isFreePreview && subSection?.videoUrl && (
                  <button
                    onClick={() => openVideoPreview(subSection.videoUrl)}
                    className="bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 w-fit transition-all duration-200 transform hover:scale-105"
                  >
                    <HiOutlineVideoCamera className="text-lg" />
                    Watch Free Preview
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SubSectionWindow;