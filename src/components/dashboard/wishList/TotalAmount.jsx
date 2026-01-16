import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyCourse } from "../../../services/operations/paymentApi";
import PaymentModal from "../../payment/PaymentModal";
import toast from "react-hot-toast";

const TotalAmount = () => {
  const { total } = useSelector((state) => state.cart);
  const { items } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const {user}=useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickHandler = () => {
    setIsModalOpen(true);
  };

  const handlePaymentSubmit = (paymentScreenshot) => {
    // Close modal
    setIsModalOpen(false);
    
    // Show success message
    toast.success("Payment screenshot submitted successfully!");
    
    // Show verification message after a short delay
    setTimeout(() => {
      toast.success("We will verify your payment and update you within a few hours.", {
        duration: 5000,
        icon: '⏳',
      });
    }, 500);
    
    // Here you can add API call to upload the screenshot to server
    // For now, just log it
    console.log("Payment screenshot:", paymentScreenshot);
    console.log("Courses:", items.map((item) => item._id));
  };

  return (
    <>
      <div className="flex bg-[#161D29] flex-col gap-4 p-6 rounded-lg border border-[#2C333F]">
        <div className="flex flex-col gap-1">
          <p className="text-[#999DAA] text-sm font-semibold">Total:</p>
          <p className="text-[#FFD60A] font-semibold text-2xl">Rs.{total}</p>
        </div>
        <button
          onClick={clickHandler}
          className="bg-[#FFD60A] rounded-lg font-medium py-[6px] px-[18px] hover:bg-yellow-100 transition-colors"
        >
          Buy Now
        </button>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        totalAmount={total}
        onSubmit={handlePaymentSubmit}
      />
    </>
  );
};

export default TotalAmount;
