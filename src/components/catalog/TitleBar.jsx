import React from 'react';
import LocationBar from '../dashboard/LocationBar';

const TitleBar = ({para}) => {
    return (
        <div className=' bg-richblack-800'>
        <div className='flex flex-col gap-3 py-8 max-w-maxContent w-11/12 mx-auto '>
            <LocationBar/>
            <p className='text-richblack-200 text-sm'>{para}</p>
        </div>  
        </div>
    );
}

export default TitleBar;    
