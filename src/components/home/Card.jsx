import React from 'react';
import { FaUserGroup,FaBookOpen } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Card = ({content,currentCard,setCurrentCard}) => {
    let thisCard=currentCard===content.heading;
    const navigate = useNavigate();
    
    // Course IDs by card heading (free + catalog courses)
    const COURSE_IDS = {
        // Free courses
        "Learn HTML": "68fc9bda58a0f5a4bc74daeb",
        "Learn CSS": "68fca2c139ff6d15c8c1c51e",
        "Responsive Web design": "68fca2c139ff6d15c8c1c523",
        "Responsive Web Design": "68fca2c139ff6d15c8c1c523",
        "Bootstrap learning": "68fca2c139ff6d15c8c1c523",
        // Catalog courses
        "Complete Web Development Bootcamp": "68fbab1e0031571debb0151b",
        "React JS - The Complete Guide": "68fbab396e480602bcb915e8",
        "Flutter & Dart - Complete Guide": "68fbab50d83bc0b27ce5d04c",
        "React Native - Build Mobile Apps": "68fbab50d83bc0b27ce5d057",
        "Data Science Masterclass": "68fbab50d83bc0b27ce5d062",
        "Machine Learning A-Z": "68fbab50d83bc0b27ce5d06d",
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
