import React from 'react';

const ShowInfo = ({label,info,text}) => {
    return (
        <div className='flex flex-col gap-[2px]'>
            <p className='text-sm text-richblack-600'>{label}</p>
            <p className='text-richblack-5 text-sm font-medium'>{info?info:text}</p>
        </div>
    );
}

export default ShowInfo;
