import React from "react";
import YellowBtn from "../comman/YellowBtn";
import { useDispatch, useSelector } from "react-redux";
import { TiTickOutline } from "react-icons/ti";
import { FaShareFromSquare } from "react-icons/fa6";
import copy from 'copy-to-clipboard';
import toast from "react-hot-toast";
import { removeItem } from "../../slices/cartSlice";

const CourseBuyCard = ({
  course,
  thumbnail,
  isBought,
  price,
  buyHandler,
  instructions,
  addToCart,
  goToCourseHandler,
  isFree = false,
  freeEnrollHandler
}) => {
  const items=useSelector((state)=>state.cart.items);
  const dispatch=useDispatch();
  
  const removeFromCart=(_id)=>{
    dispatch(removeItem({_id}));
    toast.success("Removed from wishlist");
  }
  
  const handleAddToCart = () => {
    if (addToCart) {
      addToCart();
    }
  }
  
  const shareHandler=()=>{
      copy(window.location.href);
      toast.success("Link Copied to Clipboard");
  }
  return (
    <div className="bg-richblack-700 rounded-lg shadow-lg md:sticky md:top-4">
      <div className="mx-auto w-fit"><img src={thumbnail} className="max-h-[230px] w-full object-cover rounded-t-lg" alt="thumbnail of course"/></div>
      <div className="p-6 gap-3 flex flex-col">
        <p className="text-3xl font-bold text-center md:text-start text-richblack-5">
          {isFree ? <span className="text-caribbeangreen-200">FREE</span> : `Rs. ${price}`}
        </p>
        {isBought ? (
          <YellowBtn clickHandler={goToCourseHandler} text={"Go To Course"} />
        ) : (
          <div>
            <div className="flex flex-col gap-3">
              {isFree ? (
                <YellowBtn widthFull={true} text="Enroll Now - Free" clickHandler={freeEnrollHandler} />
              ) : (
                <>
                  {
                    items?.some((item)=>item?._id===course?._id) ?  
                    <YellowBtn widthFull={true} text="Remove from Wishlist" clickHandler={()=>removeFromCart(course?._id)} />
                    : <YellowBtn widthFull={true} text="Add to Wishlist" clickHandler={handleAddToCart} />
                  }
                  <YellowBtn textColour={'#F1F2FF'} widthFull={true} text="Buy Now" bgColour={'#161D29'} clickHandler={buyHandler} />
                </>
              )}
            </div>
          </div>
        )}
        {!isFree && <p className="text-richblack-25 text-sm text-center ">30-Day Money-Back Guarantee</p>}
        <ul className="flex items-center md:items-start flex-col">
          <p className="text-richblack-5 font-medium">This course includes:</p>
          {
              instructions?.map((item)=><li className="text-caribbeangreen-100 flex gap-1 items-center text-sm"><TiTickOutline className="text-lg"/>{item}</li>)
          }
        </ul>
        <p onClick={shareHandler} className="text-yellow-100 cursor-pointer flex gap-1 items-center justify-center"><FaShareFromSquare/> Share</p>
      </div>
    </div>
  );
};

export default CourseBuyCard;
