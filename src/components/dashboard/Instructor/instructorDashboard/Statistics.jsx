import React from 'react';

const Statistics = ({courses}) => {
    const totalStudents = courses.reduce((acc, course) => acc + course.noOfStudents, 0);
    const totalIncome = courses.reduce((acc, course) => acc + course.courseIncome, 0);
    const totalCourses = courses.length;
    const labels=['Total Courses','Total Students', 'Total Income'];
    return (
        <div className='flex flex-col pb-3 md:pb-0  gap-3 pl-6 rounded-lg pt-4 pr-16 h-full bg-richblack-800'> 
            <h3 className="font-semibold text-richblack-5">Statistics</h3>
            <div>
                <p className='text-richblack-300 font-medium'>Total Courses</p>
                <p className="text-3xl font-semibold text-richblack-50">{totalCourses}</p>
            </div>
            <div>
                <p className='text-richblack-300 font-medium'>Total Students</p>
                <p className="text-3xl font-semibold text-richblack-50">{totalStudents}</p>
            </div>
            <div>
                <p className='text-richblack-300 font-medium'>Total Income</p>
                <p className="text-3xl font-semibold text-richblack-50">Rs. {totalIncome}</p>
            </div>
        </div>
    );
}

export default Statistics;
