import React, { useEffect, useState } from 'react';
import { BsExclamationCircle } from "react-icons/bs";
import { IoIosGlobe } from "react-icons/io";

import Stars from "../comman/Stars";
import avgRating from '../../utils/avgRating';
const CourseIntro = ({course}) => {
  const [averageRating,setAverageRating]=useState(0);
  useEffect(()=>{
    console.log(course);
    const avgRat=avgRating(course?.ratingAndReviews);
    setAverageRating(avgRat);
  },[course]);
    return (
        <div className='border-r-[1px] flex flex-col gap-3 border-richblack-700'>
            <h1 className="text-richblack-5 font-medium text-3xl">
                  {course?.name || course?.courseName}
                </h1>
                <p className="text-richblack-200 text-sm">
                  {course?.description || course?.courseDescription}
                </p>
                <div className="flex gap-2 items-center flex-wrap">
                  <Stars rating={averageRating} />
                  <p className="text-richblack-25">
                    ({course?.ratingAndReviews?.length || 0} Reviews)
                  </p>
                  <span className="text-richblack-400">•</span>
                  <p className="text-richblack-25">
                    {course?.studentsEnrolled?.length || 0} Students Enrolled
                  </p>
                </div>
                <p className="text-richblack-25">
                  Created by {course?.instructor?.firstName}{" "}
                  {course?.instructor?.lastName}
                </p>
                <div className='flex gap-4 items-center flex-wrap'>
                  <p className="text-richblack-25 flex gap-2 items-center">
                    <BsExclamationCircle />
                    Created {new Date(course?.createdAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                  <p className='flex gap-1 text-richblack-25 items-center'>
                    <IoIosGlobe /> English
                  </p>
                  {course?.category && (
                    <span className="bg-yellow-50 text-richblack-900 px-3 py-1 rounded-full text-xs font-semibold">
                      {course.category.name}
                    </span>
                  )}
                </div>
        </div>  
    );
}

export default CourseIntro;
