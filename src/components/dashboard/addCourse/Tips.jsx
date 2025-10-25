import React from 'react';
import { BsDot } from "react-icons/bs";
const courseInstructions = [
    { instruction: "Set the Course Price option or make it free." },
    { instruction: "Standard size for the course thumbnail is 1024x576." },
    { instruction: "Video section controls the course overview video." },
    { instruction: "Course Builder is where you create & organize a course." },
    { instruction: "Add Topics in the Course Builder section to create lessons, quizzes, and assignment." },
    { instruction: "Information from the Additional Data section shows up on the course single page." },
    { instruction: "Make Announcements to notify any important Notes to all enrolled students at once." }
];
const Tips = () => {
    return (
        <div className='bg-[#161D29] p-7 max-w-[384px] flex flex-col items-start gap-5 h-fit  border border-richblack-700 rounded-lg mt-5'>
            <h2 className='text-richblack-5  font-semibold'>⚡Course Upload Tips</h2>
            <ul className='text-richblack-5 flex flex-col gap-3 w-full'>
                {
                    courseInstructions.map((item, index) => (
                        <li key={index} className="flex">
                            <BsDot className='w-5 h-5'/>
                            <p className="text-xs font-medium text-richblack-5 w-full">{item.instruction}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Tips;
