import React from 'react';
import LocationBar from '../../components/dashboard/LocationBar';
import EnrolledCoursesTable from '../../components/dashboard/enrolledCourses/EnrolledCoursesTable';
const EnrolledCourses = () => {
    return (
        <div className='w-full flex flex-col gap-5 sm:pl-6 pl-2 pr-2 sm:pr-0 pt-6 h-full'>
            <LocationBar/>
            <EnrolledCoursesTable/>
        </div>
    );
}

export default EnrolledCourses;
