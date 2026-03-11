import React from 'react';
import LocationBar from '../dashboard/LocationBar';

const TitleBar = ({para}) => {
    return (
        <div className='bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-neutral-200'>
        <div className='flex flex-col gap-3 py-8 max-w-maxContent w-11/12 mx-auto '>
            <LocationBar/>
            <p className='text-neutral-700 text-sm font-medium'>{para}</p>
        </div>  
        </div>
    );
}

export default TitleBar;    
