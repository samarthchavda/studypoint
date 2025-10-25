import React from 'react';

const CancelBtn = ({reset}) => {
    return (
        <p onClick={()=>reset()}
          className="bg-richblack-600 hover:border-[1px] hover:cursor-pointer  text-richblack-5 self-end rounded-lg font-medium py-[6px] px-[18px]"
        >
          Cancel
        </p>  
    );
}

export default CancelBtn;
