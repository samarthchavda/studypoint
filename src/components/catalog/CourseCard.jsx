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
      <Link to={`/course/${info._id}`} className="flex flex-col gap-3 group">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            style={{
              maxWidth: allowWidth ? (width > 766 ? "600px" : "371px") : "371px",
            }}
            className="rounded-2xl group-hover:scale-105 transition-transform duration-300"
            src={info.thumbnail || "https://via.placeholder.com/400x200/0EA5E9/FFFFFF?text=No+Image"}
            alt={info.courseName || info.name || "Course"}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x200/0EA5E9/FFFFFF?text=No+Image";
            }}
          />
          {/* Demo Badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
            DEMO
          </div>
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2.5 rounded-full transition-all shadow-lg hover:scale-110"
          >
            {isInWishlist ? (
              <FaHeart className="text-secondary-500 text-lg" />
            ) : (
              <FaRegHeart className="text-neutral-600 text-lg" />
            )}
          </button>
        </div>
        <p className="text-neutral-800 font-semibold text-lg group-hover:text-primary-600 transition-colors">{info.name || info.courseName}</p>
        <p className="text-neutral-600 text-sm font-medium">
          By {info.instructor?.firstName} {info.instructor?.lastName}
        </p>
        <div className="flex items-center gap-2">
          <Stars rating={averageRating} />
          <span className="text-neutral-500 text-sm font-medium">
            ({info.ratingAndReviews?.length || 0} reviews)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-primary-600 font-bold text-2xl">₹{info.price}</span>
          {info.studentsEnrolled && (
            <span className="text-neutral-500 text-sm bg-neutral-100 px-3 py-1 rounded-full font-medium">
              {info.studentsEnrolled.length} students
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
