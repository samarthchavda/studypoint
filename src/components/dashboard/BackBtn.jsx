import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackBtn = () => {
    const navigate=useNavigate();
    return (
        <p onClick={()=>navigate(-1)} className='text-sm text-richblack-300'>back</p>
    );
}

export default BackBtn;
