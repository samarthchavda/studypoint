import React from 'react';
import HighlightedText from '../home/HighlightedText';
import BluredSphere from '../comman/BluredSphere';
import foundingImg from '../../assets/Images/FoundingStory.png'
const FoundingGrid = () => {
    return (
        <div className="grid justify-items-start sm:justify-items-center grid-cols-1 lg:grid-cols-2 gap-y-24 lg:gap-y-32 gap-x-32 ">
            <div className="flex flex-col gap-7">
              <h2><HighlightedText text={"Our Founding Story"} color1="#833AB4" color2="#FD1D1D" color3="#FCB045"/></h2>
              <div className="flex flex-col gap-4">
              <p className="text-[#838894] font-medium ">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
              <p className="text-[#838894] font-medium">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
              </div>
            </div>

            <div className="self-center relative">
            <BluredSphere color1={"#EC008C"} color2={"#EC008C"} height={"150px"} top={"30px"} left={"40px"}/>
              <img src={foundingImg} className="z-10 relative h-[255px] w-[450px]" alt="Our Founding Story" />
            </div>

            <div className="flex flex-col gap-7">
            <h2><HighlightedText text={"Our Vision"} color1="#E65C00" color2="#F9D423" color3="#F9D423"/></h2>
            <p className="text-[#838894] font-medium">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>

            <div className="flex flex-col gap-7">
            <h2><HighlightedText text={"Our Mission"}/></h2>
            <p className="text-[#838894] font-medium">our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>
        </div>
    );
}

export default FoundingGrid;
