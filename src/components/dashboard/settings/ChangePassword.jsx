import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../services/operations/authApi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import SubmitBtn from "../../comman/SubmitBtn";
import CancelBtn from "../../comman/CancelBtn";
const ChangePassword = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [showOldPass, setShowOldPass] = useState();
  const [showPass, setShowPass] = useState();
  const clickHandler = (type) => {
    if (type === 0) {
      setShowOldPass(!showOldPass);
    } else {
      setShowPass(!showPass);
    }
  };
  const submitHandler = (data) => {
    // console.log(data);
    dispatch(changePassword(data));
  };

  return (
    <div className="lg:ml-20 mx-3  mt-10 p-6 max-w-[800px] flex flex-col md:mr-32 lg:mr-64 gap-6 bg-richblack-800 rounded-lg border-[1px] border-richblack-700">
      <div className="">
      <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-5 "
      >
        <div className="flex w-full sm:flex-row gap-5 flex-col justify-between ">
          <div className="flex sm:w-1/2 flex-col gap-[2px]">
            <label htmlFor="oldPassword" className="text-richblack-5 text-sm">
              Current Password <span className="text-[#EF476F]">*</span>
            </label>
            <div className="flex field2 w-full gap-3 justify-between items-center">
              <input
                {...register("oldPassword", {
                  required: { value: true, message: "Field is empty" },
                })}
                type={showOldPass ? "text" : "password"}
                className="outline-none bg-[#2C333F]"
              />
              {errors.oldPassword && (
                <p className="text-[#EF476F]">{errors.oldPassword.message}</p>
              )}
              <div className="hover:cursor-pointer" onClick={() => clickHandler(0)}>
                {showOldPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
          </div>

          <div className="flex sm:w-1/2 flex-col gap-[2px]">
            <label htmlFor="oldPassword" className="text-richblack-5 text-sm">
              Change Password <span className="text-[#EF476F]">*</span>
            </label>
            <div className="flex field2 w-full justify-between items-center">
              <input
                {...register("password", {
                  required: { value: true, message: "Field is empty" },
                  pattern:{value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).{8,}$/,message:"Password must be 8+ characters with uppercase, lowercase, numbers, and special characters"}
                })}
                type={showPass ? "text" : "password"}
                className="outline-none bg-[#2C333F]"
              />
              <div className="hover:cursor-pointer" onClick={() => clickHandler(1)}>
                {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
            {errors.password && (
                <p className="text-[#EF476F]">{errors.password.message}</p>
              )}
          </div>
        </div>

        <div className="flex gap-3 self-end">
        <CancelBtn reset={reset}/>
        <SubmitBtn text={"save"} />
        </div>
      </form>
      </div>
     
    </div>
  );
};

export default ChangePassword;
