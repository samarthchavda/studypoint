import React from "react";
import CourseCard from "./CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
const CoursesToStart = ({ courses }) => {
  return (
    <div>
      <h2 className="text-richblack-5 font-semibold text-3xl">
        Courses to get you started
      </h2>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={3}
        loop={true}
        spaceBetween={50}
      >
        {courses?.length === 0 ? (
          <p>No courses in this category have been created</p>
        ) : (
          <div className="">
            {courses?.map((item, index) => (
              <SwiperSlide>
                <CourseCard info={item} />
              </SwiperSlide>
            ))}
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default CoursesToStart;
