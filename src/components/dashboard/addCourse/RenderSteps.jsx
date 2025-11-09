import React from "react";
import CourseInformation from "./CourseInformation";
import Tips from "./Tips";

const RenderSteps = () => {
  return (
    <div className="flex pb-3 md:pb-5 md:flex-row flex-col-reverse gap-5 mt-8 md:mt-10 px-4 md:px-6">
      <div className="min-w-[70%] pr-3 md:pr-0 md:min-w-[60%]">
        {/* Single step - direct course creation */}
        <CourseInformation />
      </div>
      <div className="px-3 md:px-0">
        <Tips />
      </div>
    </div>
  );
};

export default RenderSteps;
