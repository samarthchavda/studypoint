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
        <div className='md:border-r-[1px] flex flex-col gap-3 border-neutral-200 md:pr-6'>
            <h1 className="text-neutral-800 font-medium text-3xl">
                  {course?.name || course?.courseName}
                </h1>
                <p className="text-neutral-700 text-sm leading-relaxed">
                  {course?.description || course?.courseDescription}
                </p>
                <div className="flex gap-2 items-center flex-wrap">
                  <Stars rating={averageRating} />
                  <p className="text-neutral-700 font-medium">
                    ({course?.ratingAndReviews?.length || 0} Reviews)
                  </p>
                  <span className="text-neutral-400">•</span>
                  <p className="text-neutral-700 font-medium">
                    {course?.studentsEnrolled?.length || 0} Students Enrolled
                  </p>
                </div>
                <p className="text-neutral-700 font-medium">
                  Created by {course?.instructor?.firstName}{" "}
                  {course?.instructor?.lastName}
                </p>
                <div className='flex gap-4 items-center flex-wrap'>
                  <p className="text-neutral-600 flex gap-2 items-center text-sm">
                    <BsExclamationCircle />
                    Created {new Date(course?.createdAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                  <p className='flex gap-1 text-neutral-600 items-center text-sm'>
                    <IoIosGlobe /> English
                  </p>
                  {course?.category && (
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {course.category.name}
                    </span>
                  )}
                </div>
        </div>  
    );
}

export default CourseIntro;
