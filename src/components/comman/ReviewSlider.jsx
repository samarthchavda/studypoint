import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReviewCard from "./ReviewCard";
const ReviewSlider = ({ reviews, general }) => {
  const [width,setWidth]=useState(window.innerWidth);
  useEffect(()=>{
    const handleResize=()=>{
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize',handleResize);
    return ()=>{
      window.removeEventListener('resize',handleResize);
    }
  },[]);
  return (
    <div className="relative">
      <div className=" bg-gradient-to-r bg-transparent pointer-events-none from-[#000814] via-[#00081400] to-[#000814] z-10 absolute top-0 right-0 left-0 bottom-0"></div>

      <div className="">
        <h3 className="text-richblack-5 font-semibold text-[36px] text-center mb-6">
          Review from other learners
        </h3>
        {!reviews || reviews.length === 0 ? (
          <p className="text-richblack-300 text-center py-10">No reviews yet. Be the first to review this course!</p>
        ) : (
          <Swiper loop={true} spaceBetween={24} slidesPerView={width>1150 ? 4 : width > 830 ? 3 : width > 623 ? 2 : 1}>
            {reviews?.map((review, index) => (
              <SwiperSlide key={review._id || index} className="">
                <ReviewCard general={general} review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ReviewSlider;
