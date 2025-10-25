import {React,useEffect,useState} from "react";
import CourseCard from "./CourseCard";

const GridCourses = ({ courses }) => { 
     const [width,setWidth]=useState(window.innerWidth);
      useEffect(()=>{
        const handleResize=()=>{
          setWidth(window.innerWidth);
        }
        window.addEventListener('resize',handleResize);
        return ()=>{
          window.removeEventListener('resize',handleResize);
        }
      },[]);
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-richblack-5 text-3xl font-semibold">
        Frequently bought together
      </h2>
      {!courses || courses?.length<=0 ? (
        <p className="text-red-500 relative -top-5 font-semibold text-3xl">
          No courses found here
        </p>
      ) : (
        <div className={`grid ${width > 766 ? "grid-cols-2" : "grid-cols-1"} gap-y-3 gap-x-10 `}>
          {courses?.map((item, index) => (
            <CourseCard allowWidth={true} info={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GridCourses;
