import React, { useEffect, useState } from "react";
import Stars from "../comman/Stars";
import { Link } from "react-router-dom";
import avgRating from "../../utils/avgRating";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../slices/cartSlice";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CourseCard = ({ info, allowWidth = false }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [averageRating, setAverageRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const avRating = avgRating(info.ratingAndReviews);
    setAverageRating(avRating);
  }, [info]);

  const isInWishlist = items?.some((item) => item?._id === info?._id);

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
      dispatch(removeItem({ _id: info._id }));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addItem(info));
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="relative">
      <Link to={`/course/${info._id}`} className="flex flex-col gap-2">
        <div className="relative">
          <img
            style={{
              maxWidth: allowWidth ? (width > 766 ? "600px" : "371px") : "371px",
            }}
            className="rounded-lg"
            src={info.thumbnail}
            alt=""
          />
          {/* Demo Badge */}
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            DEMO
          </div>
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 bg-richblack-700 hover:bg-richblack-600 p-2 rounded-full transition-all"
          >
            {isInWishlist ? (
              <FaHeart className="text-pink-500 text-xl" />
            ) : (
              <FaRegHeart className="text-richblack-5 text-xl" />
            )}
          </button>
        </div>
        <p className="text-richblack-5 font-medium text-lg">{info.name || info.courseName}</p>
        <p className="text-richblack-300 text-sm">
          By {info.instructor?.firstName} {info.instructor?.lastName}
        </p>
        <div className="flex items-center gap-2">
          <Stars rating={averageRating} />
          <span className="text-richblack-400 text-sm">
            ({info.ratingAndReviews?.length || 0} reviews)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-richblack-5 font-semibold text-xl">₹{info.price}</span>
          {info.studentsEnrolled && (
            <span className="text-richblack-400 text-sm">
              {info.studentsEnrolled.length} students
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
