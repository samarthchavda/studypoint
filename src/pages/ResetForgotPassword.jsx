import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useState } from "react";
import PassCheck from "../components/passwords/PassCheck";
import { setForgotPassword } from "../services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/comman/Spinner";
const ResetForgotPassword = () => {
  const location = useLocation();
  const [match, setMatch] = useState(false);
  const [flags, setFlags] = useState({
    lower: false,
    special: false,
    upper: false,
    number: false,
    min: false,
  });
  // useEffect(()=>{
  //     console.log(flags);
  // },[flags]);
  const [formData, setFormData] = useState({
    password: "",
    cPassword: "",
  });
  const [passChanged, setPassChanged] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch=useDispatch();  
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    } else {
      if (formData.password === e.target.value) {
        setMatch(true);
      } else {
        setMatch(false);
      }
    }
  };
  function validatePassword(password) {
    const lowerPattern = new RegExp("[a-z]");
    const upperPattern = new RegExp("[A-Z]");
    const specialPattern = new RegExp("[@#$%^&*_!]");
    const numberPattern = new RegExp("[0-9]");
    setFlags({
      lower: lowerPattern.test(password),
      upper: upperPattern.test(password),
      special: specialPattern.test(password),
      number: numberPattern.test(password),
      min: password.length >= 8,
    });
  }

  function isFlagsTrue() {
    return Object.values(flags).every((flag) => flag === true);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(setForgotPassword({
      token,
      password: formData.password,
      confirmPassword: formData.cPassword,
    },setPassChanged));
    
  };

  return (
    <div className="flex justify-center items-center mx-auto h-screen w-11/12">
      {
        loading?(<Spinner/>)
        :(<>
         {passChanged ? (
          <div className="flex flex-col w-[400px] gap-2">
            <h2 className="font-bold text-xl text-[#F1F2FF]">
              Reset Completet!
            </h2>
            <p className="text-[#AFB2BF] text-lg">
            All done! We have sent an email to your mail to confirm
            </p>
            <Link to='/login'>
            <button className="bg-[#FFD60A] w-full p-2 rounded-lg">
                Return to Login
              </button>
            </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 max-w-[420px]">
            <div className="flex flex-col gap-2 max-w-[478px]">
              <h2 className="font-bold text-xl text-[#F1F2FF]">
                Choose new password
              </h2>
              <p className="text-[#AFB2BF] text-lg">
                Almost done. Enter your new password and youre all set.
              </p>
            </div>
            <form onSubmit={submitHandler} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="relative text-[#F1F2FF]" htmlFor="password">
                  password
                  <span className="text-red-700 absolute -top-1">*</span>
                </label>
                <input
                  onChange={changeHandler}
                  type="password"
                  id="password"
                  value={formData.password}
                  name="password"
                  className="bg-[#161D29] outline-none text-[#F1F2FF]
             insetShadow px-2 py-2 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="relative text-[#F1F2FF]" htmlFor="cPassword">
                  confirm password
                  <span className="text-red-700 absolute -top-1">*</span>
                </label>
                <input
                  onChange={changeHandler}
                  type="password"
                  id="cPassword"
                  value={formData.cPassword}
                  name="cPassword"
                  className="bg-[#161D29] outline-none text-[#F1F2FF]
             insetShadow px-2 py-2 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2">
                <PassCheck
                  param={flags.lower}
                  text={"one lowercase character"}
                />
                <PassCheck
                  param={flags.upper}
                  text={"one uppercase character"}
                />
                <PassCheck
                  param={flags.special}
                  text={"one special character"}
                />
                <PassCheck param={flags.number} text={"one number"} />
                <PassCheck param={flags.min} text={"8 character minimum"} />
              </div>
              <button
                type="submit"
                disabled={!match || !isFlagsTrue }
                className={`${
                  match && isFlagsTrue() ? " " : "cursor-not-allowed opacity-50 "
                } bg-[#FFD60A] p-2  mt-3 rounded-lg`}
              >
                Reset Password
              </button>
            </form>
            <Link to="/login" className="text-white flex items-center gap-1">
              <FaLongArrowAltLeft /> Back to login
            </Link>
          </div>
        </>
      )}
        </>)
      }
     
    </div>
  );
};

export default ResetForgotPassword;
