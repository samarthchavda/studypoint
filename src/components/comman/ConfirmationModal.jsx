import React from "react";

const ConfirmationModal = ({
  heading,
  modalRef,
  btn1Text,
  btn2Text,
  btn1Handler,
  btn2Handler,
}) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center bg-richblack-900/50 justify-center backdrop-blur-sm">
      <div
        ref={modalRef}
        className="z-[1001] w-11/12 max-w-[350px] rounded-lg border-[1px] border-richblack-400 bg-richblack-800 p-6"
      >
        <h2 className="text-lg text-richblack-5 font-semibold text-center">
          Do you Really want to{" "}
          <span className="text-pink-500">{btn2Text}</span>{" "}
          {heading && heading}?
        </h2>
        
        <div className="mt-6 flex items-center justify-center gap-x-4">
          <button
            onClick={btn1Handler}
            className="rounded-md bg-yellow-50 px-4 py-2 text-sm font-semibold text-richblack-900 hover:scale-95 transition-all duration-200"
          >
            {btn1Text}
          </button>
          <button
            onClick={btn2Handler}
            className="rounded-md bg-richblack-200 px-4 py-2 text-sm font-semibold text-richblack-900 hover:scale-95 transition-all duration-200"
          >
            {btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;