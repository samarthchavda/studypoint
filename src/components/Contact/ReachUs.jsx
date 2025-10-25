import React from "react";
import { IoCall,IoChatbubblesSharp } from "react-icons/io5";
import { FaEarthAfrica } from "react-icons/fa6";
const data = [
  {
    title: "Chat on us",
    description: "Our friendly team is here to help.",
    contact: "contact.studynotion@studynotion.in",
  },
  {
    title: "Visit us",
    description: "Come and say hello at our office HQ.",
    contact: "Here is the location/ address",
  },
  {
    title: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    contact: "+123 456 7890",
  },
];

const ReachUs = () => {
  return ( 
    <div className="flex p-8 lg:w-[35%] rounded-xl flex-col h-fit bg-richblack-800 gap-8 ">
      <div className="flex  gap-2 ">
      <IoChatbubblesSharp className="text-xl text-richblack-100"/>
        <div className="flex flex-col gap-[2px]">
        <h3 className="text-richblack-5 font-semibold">{data[0].title}</h3>
        <p className="text-sm text-richblack-200 font-medium">{data[0].description}</p>
        <a className="text-sm text-richblack-200 font-medium" href={`mailto:${data[0].contact}`}>{data[0].contact}</a>
        </div>
      </div>

      <div className="flex  gap-2 ">
      <FaEarthAfrica className="text-xl text-richblack-100"/>
        <div className="flex flex-col gap-[2px]">
        <h3 className="text-richblack-5 font-semibold">{data[1].title}</h3>
        <p className="text-sm text-richblack-200 font-medium">{data[1].description}</p>
        <a className="text-sm text-richblack-200 font-medium" href={`mailto:${data[1].contact}`}>{data[1].contact}</a>
        </div>
      </div>

      <div className="flex  gap-2 ">
      <IoCall className="text-xl text-richblack-100"/>
        <div className="flex flex-col gap-[2px]">
        <h3 className="text-richblack-5 font-semibold">{data[2].title}</h3>
        <p className="text-sm text-richblack-200 font-medium">{data[2].description}</p>
        <a className="text-sm text-richblack-200 font-medium" href={`mailto:${data[2].contact}`}>{data[2].contact}</a>
        </div>
      </div>
    </div>
  );
};

export default ReachUs;
