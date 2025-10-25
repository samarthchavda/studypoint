import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { sendResetPasswordToken } from "../services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/comman/Spinner";
const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [mail, setMail] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const changeHandler = (e) => {
    e.preventDefault();
    setMail(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendResetPasswordToken({ email: mail }, setEmailSent));
  };
  const resendMail = (e) => {
    dispatch(sendResetPasswordToken({ email: mail }, setEmailSent));
  };
  return (
    <div className="flex justify-center w-11/12  mx-auto items-center h-screen">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-8  max-w-[400px]">
          <div className="flex flex-col gap-2">
            {!emailSent ? (
              <h2 className="font-bold text-xl text-[#F1F2FF]">
                Reset Your Password
              </h2>
            ) : (
              <h2 className="font-bold text-xl text-[#F1F2FF]">Check mail</h2>
            )}
            {!emailSent ? (
              <p className="text-[#AFB2BF] text-lg">
                Have no fear. We’ll email you instructions to reset your
                password. If you dont have access to your email we can try
                account recovery
              </p>
            ) : (
              <p className="text-[#AFB2BF] text-lg">{`We have sent the reset email to ${mail}`}</p>
            )}
          </div>
          {!emailSent ? (
            <>
              <form onSubmit={submitHandler} className="flex flex-col gap-8 ">
                <div className="flex flex-col gap-2">
                  <label className="relative text-[#F1F2FF]" htmlFor="email">
                    Email address
                    <span className="text-red-700 absolute -top-1">*</span>
                  </label>
                  <input
                    onChange={changeHandler}
                    type="email"
                    id="email"
                    value={mail}
                    name="mail"
                    placeholder="example@mail.com"
                    className="bg-[#161D29] outline-none text-[#F1F2FF]
               insetShadow px-2 py-2 rounded-lg"
                  />
                </div>
                <button type="submit" className="bg-[#FFD60A] p-2 rounded-lg">
                  Reset Password
                </button>
              </form>
              <Link to="/login" className="text-white flex items-center gap-1">
                <FaLongArrowAltLeft /> Back to login
              </Link>
            </>
          ) : (
            <button
              onClick={resendMail}
              type="submit"
              className="bg-[#FFD60A] p-2 rounded-lg"
            >
              Resend mail
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
