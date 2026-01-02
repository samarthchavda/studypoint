import React from 'react';
import { FaUserGroup,FaBookOpen } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Card = ({content,currentCard,setCurrentCard}) => {
    let thisCard=currentCard===content.heading;
    const navigate = useNavigate();
    
    // Course IDs by card heading (free + catalog courses)
    const COURSE_IDS = {
        // Free courses (Price: ₹0) - UPDATED WITH ACTUAL DATABASE IDs
        "Learn HTML": "68fc9bda58a0f5a4bc74daeb",
        "Learn CSS": "68fca2c139ff6d15c8c1c51e",
        "Bootstrap learning": "68fca2c139ff6d15c8c1c523",
        
        // Paid courses from catalog
        "Complete Web Development Bootcamp": "69104cef80c2310b8367fe21",
        "React JS - The Complete Guide": "69104d0b302470b208cae4b4",
        "Flutter & Dart - Complete Guide": "69104d0b302470b208cae4f6",
        "React Native - Build Mobile Apps": "69104d0b302470b208cae50c",
        "Data Science Masterclass": "69104d0b302470b208cae4ca",
        "Machine Learning A-Z": "69104d0b302470b208cae4e0",
    };
    
    const handleCardClick = () => {
        setCurrentCard(content.heading);
        
        // If it's a mapped course, redirect to its course detail page
        const courseId = COURSE_IDS[content.heading];
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
