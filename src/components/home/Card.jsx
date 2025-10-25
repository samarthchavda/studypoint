import React from 'react';
import { FaUserGroup,FaBookOpen } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Card = ({content,currentCard,setCurrentCard}) => {
    let thisCard=currentCard===content.heading;
    const navigate = useNavigate();
    
    // Free course ID from database
    const FREE_COURSE_ID = "68fc96e678a283e996c3415b";
    
    const handleCardClick = () => {
        setCurrentCard(content.heading);
        
        // If it's one of the free courses (Learn HTML, Learn CSS, Responsive Web design), redirect to the course
        const freeCourses = ["Learn HTML", "Learn CSS", "Responsive Web design"];
        if (freeCourses.includes(content.heading)) {
            navigate(`/courses/${FREE_COURSE_ID}`);
        }
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
