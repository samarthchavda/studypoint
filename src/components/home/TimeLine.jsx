import React from "react";
import logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../assets/Images/TimelineImage.png";
const data = [
  {
    logo: logo1,
    p1: "Leadership",
    p2: "Fully commmited to success company",
  },
  {
    logo: logo2,
    p1: "Responsibility",
    p2: "Students will always be our top priority",
  },
  {
    logo: logo3,
    p1: "Flexibility",
    p2: "The ability to switch is an important skills",
  },
  {
    logo: logo4,
    p1: "Solve the problem",
    p2: "Code your way to a solution",
  },
];
const TimeLine = () => {
  return (
    <div className="w-11/12 flex flex-col items-start sm:items-center lg:flex-row sm:justify-center gap-20 mx-auto  pb-14">
      <div className="flex flex-col w-[45%] h-fit">
        {data.map((item, index) => {
          return (
            <div key={index}>
              <div
                className="flex flex-row gap-8 items-center text-richblack-700"
              >
                <div className="">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <img src={item.logo} alt="" className="" />
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-[18px] font-semibold">{item.p1}</p>
                  <p className="text-[14px] font-normal">{item.p2}</p>
                </div>
              </div>
              {index < 3 ? (
                <div className="relative left-8 flex flex-col gap-1">
                  <div className="h-1 w-1 bg-richblack-25 rounded-full"></div>
                  <div className="h-1 w-1 bg-richblack-25 rounded-full"></div>
                  <div className="h-1 w-1 bg-richblack-25 rounded-full"></div>
                  <div className="h-1 w-1 bg-richblack-25 rounded-full"></div>
                  <div className="h-1 w-1 bg-richblack-25 rounded-full"></div>
                  <div className="h-1 w-1 bg-richblack-25 rounded-full"></div>
                </div>
              ) : (
                " "
              )}
            </div>
          );
        })}
      </div>

      <div className="h-fit object-cover relative">
        <div className="z-10 relative">
          <img
            src={timeLineImage}
            className="border-r-[15px] border-b-[15px]  border-white"
            alt=""
          />
        </div>
        <div className="absolute h-full w-[calc(100%+10px)] top-[1%] left-[-1%] opacity-60 blur-lg rounded-full bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4]"></div>
        <div className="absolute z-20 flex flex-col sm:flex-row gap-9 bg-[#014A32] -bottom-10 left-1 lg:left-[5.5rem] sm:left-[5.5rem] py-9 px-12">
            <div className=" flex flex-col sm:flex-row items-center  gap-5 "> 
                <p className="text-4xl font-[700] text-white">10</p>
                <div className="text-sm text-[#05A77B]"> 
                <p className="text-center sm:text-start">Years</p>
                <p className="text-center sm:text-start">Experiencs</p>
                </div>
            </div>
            <div className="bg-[#037957] h-[1.7px] w-[full] sm:h-[50px] sm:w-[1.7px]"></div>
            <div className="flex flex-col sm:flex-row items-center  gap-5 ">
            <p className="text-4xl font-[700]  text-white">250</p>
            <div className="text-sm font-normal text-[#05A77B]">
            <p className="text-center sm:text-start">Types</p>
            <p className="text-center sm:text-start">of courses</p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
