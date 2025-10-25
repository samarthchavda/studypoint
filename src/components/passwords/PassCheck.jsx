import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { ImCross } from "react-icons/im";
const PassCheck = ({param, text}) => {
  return (
    <div
      className={`${
        param ? "text-green-500" : "text-red-500"
      } flex gap-1 items-center`}
    >
      {param ? <IoCheckmarkCircle className="w-5 h-5" /> : <ImCross />}
      <p>{text}</p>
    </div>
  );
};

export default PassCheck;
