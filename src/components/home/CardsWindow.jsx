import React from "react";
import { useState } from "react";
import { HomePageExplore } from "../../data/homepage-explore";
import HighlightedText from "./HighlightedText";
import Card from "./Card";
const CardsWindow = () => {
  const tabs = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(courses[0].heading);

  const ChangeTabHandler = (tab) => {
    setCurrentTab(tab);
    let result=HomePageExplore.filter((item) => item.tag === tab)[0];
    setCourses(result.courses);
    setCurrentCard(result.courses[0].heading);
  };
  return (  
    <div className="w-11/12 mx-auto flex flex-col items-center gap-10 relative pb-[760px] sm:pb-[900px] lg:pb-72">
      <div className="sm:text-center">
        <h3 className="text-[#F1F2FF] text-center font-semibold text-4xl">
          Unlock the <HighlightedText text={"Power of Code"} />
        </h3>
        <p className="capitalize text-center text-richblack-300">
          learn to build anything you can imagine
        </p>
      </div>

      <div className="flex flex-row gap-5 invisible sm:visible bg-richblack-800 px-2 py-2 rounded-3xl sm:rounded-full  w-fit">
        {tabs.map((tab, index) => {
          return (
            <button
              className={`${
                currentTab === tab
                  ? "bg-richblack-900 text-richblack-5 font-medium rounded-full"
                  : "text-richblack-100"
              } hover:bg-richblack-600 rounded-full px-6 py-2`}
              key={index}
              onClick={() => ChangeTabHandler(tab)}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col   lg:flex-row gap-8 absolute -bottom-16 sm:-bottom-[80px]">
            {
                courses.map((course,index)=>{
                    return (
                        <Card key={index} content={course} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                    )
                })
            }
      </div>
    </div>
  );
};

export default CardsWindow;
