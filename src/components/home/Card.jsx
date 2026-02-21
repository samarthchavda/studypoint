import React from 'react';
import { FaUserGroup,FaBookOpen } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Card = ({content,currentCard,setCurrentCard}) => {
    let thisCard=currentCard===content.heading;
    const navigate = useNavigate();
    
    // Course IDs and thumbnails by card heading
    const COURSE_DATA = {
        // Free courses (Price: ₹0)
        "Learn HTML": {
            id: "68fc9bda58a0f5a4bc74daeb",
            thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop"
        },
        "Learn CSS": {
            id: "68fca2c139ff6d15c8c1c51e",
            thumbnail: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=400&h=250&fit=crop"
        },
        "Bootstrap learning": {
            id: "68fca2c139ff6d15c8c1c523",
            thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=250&fit=crop"
        },
        
        // Paid courses from catalog
        "Complete Web Development Bootcamp": {
            id: "69104cef80c2310b8367fe21",
            thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"
        },
        "React JS - The Complete Guide": {
            id: "69104d0b302470b208cae4b4",
            thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
        },
        "Flutter & Dart - Complete Guide": {
            id: "69104d0b302470b208cae4f6",
            thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop"
        },
        "React Native - Build Mobile Apps": {
            id: "69104d0b302470b208cae50c",
            thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop"
        },
        "Data Science Masterclass": {
            id: "69104d0b302470b208cae4ca",
            thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop"
        },
        "Machine Learning A-Z": {
            id: "69104d0b302470b208cae4e0",
            thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop"
        },
        // New to coding courses
        "HTML": {
            thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop"
        },
        "CSS": {
            thumbnail: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=400&h=250&fit=crop"
        },
        "Responsive": {
            thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=250&fit=crop"
        },
    };
    
    const handleCardClick = () => {
        setCurrentCard(content.heading);
        
        // If it's a mapped course, redirect to its course detail page
        const courseData = COURSE_DATA[content.heading];
        if (courseData?.id) {
            navigate(`/course/${courseData.id}`);
        }
    };
    
    const courseData = COURSE_DATA[content.heading];
    
    return (
        <div className={`${thisCard?'bg-white shadow-[10px_10px_#FFD60A]':'bg-richblack-800'} 
                        transition-all cursor-pointer duration-200 flex flex-col overflow-hidden h-[350px] w-[330px] rounded-lg`}
         onClick={handleCardClick}>
            {/* Course Thumbnail */}
            {courseData?.thumbnail && (
                <div className="w-full h-[150px] overflow-hidden">
                    <img 
                        src={courseData.thumbnail} 
                        alt={content.heading}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x250/1F2937/FFFFFF?text=' + encodeURIComponent(content.heading);
                        }}
                    />
                </div>
            )}
            
            {/* Course Content */}
            <div className="py-6 px-6 flex flex-col justify-between flex-1">
                <div className='flex flex-col gap-3'>
                    <h5 className={`${thisCard?'text-richblack-800':'text-richblack-5'} text-xl font-semibold`}>
                        {content.heading}
                    </h5>
                    <p className={`${thisCard?'text-richblack-500':'text-richblack-400'} text-sm line-clamp-2`}>
                        {content.description}
                    </p>
                </div>
                <div className={`${thisCard? 'text-blue-500': 'text-richblack-300'}
                font-medium flex justify-between border-t-[1.4px] pt-3 border-dashed border-richblack-600`}>
                    <div className='flex items-center gap-2 text-sm'>
                        <FaUserGroup />
                        {content.level}
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <FaBookOpen />
                        {content.lessionNumber} Lessons
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
