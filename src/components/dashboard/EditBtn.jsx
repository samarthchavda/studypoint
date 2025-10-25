import React from 'react';
import { FaRegEdit } from "react-icons/fa";
const EditBtn = ({clickHandler}) => {
    return (
        <button onClick={clickHandler} className='text-[#000814] bg-[#FFD60A] items-center px-4 py-[6px] rounded-lg flex gap-2'>
            <FaRegEdit className=''/>
            <p className='font-medium'>Edit</p>
        </button>
    );
}

export default EditBtn;
