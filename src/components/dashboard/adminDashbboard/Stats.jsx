import React from "react";

const Stats = ({ data }) => {
  return (
    <div className="flex glass py-3 justify-around text-center rounded-lg h-full ">
      <div>
        <p className="text-3xl font-semibold text-richblack-50">
          {data?.enrolledStudents}
        </p>
        <p className="text-richblack-300 font-medium">Enrolled Students</p>
      </div>
      <div>
        <p className="text-3xl font-semibold text-richblack-50">
          {data?.instructors}
        </p>
        <p className="text-richblack-300 font-medium">Instructors</p>
      </div>
      <div>
        <p className="text-3xl font-semibold text-richblack-50">
          {data?.totalUsers}
        </p>
        <p className="text-richblack-300 font-medium">Registered Users</p>
      </div>
    </div>
  );
};

export default Stats;
