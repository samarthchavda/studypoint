import React, { useState } from "react";
import YellowBtn from "../comman/YellowBtn";
import { useDispatch, useSelector } from "react-redux";
import { TiTickOutline } from "react-icons/ti";
import { FaShareFromSquare } from "react-icons/fa6";
import copy from 'copy-to-clipboard';
import toast from "react-hot-toast";
import { removeItem } from "../../slices/cartSlice";
import PaymentModal from "../payment/PaymentModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const numericPrice = Number(price);
  const hasValidPrice = Number.isFinite(numericPrice) && numericPrice >= 0;
  
  const removeFromCart=(_id)=>{
    dispatch(removeItem({_id}));
    toast.success("Removed from wishlist");
  }
  
  const handleAddToCart = () => {
    if (addToCart) {
      addToCart();
    }
  }
  
  const handleBuyNowClick = () => {
    setIsModalOpen(true);
  };

  const handlePaymentSubmit = (paymentScreenshot) => {
    setIsModalOpen(false);
    
    toast.success("Payment screenshot submitted successfully!");
    
    setTimeout(() => {
      toast.success("We will verify your payment and update you within a few hours.", {
        duration: 5000,
        icon: '⏳',
      });
    }, 500);
    
    console.log("Payment screenshot:", paymentScreenshot);
    console.log("Course ID:", course?._id);
  };
  
  const shareHandler=()=>{
      copy(window.location.href);
      toast.success("Link Copied to Clipboard");
  }
  return (
    <>
      <div className="bg-white border border-neutral-200 rounded-xl shadow-lg md:sticky md:top-4">
        <div className="mx-auto w-full">
          <img 
            src={thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop"} 
            className="max-h-[230px] w-full object-cover rounded-t-xl" 
            alt="thumbnail of course"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x250/0EA5E9/FFFFFF?text=Course+Thumbnail";
            }}
          />
        </div>
        <div className="p-6 gap-3 flex flex-col">
          <p className="text-3xl font-bold text-center md:text-start text-neutral-800">
            {isFree ? (
              <span className="text-success-600">FREE</span>
            ) : hasValidPrice ? (
              `Rs. ${numericPrice}`
            ) : (
              <span className="text-neutral-500">Price unavailable</span>
            )}
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
                    <YellowBtn textColour={'#FFFFFF'} widthFull={true} text="Buy Now" bgColour={'#0EA5E9'} clickHandler={handleBuyNowClick} />
                  </>
                )}
              </div>
            </div>
          )}
          {!isFree && <p className="text-neutral-600 text-sm text-center font-medium">30-Day Money-Back Guarantee</p>}
          <ul className="flex items-center md:items-start flex-col">
            <p className="text-neutral-800 font-semibold mb-2">This course includes:</p>
            {
                instructions?.map((item, index)=><li key={index} className="text-success-700 flex gap-1 items-center text-sm font-medium"><TiTickOutline className="text-lg"/>{item}</li>)
            }
          </ul>
          <p onClick={shareHandler} className="text-primary-600 cursor-pointer flex gap-1 items-center justify-center font-medium hover:text-primary-700 transition-colors"><FaShareFromSquare/> Share</p>
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        totalAmount={hasValidPrice ? numericPrice : 0}
        onSubmit={handlePaymentSubmit}
      />
    </>
  );
};

export default CourseBuyCard;
