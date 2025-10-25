import React from "react";
import { Link } from "react-router-dom";

const Courses = ({ courses }) => {
  return (
    <div className="flex flex-col bg-richblack-800 rounded-lg px-6 py-4 gap-3">
      <h3 className="flex justify-between text-richblack-5 font-semibold">
        Your Courses{" "}
        <Link className="text-yellow-50" to={`/dashboard/my-courses`}>
          <span>ViewAll</span>
        </Link>
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {courses.map((course, index) => {
          if (index > 2) return null;
          return (
            <div className="flex flex-col gap-3">
              <img src={course.thumbnail} alt="course thumbnail" />
              <div>
                <p className="text-richblack-50 font-semibold">{course.name}</p>
                <p className="text-richblack-300 font-medium text-sm">
                  {course.noOfStudents} students | Rs. {course.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
