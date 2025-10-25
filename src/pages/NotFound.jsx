import React from "react";
import { WiDirectionUpRight } from "react-icons/wi";
import { BiSolidError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col gap-5 justify-center h-screen items-center">
      <BiSolidError className="text-red-800 text-4xl" />
      <p className="text-4xl text-richblack-5">Error - 404 Page Not Found</p>
      <button
        onClick={clickHandler}
        className="text-[#000814] bg-[#FFD60A] items-center px-4 py-[6px] rounded-lg flex gap-1"
      > 
        <WiDirectionUpRight className="text-3xl" />
         <p className="font-medium">Go to Home Page</p>
      </button>
    </div>
  );
};

export default NotFound;
