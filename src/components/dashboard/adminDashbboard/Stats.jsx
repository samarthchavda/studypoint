import React from "react";

const Stats = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 glass py-4 px-6 rounded-lg">
      <div className="text-center">
        <p className="text-3xl font-semibold text-richblack-50">
          {data?.totalStudents || 0}
        </p>
        <p className="text-richblack-300 font-medium">Students</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-semibold text-richblack-50">
          {data?.totalInstructors || 0}
        </p>
        <p className="text-richblack-300 font-medium">Instructors</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-semibold text-richblack-50">
          {data?.totalCourses || 0}
        </p>
        <p className="text-richblack-300 font-medium">Courses</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-semibold text-richblack-50">
          {data?.totalCategories || 0}
        </p>
        <p className="text-richblack-300 font-medium">Categories</p>
      </div>
    </div>
  );
};

export default Stats;
