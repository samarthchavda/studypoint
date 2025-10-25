import React from "react";
import ReactStars from "react-stars";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeItem } from "../../../slices/cartSlice";
const CourseCard = ({ course, rating }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between gap-8">
      <div className="flex gap-4 flex-col sm:flex-row">
        <div>
          <img
            className="w-[185px] rounded-lg max-h-[145px]"
            src={course.thumbnail}
            alt="course thumbnail"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-richblack-5 font-medium text-lg">
            {course.name}
          </h4>
          <h5 className="text-[#838894]">{course.category.name}</h5>
          <div className="flex items-center gap-2">
            <span className="text-[#E7C009] block">{rating?rating:"0"}</span>
            <ReactStars
              count={5}
              edit={false}
              value={rating}
              color1="#2C333F"
              color2="#E7C009"
            />
            <span className="text-[#838894]">
              ({course.ratingAndReviews.length})
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[20px]">
        <button
          className="rounded-lg font-medium p-3 flex gap-2 items-center text-[#EF476F] bg-[#161D29] border border-[#2C333F]"
          onClick={() => dispatch(removeItem(course))}
        >
          <RiDeleteBin6Line />
          <span>Remove</span>
        </button>

        <p className="text-[#FFD60A] text-2xl font-semibold">
          Rs. {course.price}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
