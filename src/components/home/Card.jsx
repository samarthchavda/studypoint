import React from 'react';
import { FaUserGroup,FaBookOpen } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Card = ({content,currentCard,setCurrentCard}) => {
    let thisCard=currentCard===content.heading;
    const navigate = useNavigate();
    
    // Free course IDs by card heading (after splitting into HTML, CSS, Bootstrap)
    const FREE_COURSE_IDS = {
        "Learn HTML": "68fc9bda58a0f5a4bc74daeb",
        "Learn CSS": "68fca2c139ff6d15c8c1c51e",
        "Responsive Web design": "68fca2c139ff6d15c8c1c523",
        "Responsive Web Design": "68fca2c139ff6d15c8c1c523",
    };
    
    const handleCardClick = () => {
        setCurrentCard(content.heading);
        
        // If it's one of the free courses (Learn HTML, Learn CSS, Responsive Web design), redirect to its specific course
        const courseId = FREE_COURSE_IDS[content.heading];
        if (courseId) navigate(`/course/${courseId}`);
    };
    
    return (
        <div className={`${thisCard?'bg-white shadow-[10px_10px_#FFD60A]':'bg-richblack-800'} 
                        transition-all cursor-pointer duration-200 py-6 px-6 flex flex-col justify-between h-[290px] w-[330px]`}
         onClick={handleCardClick}>
            <div className='flex flex-col gap-3'>
                <h5 className={`${thisCard?'text-richblack-800':'text-richblack-5'} text-xl font-semibold`}>{content.heading}</h5>
                <p className={`${thisCard?'text-richblack-500':'text-richblack-400'}`}>{content.description}</p>
            </div>
            <div className={`${thisCard? 'text-blue-500': 'text-richblack-300'}
            font-medium flex justify-between border-t-[1.4px] pt-3 border-dashed border-richblack-600`}>
                <div className='flex items-center gap-2'>
                <FaUserGroup />
                    {content.level}
                </div>
                <div className='flex items-center gap-2'>
                <FaBookOpen />
                    {content.lessionNumber} Lessons
                </div>
            </div>
        </div>
    );
}

export default Card;
