import React from 'react';

const Label = ({text,required,forwhat}) => {
    return (
        <label className='text-sm text-neutral-800 font-medium cursor-pointer' htmlFor={forwhat}>
            {text}
            {
                required&&<span className='text-red-500 text-sm ml-1'>*</span>
            }
            
            </label>
    );
}

export default Label;
