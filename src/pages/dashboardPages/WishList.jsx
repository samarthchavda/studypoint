import React, { useEffect } from "react";
import LocationBar from "../../components/dashboard/LocationBar";
import { useSelector } from "react-redux";
import { getAverageRating } from "../../services/operations/courseApi";
import CourseCard from "../../components/dashboard/wishList/CourseCard.";
import TotalAmount from "../../components/dashboard/wishList/TotalAmount";
import { useState } from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const WishList = () => {
  const { totalItems, items } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);

  const [avgRating, setAvgRating] = useState({});
 useEffect(() => {
  const fetchAverageRating = async () => {
    try {
      const promises = items.map(async (element) => {
        const ratingResponse = await getAverageRating(token, { courseId: element._id });
        return {
          id: element._id,
          rating: ratingResponse && ratingResponse.averageRating
            ? ratingResponse.averageRating.toFixed(1)
            : "0.0"
        };
      });

      const results = await Promise.all(promises);

      const avgRatingObj = {};
      results.forEach(({ id, rating }) => {
        avgRatingObj[id] = rating;
      });

      setAvgRating(avgRatingObj);
    } catch (error) {
      console.log("error while getting average rating", error);
    }
  };

  if (totalItems > 0 && items) fetchAverageRating();
}, [items, token, totalItems]);
  return (
    <div className="pl-6 pt-6 ">
      <LocationBar />
      {items && totalItems > 0 ? (
        <div className="flex flex-col gap-5 pb-10">
          <h3 className="border-b-[1px] text-richblack-400 font-semibold py-2 border-[#2C333F]">
            {totalItems} Courses in Wishlist
          </h3>
          <div className="flex flex-col lg:flex-row justify-between w-11/12 md:w-full max-w-maxContent gap-10">
            <div className="flex lg:w-4/5 gap-5 flex-col">
              {items.map((item, index) => {
                return (
                  <>
                    <CourseCard
                      course={item}
                      key={index}
                      rating={avgRating[item._id]}
                    />
                    {index < totalItems - 1 && (
                      <div className="h-[1px] bg-[#2C333F] w-full"></div>
                    )}
                  </>
                );
              })}
            </div>
            <div className="lg:w-1/5 md:w-2/5 w-3/5 self-start  sm:self-end lg:self-start">
              <TotalAmount />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full h-[20rem] items-center">
          <p className="text-richblack-50 text-lg flex text-center flex-col items-center gap-3">
            <MdOutlineRemoveShoppingCart className="text-yellow-25 text-3xl" />
            You haven't added anything to wish list yet
          </p>
        </div>
      )}
    </div>
  );
};

export default WishList;
