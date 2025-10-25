import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { sendOTP, signup } from "../services/operations/authApi";
import Spinner from "../components/comman/Spinner";
const Verify = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const signupData = useSelector((state) => state.auth.signupData);
  const loading = useSelector((state) => state.auth.loading);
  useEffect(()=>{
    if(!signupData){
      navigate('/signup');
    }
  },[]);  
  const resendOTP = () => {
    sendOTP(signupData.email, dispatch);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      ...signupData,
      otp: otp,
    };
    dispatch(signup(data,navigate));
  };
  return (
    <div className="text-white flex justify-center items-center w-screen h-screen">
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="flex flex-col gap-3">
          <form onSubmit={submitHandler} className="flex flex-col gap-3">
            <h3 className="text-3xl font-bold">Verify email</h3>
            <p className="text-lg text-[#AFB2BF]">
              A verification code has been sent to you, enter the code below
            </p>

            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={"flex justify-between"} // Ensures equal spacing
              inputStyle={{
                width: "50px",
                height: "50px",
                padding: "10px",
                color: "#F1F2FF",
                backgroundColor: "#161D29",
                borderRadius: "8px",
                fontSize: "20px",
                textAlign: "center",
                boxSizing: "border-box",
                "box-shadow": "0px -1.1px rgba(255, 255, 255, 0.18) inset",
                outline: "none", // No outline by default,
              }}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  onFocus={(e) => (e.target.style.border = "2px solid #FFD60A")} // Show outline on focus
                  onBlur={(e) => (e.target.style.border = "none")} // Remove outline when not focused
                />
              )}
            />

            <button
              type="submit"
              className="text-[#000814] font-medium px-4 py-2 rounded-lg bg-[#FFD60A] w-full"
            >
              Verify and Register
            </button>
          </form>

          <div className="flex justify-between">
            <Link to="/login" className="flex items-center gap-1">
              <FaLongArrowAltLeft /> Back to login
            </Link>
            <button
              onClick={resendOTP}
              className="flex gap-1 text-[#47A5C5] items-center"
            >
              {" "}
              <FaClockRotateLeft />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;
