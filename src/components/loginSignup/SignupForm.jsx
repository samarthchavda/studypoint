import React from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import UserToggleTab from "./UserToggleTab";
import { countrycode } from "../../data/countrycode";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSignupData } from "../../slices/authSlice";
import { sendOTP } from "../../services/operations/authApi";
import { Link } from "react-router-dom";
const SignupForm = ({ setIsLoggedIn, changeTab }) => {
  const [user, setUser] = useState("Student");
  const [showPass, setshowPass] = useState(false);
  const [showConPass, setshowConPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function passHandler() {
    setshowPass(!showPass);
  }

  function cpassHandler() {
    setshowConPass(!showConPass);
  }
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    cpassword: "",
    code: "+91",  // Default to India
    phoneNumber: "",
  });

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    
    // Validate phone number (required for Indian users)
    if (!formData.phoneNumber) {
      toast.error("Mobile number is required");
      return;
    }
    
    // Validate Indian phone format (10 digits)
    const cleanPhone = formData.phoneNumber.replace(/\D/g, "");
    if (!/^\d{10}$/.test(cleanPhone)) {
      toast.error("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    
    if (formData.password !== formData.cpassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (!formData.fName || !formData.lName) {
      toast.error("First and last names are required");
      return;
    }

    // Email is now optional - can be derived from phone or user can add later
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Format phone with +91 for signup
    const fullPhone = `+91${cleanPhone}`;
    
    const data = {
      firstName: formData.fName,
      lastName: formData.lName,
      email: formData.email || `user${cleanPhone}@studynotion.local`,  // Fallback email
      password: formData.password,
      confirmPassword: formData.cpassword,
      accountType: user,
      phoneNumber: fullPhone,  // Store full phone with +91
    };
    
    console.log("signup data", data);
    dispatch(setSignupData(data));
    
    // Send OTP via SMS (phone is mandatory now) - send just 10 digits
    dispatch(sendOTP(cleanPhone, navigate, "sms"));
  }

  function userHandler(e) {
    if (e.target.value != user) {
      user === "Student" ? setUser("Instructor") : setUser("Student");
      changeTab();
    }
  }

  return (
    <div className="flex mx-auto items-cneter w-full">
      <div className="flex flex-col w-full h-fit gap-4">
        <UserToggleTab user={user} clickHandler={userHandler} />

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <fieldset className="flex gap-3 w-full">
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="fName">
                First Name
                <span className="text-red-500 text-sm absolute">*</span>
              </label>
              <input
                onChange={changeHandler}
                value={formData.fName}
                className="text-white rounded-md px-3 py-2 w-full outline-none bg-[#161D29]"
                type="text"
                required
                placeholder="Enter Your First Name"
                name="fName"
                id="fName"
              />
            </div>

            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="fName">
                Last Name
                <span className="text-red-500 text-sm absolute">*</span>
              </label>
              <input
                onChange={changeHandler}
                value={formData.lName}
                className="text-white rounded-md px-3 py-2 w-full outline-none bg-[#161D29]"
                type="text"
                required
                placeholder="Enter Your Last Name"
                name="lName"
                id="lName"
              />
            </div>
          </fieldset>

          <div className="flex flex-col gap-1">
            <label htmlFor="phoneNumber">
              Mobile Number (India)
              <span className="text-red-500 text-sm absolute">*</span>
            </label>
            <div className="flex gap-3">
              {/* India code - Display only, no dropdown */}
              <div className="text-white w-2/5 rounded-md px-3 py-2 outline-none bg-[#161D29] flex items-center">
                <span className="font-semibold">🇮🇳 +91</span>
              </div>

              <input
                onChange={changeHandler}
                value={formData.phoneNumber}
                className="text-white rounded-md px-3 py-2 w-full outline-none bg-[#161D29]"
                type="tel"
                required
                maxLength="10"
                placeholder="Enter 10-digit mobile number"
                name="phoneNumber"
                id="phoneNumber"
              />
            </div>
            <p className="text-xs text-gray-400">
              Enter your 10-digit Indian mobile number. OTP will be sent via SMS.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">
              Email Address (Optional)
              <span className="text-gray-400 text-xs ml-2">(You can add later)</span>
            </label>
            <input
              onChange={changeHandler}
              value={formData.email}
              className="text-white rounded-md px-3 py-2 w-full outline-none bg-[#161D29]"
              type="email"
              placeholder="Enter email address (optional)"
              name="email"
              id="email"
            />
          </div>

          <fieldset className="flex gap-3 ">
            <div className="w-1/2">
              <label htmlFor="password">
                Password<span className="text-red-500 text-sm absolute">*</span>
              </label>
              <div className="flex items-center gap-1 rounded-md bg-[#161D29] px-3 py-2">
                <input
                  onChange={changeHandler}
                  value={formData.password}
                  className="text-white rounded-md w-full outline-none bg-[#161D29]"
                  type={showPass ? "text" : "password"}
                  required
                  placeholder="Enter Password"
                  name="password"
                  id="password"
                />
                <div onClick={passHandler} className="cursor-pointer">
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <label htmlFor="cpassword">
                Confirm Password
                <span className="text-red-500 text-sm absolute">*</span>
              </label>
              <div className="flex items-center gap-1 rounded-md  bg-[#161D29] px-3 py-2">
                <input
                  onChange={changeHandler}
                  value={formData.cpassword}
                  className="text-white rounded-md w-full outline-none bg-[#161D29]"
                  type={showConPass ? "text" : "password"}
                  required
                  placeholder="Confirm Password"
                  name="cpassword"
                  id="cpassword"
                />
                <div onClick={cpassHandler} className="cursor-pointer">
                  {showConPass ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
          </fieldset>
          <Link to="/login" className=" text-[12px] text-[#47A5C5]">
            Already user? Login{" "}
          </Link>
          <button className="w-full py-2 bg-[#FFD60A] text-black rounded-md">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
