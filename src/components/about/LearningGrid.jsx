import React from "react";
import HighlightedText from "../home/HighlightedText";
import CustomButton from "../home/CustomButton";
const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "You will get a certificate that can be used as a certification during job hunting.",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid grid-cols-2 max-w-maxContent sm:grid-cols-3 lg:grid-cols-4 w-11/12 mx-auto py-20">
        {
        
            LearningGridArray.map((item,index)=>{
                return item.order<0 
                ?(<div key={index} className="col-span-2 flex flex-col gap-5   justify-between sm:mr-10 mb-10">
                    <div className="flex flex-col gap-3 ">
                        <h1 className="text-[#F1F2FF] text-4xl  font-semibold">{item.heading} <HighlightedText text={item.highlightText}/></h1>
                        <p className="font-medium  text-[#838894]">{item.description}</p>
                    </div>
                    <CustomButton active={true} linkTo={item.BtnLink}>{item.BtnText }</CustomButton>
                </div>)
                :(<div key={index} className={`${item.order%2==1?"bg-[#2C333F]":"bg-[#161D29]"}
                 ${item.order===3&&"col-start-2"} flex flex-col gap-8 p-8 h-[294px]`}>
                    <h3 className="text-[#F1F2FF] font-semibold">{item.heading}</h3>
                    <p className="text-[#AFB2BF] text-sm">{item.description}</p>
                </div>)
            })

        }
    </div>
  );
};

export default LearningGrid;
