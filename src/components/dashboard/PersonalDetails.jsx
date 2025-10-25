import React from "react";
import EditBtn from "../dashboard/EditBtn";
import ShowInfo from "../dashboard/ShowInfo";
import { useNavigate } from "react-router-dom";
const PersonalDetails = ({ userDetails }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/dashboard/settings");
  };
  return (
    <div className="pb-10 pr-2 sm:pr-0">
      <div className="flex flex-col sm:flex-row p-6 md:ml-20 ml-2 mt-10 max-w-[641.75px]  mx-auto rounded-xl justify-between  bg-richblack-800 ">
        <div className="flex text-richblack-5 gap-5">
          <img
            src={userDetails?.image?.split(" ")?.join("?")}
            className="rounded-full w-14 h-14"
            alt=""
          />
          <div>
            <h2>{userDetails?.firstName + "" + userDetails?.lastName}</h2>
            <p>{userDetails?.email}</p>
          </div>
        </div>
        <div className="self-end">
          <EditBtn clickHandler={clickHandler} />
        </div>
      </div>

      <div className="flex  flex-col p-6 md:ml-20 ml-2 mt-10 max-w-[641.75px]  mx-auto rounded-xl   bg-richblack-800 gap-5">
        <div className="flex justify-between  w-full items-center">
          <h2 className="text-lg font-semibold text-richblack-5">About</h2>
          <EditBtn clickHandler={clickHandler} />
        </div>
        <p className="text-sm text-richblack-300">
          {userDetails?.additionalDetails?.about ||
            "Write something about your self"}
        </p>
      </div>

      <div className="flex flex-col p-6  md:ml-20 ml-2 mt-10 max-w-[641.75px]  mx-auto rounded-xl   bg-richblack-800 gap-5">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-lg font-semibold text-richblack-5">
            Personal Details
          </h2>
          <EditBtn clickHandler={clickHandler} />
        </div>
        <div className="grid grid-cols-2 gap-y-5 ">
          <div className="">
            <ShowInfo
              label="First Name"
              info={userDetails?.firstName}
              text="Add firstName"
            />
          </div>

          <div>
            <ShowInfo
              label="Last Name"
              info={userDetails?.lastName}
              text="Add lastName"
            />
          </div>
          <div>
            <ShowInfo
              label="Email"
              info={userDetails?.email}
              text="Add email"
            />
          </div>
          <div>
            <ShowInfo
              label="Phone Number"
              info={
                userDetails?.additionalDetails?.phoneNumber
                  ? `${userDetails?.additionalDetails?.countryCode} ${userDetails?.additionalDetails?.phoneNumber}`
                  : null
              }
              text="Add Phone Number"
            />
          </div>
          <div>
            <ShowInfo
              label="Date of Birth"
              info={userDetails?.additionalDetails?.dob
                ?.split("T")
                .at(0)
                .toString()
                .split("-")
                .reverse()
                .join("-")}
              text="Add your Birthdate"
            />
          </div>
          <div>
            <ShowInfo
              label="Gender"
              info={userDetails?.additionalDetails?.gender}
              text="Add your gender"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
