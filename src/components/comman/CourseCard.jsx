import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../slices/cartSlice";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CourseCard = ({ course }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { items } = useSelector((state) => state.cart);

  const isInWishlist = items?.some((item) => item?._id === course?._id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot add courses to wishlist");
      return;
    }

    if (isInWishlist) {
      dispatch(removeItem({ _id: course._id }));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addItem(course));
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="relative">
      <Link to={`/course/${course._id}`} className="group">
        <div className="bg-richblack-800 rounded-lg overflow-hidden hover:scale-105 transition-all duration-200">
          <div className="relative h-[200px] w-full">
            <img
              src={course.thumbnail}
              alt={course.name}
              className="w-full h-full object-cover"
            />
            {/* Demo Badge */}
            <div className="absolute top-2 left-14 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              DEMO
            </div>
            
            <div className="absolute top-2 right-2 bg-yellow-50 text-richblack-900 px-3 py-1 rounded-full text-sm font-semibold">
              ₹{course.price}
            </div>
            
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="absolute top-2 left-2 bg-richblack-700 hover:bg-richblack-600 p-2 rounded-full transition-all z-10"
            >
              {isInWishlist ? (
                <FaHeart className="text-pink-500 text-xl" />
              ) : (
                <FaRegHeart className="text-richblack-5 text-xl" />
              )}
            </button>
          </div>

          <div className="p-4">
            <h3 className="text-richblack-5 font-semibold text-lg mb-2 line-clamp-2 group-hover:text-caribbeangreen-200 transition-colors">
              {course.name || course.courseName}
            </h3>

            <p className="text-richblack-300 text-sm mb-3 line-clamp-2">
              {course.description || course.courseDescription}
            </p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-richblack-300">
                <span>
                  By {course.instructor?.firstName} {course.instructor?.lastName}
                </span>
              </div>

              {course.studentsEnrolled && (
                <div className="text-richblack-400">
                  {course.studentsEnrolled.length} students
                </div>
              )}
            </div>

            {course.category && (
              <div className="mt-3 inline-block">
                <span className="bg-richblack-700 text-caribbeangreen-200 px-3 py-1 rounded-full text-xs">
                  {course.category.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
