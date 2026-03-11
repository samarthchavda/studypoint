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
    <div className="relative py-12">
      <div className="">
        <h3 className="text-neutral-800 font-semibold text-[36px] text-center mb-2">
          Reviews from other learners
        </h3>
        <p className="text-neutral-600 text-center mb-8 text-lg">
          See what our students have to say about their learning experience
        </p>
        {!reviews || reviews.length === 0 ? (
          <p className="text-neutral-600 text-center py-10 bg-neutral-50 rounded-xl">No reviews yet. Be the first to review this course!</p>
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
