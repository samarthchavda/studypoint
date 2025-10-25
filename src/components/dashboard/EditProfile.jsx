import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { countrycode } from "../../data/countrycode";
import { updateProfile } from "../../services/operations/profileApi";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../services/operations/profileApi";
import toast from "react-hot-toast";
import SubmitBtn from "../comman/SubmitBtn";
import CancelBtn from "../comman/CancelBtn";
const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    dispatch(getUserDetails(token, setLoading, setUserDetails));
  };
  useEffect(() => {
    fetchUserDetails();
  }, [dispatch]);

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, dirtyFields, isDirty },
  } = useForm({
    defaultValues: {
      dob:userDetails?.additionalDetails?.dob?.split('T')?.at(0)|| null,
      about: userDetails?.additionalDetails?.about || null,
      phoneNumber: userDetails?.additionalDetails?.phoneNumber || null,
      gender: userDetails?.additionalDetails?.gender || null,
      countryCode: userDetails?.additionalDetails?.countryCode || "+91",
    },
  });
  useEffect(() => {
    if(userDetails){
        // console.log("user data in setValue useEffect", userDetails);
    setValue("dob", userDetails?.additionalDetails?.dob?.split('T')?.at(0));
    setValue("about", userDetails?.additionalDetails?.about);
    setValue("phoneNumber", userDetails?.additionalDetails?.phoneNumber);
    setValue("gender", userDetails?.additionalDetails?.gender);
    setValue("countryCode", userDetails?.additionalDetails?.countryCode);
    }
  
  }, [userDetails]);

  useEffect(() => {
    // console.log("user data",userDetails);
  }, [userDetails]);
  const formHandler = (data) => {
    // console.log(data);
    // console.log(isDirty);
    // console.log(dirtyFields);
    // console.log(dirtyFields);

    //these lines botherd me a lot
    // data = {
    //   ...data,
    //   phoneNumber: `${data.countrycode}${data.phoneNumber}`,
    // };
    if (isDirty) {
      dispatch(updateProfile(token,data, setLoading));
      reset({
        ...data
      });
    } else {
      toast.error("update at least one detail");
    }
  };

  const genderWatch = watch("gender");
  return (
    <div className="lg:ml-20 mx-3 mt-16 p-6 max-w-[800px] flex flex-col md:mr-32 lg:mr-64 gap-6 bg-richblack-800 rounded-lg border-[1px] border-richblack-700">
      <h2 className="text-lg font-semibold text-richblack-5">
        Profile Information 
      </h2>
      <form
        onSubmit={handleSubmit(formHandler)}
        className="flex flex-col gap-5 items-start"
      >
        <div className="grid gap-x-5 gap-y-5 grid-cols-1 sm:grid-cols-2">
          <div className="flex gap-6">
            <div className="flex flex-col w-full  gap-[6px]">
              <label className="text-sm text-richblack-5" htmlFor="dob">
                Date of Birth
              </label>
              <input
                {...register("dob")}
                id="dob"
                name="dob"
                type="date" 
                className="field2 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col  gap-[6px]">
            <p className="font-medium text-sm text-richblack-5">Gender</p>
            <div className="flex field2  justify-between">
              <div className="flex items-center gap-2">
                <input
                  {...register("gender")}
                  id="male"
                  name="gender"
                  type="radio"
                  value="male"
                  className={`${
                    genderWatch === "male" || userDetails?.gender === "male"
                      ? "bg-[rgba(255,214,10,1)] outline outline-[2px] outline-[#2C333F] outline-offset-[-4px] "
                      : "outline outline-[2px] outline-[#585D69] outline-offset-[-1px]  bg-transparent"
                  } appearance-none w-4 h-4 rounded-full`}
                />
                <label className="font-medium text-richblack-5" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  {...register("gender")}
                  id="female"
                  name="gender"
                  value="female"
                  type="radio"
                  className={`${
                    genderWatch === "female"
                      ? "bg-[rgba(255,214,10,1)] outline outline-[2px] outline-[#2C333F] outline-offset-[-4px] "
                      : "outline outline-[2px] outline-[#585D69] outline-offset-[-1px]  bg-transparent"
                  } appearance-none w-4 h-4 rounded-full`}
                />
                <label
                  className="font-medium text-richblack-5"
                  htmlFor="female"
                >
                  Female
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  {...register("gender")}
                  id="other"
                  name="gender"
                  value="other"
                  type="radio"
                  className={`${
                    genderWatch === "other"
                      ? "bg-[rgba(255,214,10,1)] outline outline-[2px] outline-[#2C333F] outline-offset-[-4px] "
                      : "outline outline-[2px] outline-[#585D69] outline-offset-[-1px] bg-transparent"
                  } appearance-none w-4 h-4 rounded-full`}
                />
                <label className="font-medium text-richblack-5" htmlFor="other">
                  Other
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="flex gap-[6px] flex-col">
              <label htmlFor="phoneNumber" className="text-sm text-richblack-5">
                Phone Number
              </label>
              <div className="flex gap-5">
                <select
                  className="field2 w-1/4"
                  {...register("countryCode")}
                  name="countryCode"
                  id="countryCode"
                >
                  {countrycode.map((item, index) => {
                    return (
                      <option key={index} className="field" value={item.code}>
                        {item.code} {item.country}
                      </option>
                    );
                  })}
                </select>

                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder={
                    userDetails?.additionalDetails?.phoneNumber ||
                    "Enter your Phone Number"
                  }
                  {...register("phoneNumber", {
                    pattern: {
                      value: /^[0-9]{8,13}$/,
                      message: "invalid phone number",
                    },
                  })}
                  className="field2 w-3/4"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-sm text-richblack-5" htmlFor="about">
              About
            </label>
            <input
              {...register("about")}
              id="about"
              name="about"
              placeholder={
                userDetails?.additionalDetails?.about || "Write about yourself"
              }
              type="text"
              className="field2"
            />
          </div>
        </div>

        <div className="flex gap-3 self-end">
          <CancelBtn reset={reset} />
          <SubmitBtn text={"save"} />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
