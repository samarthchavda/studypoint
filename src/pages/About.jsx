import React from "react";
import NavBar from "../components/comman/NavBar";
import HighlightedText from "../components/home/HighlightedText";
import about1img from "../assets/Images/aboutus1.webp";
import about2img from "../assets/Images/aboutus2.webp";
import about3img from "../assets/Images/aboutus3.webp";
import BluredSphere from "../components/comman/BluredSphere";
import NumberInfo from "../components/about/NumberInfo";
import LearningGrid from "../components/about/LearningGrid";
import ContactForm from "../components/about/ContactForm";
import Footer from '../components/comman/Footer';
import FoundingGrid from "../components/about/FoundingGrid";
const About = () => {
  return (
    <div className=" mx-auto">
      <NavBar />

      <div className="bg-[#161D29] flex justify-center mx-auto">
        <div className="w-11/12 flex flex-col text-start sm:text-center max-w-maxContent  mx-auto  lg:px-40 pt-20">
          <h1 className="text-[#999DAA] font-medium mb-10">About Us</h1>
          <div className="flex flex-col gap-5">
            <p className="text-4xl text-[#F1F2FF] font-semibold">
              Driving Innovation in Online Education for a <br />{" "}
              <HighlightedText text={"Brighter Future"} />
            </p>
            <p className="text-[#838894] font-medium">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>
          <div className="flex lg:flex-row flex-col max-w-[1280px] gap-5 justify-center items-center relative -bottom-20">
            <BluredSphere color1={"rgba(230,92,0,1)"} color2={"rgba(249,212,35,1)"}/>
            <img src={about1img} className="w-1/3  z-10 " alt="aboutimage1" />
            <img src={about2img} className="w-1/3  z-10 " alt="aboutimage2" />
            <img src={about3img} className="w-1/3  z-10 " alt="aboutimage3" />
          </div>
        </div>
      </div>

      <div className="w-11/12 max-w-maxContent text-start sm:text-center  mx-auto pb-24">
        <div className="w-full py-28  mt-16">
          <p className="font-semibold text-[#AFB2BF] sm:px-12 text-4xl">
            <span className="text-[#424854]">“</span> We are passionate about
            revolutionizing the way we learn. Our innovative platform{" "}
            {<HighlightedText text={"combines technology"} />},
            {
              <HighlightedText
                color1="#FF512F"
                color2="#FF512F"
                color3="#F09819"
                text={"expertise"}
              />
            }
            , and community to create an{" "}
            {
              <HighlightedText
                color1="#F09819"
                color2="#F09819"
                color3="#FF512F"
                text={"unparalleled educational experience"}
              />
            }
            .<span className="text-[#424854]">“</span>
          </p>
        </div>


        <FoundingGrid/>
      </div>

      <div className="bg-[#161D29]">
        <div className="flex gap-10 max-w-maxContent py-16 w-11/12 mx-auto justify-around">
          <NumberInfo number={"5K"} info={"Students"}/>
          <NumberInfo number={"10+"} info={"Mentors"}/>
          <NumberInfo number={"200+"} info={"Courses"}/>
          <NumberInfo number={"50+"} info={"Awards"}/>
        </div>
      </div>
          

      <LearningGrid/>

      <div className="flex flex-col w-11/12 mx-auto gap-5 pb-40 sm:items-center">
        <div className="flex flex-col sm:items-center gap-2">
        <h2 className="text-richblack-5 text-4xl text-start sm:text-center  font-semibold">Get in Touch</h2>
        <p className="text-richblack-300 text-start sm:text-center  font-medium">We’d love to here for you, Please fill out this form.</p>
        </div>
        <ContactForm/>
      </div>
      
      {/* review slider */}


      <Footer/>
    </div>
  );
};

export default About;
