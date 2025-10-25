import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
const StepDots = () => {
  const step = useSelector((state) => state.course.step);
  const stages = [
    { id: 1, name: "Course Information" },
    { id: 2, name: "Course Builder" },
    { id: 3, name: "Publish" },
  ];
  return (
    <div className="grid grid-cols-3 text-center w-full ml-6 py-6 mt-6`">
      {stages.map((item, index) => {
            return (
              <div className="flex relative flex-col items-center gap-1" key={index}>
              <div className={` absolute w-[50%] left-0 top-4
                 ${item.id!=1 ? item.id<=step  ? 'border border-dashed border-[#FFD60A]' : 'border border-dashed border-[#424854]' : ''}`}></div>
              {step>item.id && <FaCheck className="bg-[#FFD60A] z-10 relative w-[34px] p-2 rounded-full h-[34px]"/>}  
              {step<=item.id && <div className={`${step===item.id? 'bg-[#251400]' : 'bg-[#161D29]'} flex justify-center items-center  
                border-[1px] ${step===item.id? 'border-[#FFD60A]' : 'border-[#2C333F]'} ${step===item.id? 'text-[#FFD60A] font-semibold' : 'text-[#838894]'} 
                relative z-20 rounded-full w-[34px] h-[34px]`}>
              {item.id}
            </div> }  
            <div className={` absolute w-[50%] right-0 top-4 
              ${item.id!=3 ? item.id<step  ? 'border border-dashed border-[#FFD60A]' : 'border border-dashed border-[#424854]' : ''}`}></div>
            <p className="text-richblack-5 font-medium text-sm">{item.name}</p>
            </div>
          );
      })}
    </div>
  );
};

export default StepDots;
