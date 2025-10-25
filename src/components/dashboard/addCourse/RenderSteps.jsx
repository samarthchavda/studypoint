import React, { useEffect } from "react";
import StepDots from "./StepDots";
import CourseInformation from "./CourseInformation";
import Tips from "./Tips";
import CourseBuilder from "./CourseBuilder";
import { useSelector } from "react-redux";
import Publish from "./Publish";
import Spinner from "../../comman/Spinner";
const RenderSteps = () => {
  const step = useSelector((state) => state.course.step);
  return (
    <div className="flex pb-3 md:pb-5 md:flex-row flex-col-reverse gap-5">
      <div className="min-w-[70%] pr-3 md:pr-0 md:min-w-[60%]">
        <StepDots />
        {step === 1 && <CourseInformation />}
        {step === 2 && <CourseBuilder />}
        {step === 3 && <Publish />}
      </div>
      <div className="px-3 md:px-0">
        <Tips />
      </div>
    </div>
  );
};

export default RenderSteps;
