import { React, useState } from "react";
import formatDuration from "../../utils/formatDuration";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import SubSectionWindowViewCourse from "./SubSectionWindowViewCourse";
import { useParams } from "react-router-dom";
const SectionBarViewCourse = ({ section }) => {
    const sectionId=useParams().sectionId;
  const [arrowUp, setArrowUp] = useState(section?._id===sectionId);
  const toggleArrow = () => {
    if (arrowUp) setArrowUp(false);
    else setArrowUp(true);
  };
  const lecturesLength = () => {
    const seconds = section?.subSections?.reduce(
      (acc, subSection) => acc + subSection?.timeDuration,
      0
    );
    const length = formatDuration(seconds);
    return length;
  };
  const length = lecturesLength();

  return (
    <details sectionid={sectionId} open={section._id===sectionId} className="">
      <summary
        className="text-sm px-6 py-4  flex bg-richblack-700 border-[1px] border-richblack-600  cursor-pointer justify-between"
        onClick={toggleArrow}
      >
        <h2 className="text-richblack-5 font-semibold">{section?.name}</h2>
        <div className="flex items-center gap-1">
          <div className="text-richblack-25 text-sm">
            {length?.hours == 0
              ? length.minutes == 0
                ? `${length?.seconds}s`
                : `${length?.minutes}m`
              : `${length?.hours}h`}
          </div>

          {arrowUp ? (
            <MdKeyboardArrowUp className="text-richblack-200 text-xl" />
          ) : (
            <MdKeyboardArrowDown className="text-richblack-200 text-xl" />
          )}
        </div>
      </summary>

      <SubSectionWindowViewCourse subSections={section?.subSections} />
    </details>
  );
};

export default SectionBarViewCourse;
