import React, { useEffect, useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import CustomButton from "../components/home/CustomButton";
import { Link } from "react-router-dom";
import HighlightedText from "../components/home/HighlightedText";
import banner from "../assets/Images/homeVideo.mp4";
import CodeSection from "../components/home/CodeSection";
import TimeLine from "../components/home/TimeLine";
import SwissCards from "../components/home/SwissCards";
import instructor from "../assets/Images/Instructor.png";
import Footer from "../components/comman/Footer";
import CardsWindow from "../components/home/CardsWindow";
import NavBar from "../components/comman/NavBar";
import { getAllReviews } from "../services/operations/courseApi";
import ReviewSlider from "../components/comman/ReviewSlider";
import { useSelector } from "react-redux";
import AllCoursesSection from "../components/home/AllCoursesSection";
const Home = () => {
  const [reviews, setReviews] = useState(null);
  const user=useSelector((state)=>state.profile.user);
  useEffect(() => {
    const getAllCoursesReviews = async () => {
      const reviews = await getAllReviews();
      if (reviews) {
        setReviews(reviews);
      }
    };
    getAllCoursesReviews();
  }, []);

  const isLoggedIn=()=>{
    if(user?.accountType==='Student') return 'Student';
    else if(user?.accountType==='Instructor') return 'Instructor'
    else return null;
  }

  return (
    <div className="w-full">
      <NavBar />
      {/* section1 */}
      <div className="w-11/12 flex flex-col gap-20 items-center max-w-maxContent mx-auto">
        <div className=" flex flex-col pt-[124px] gap-6 items-start sm:items-center ">
          <Link
            to={isLoggedIn()==='Instructor'?'/dashboard/add-course':'/signup'}
            className="hover:shadow-xl bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full w-fit sm:self-center
                         flex items-center gap-2 text-white font-semibold mb-4 transition-all hover:scale-105 py-3 px-8 shadow-lg"
          >
            Become An Instructor
            <IoMdArrowRoundForward />
          </Link>
          <h2 className="text-neutral-800 sm:text-center text-4xl font-bold">
            Empower Your Future with <HighlightedText text={"Coding Skills"} />
          </h2>
          <p className="text-neutral-600 font-medium sm:text-center sm:w-5/6 text-lg">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.{" "}
          </p>
          <div className="flex gap-5 mt-8">
            <CustomButton linkTo={'/about'} active={true}>
              Learn More <IoMdArrowRoundForward />
            </CustomButton>
            <CustomButton linkTo={'/contact'} active={false}>
              Book a Demo
            </CustomButton>
          </div>
        </div>

        <div className="sm:w-[75%] self-center relative">
          <div
            className={`box1 backdrop-blur-2xl shadow-[1px_1px_200px_60px_rgba(14,165,233,0.3)] absolute top-20 left-[50%] h-1 w-1 rounded-full`}
          ></div>
          <div className="z-10 relative">
            <video
              muted
              autoPlay
              className="shadow-[12px_12px_0px_0px_rgba(14,165,233,0.5)] rounded-2xl"
            >
              <source src={banner} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="sm:w-[85%] mx-auto flex flex-col gap-14">
          <CodeSection
            flex={"flex-col lg:flex-row"}
            heading={{
              text1: "Unlock your",
              text2: "coding potential",
              text3: "with our online courses",
            }}
            para="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            btn1={"Try it yourself"}
            btn2={"Learn More"}
            linkTo1={"https://replit.com/"}
            linkTo2={'/about'}
            codeColor={"pink"}
            codeBlock={
              '<html>\n<head><title>Exampe</\ntitle>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1/">Header</a>\n</h1>\n<nav><ah ref= " one / " >One< two/ " > Two</three/" >Three</a>\n</nav>'
            }
          />

          <CodeSection
            flex={"flex-col lg:flex-row-reverse"}
            heading={{ text1: "Start", text2: "coding in seconds" }}
            para="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            btn1={"Continue Lesson"}
            btn2={"Learn More"}
            linkTo1={isLoggedIn()==='Student'?'/dashboard/enrolled-courses':'/signup'}
            linkTo2={"/about"}
            codeColor={"yellow"}
            codeBlock={
              '<html>\n<head><title>Exampe</\ntitle>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1/">Header</a>\n</h1>\n<nav><ah ref= " one / " >One< two/ " > Two</three/" >Three</a>\n</nav>'
            }
          />
        </div>

        <CardsWindow />
      </div>
      {/* section2 */}
      <div className="bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">
        <div className="mx-auto text-neutral-800 max-w-maxContent">
          <div className="chex h-80 flex items-center justify-center">
            <div className="flex gap-7">
              <CustomButton active={true} linkTo={"/catalog/Artificial-Intelligence"}>
                Explore full catalog
                <IoMdArrowRoundForward />
              </CustomButton>

              <CustomButton active={false} linkTo={"/about"}>
                Learn more
                <IoMdArrowRoundForward />
              </CustomButton>
            </div>
          </div>
          <div className="w-11/12 mx-auto flex justify-center py-24">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 h-fit">
              <p className="text-5xl text-start sm:text-center lg:text-start font-bold lg:w-[51%] text-neutral-800">
                Get the skills you need for a{" "}
                <HighlightedText text={"job that is in demand."} />
              </p>
              <div className="flex flex-col sm:items-center lg:items-start lg:gap-16 gap-6 lg:w-[49%]">
                <p className="font-medium text-start sm:text-center lg:text-start text-lg text-neutral-600">
                  The modern StudyPoint dictates its own terms. Today,
                  to be a competitive specialist requires more than professional
                  skills.
                </p>
                <CustomButton active={true} linkTo={"/about"}>
                  Learn More
                </CustomButton>
              </div>
            </div>
          </div>

          <TimeLine />

          <SwissCards />
        </div>
      </div>
      {/* section3 */}
      <div className="mx-auto py-24 w-11/12 max-w-maxContent">
        <div className="flex flex-col-reverse md:flex-row gap-20">
          <div className="md:w-[50%]">
            <div className="shadow-[-20px_-20px_0px_0px_rgba(14,165,233,0.3)] rounded-2xl overflow-hidden">
              <img className="rounded-2xl" src={instructor} alt="" />
            </div>
          </div>
          <div className="flex flex-col md:w-[40%] gap-16 justify-center">
            <div>
              <p className="text-5xl font-bold text-neutral-800">Become an</p>
              <HighlightedText text={"Instructor"} />
              <p className="text-neutral-600 font-medium text-lg mt-4">
                Instructors from around the world teach millions of students on
                StudyPoint. We provide the tools and skills to teach what you
                love.
              </p>
            </div>

            <CustomButton active={true} linkTo={isLoggedIn()==='Instructor'?'/dashboard/add-course':'/signup'}>
              Start Teaching Today{" "}
              <IoMdArrowRoundForward></IoMdArrowRoundForward>
            </CustomButton>
          </div>
        </div>
      </div>

      {/* All Courses Section */}
      <AllCoursesSection />

      <div className="w-11/12 max-w-maxContent mx-auto mb-20">
        <ReviewSlider general={true} reviews={reviews} />
      </div>
      {/* footersection */}
      <Footer />
    </div>
  ); 
};

export default Home;
