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
    code: "",
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
    if (formData.password !== formData.cpassword) {
      toast.error("password didn't match");
      return;
    }
    // setIsLoggedIn(true);
    // toast.success('Account Created successfully');
    const data = {
      firstName: formData.fName,
      lastName: formData.lName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.cpassword,
      accountType: user,
    };
    console.log("signup data", data);
    dispatch(setSignupData(data));
    dispatch(sendOTP(formData.email, navigate));
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
            <label htmlFor="email">
              Email Address
              <span className="text-red-500 text-sm absolute">*</span>
            </label>
            <input
              onChange={changeHandler}
              value={formData.email}
              className="text-white rounded-md px-3 py-2 w-full outline-none bg-[#161D29]"
              type="email"
              required
              placeholder="Enter email address"
              name="email"
              id="email"
            />
          </div>

          {/* <div className="flex flex-col gap-1">
          <label htmlFor="phoneNumber">Phone Number<span className='text-red-500 text-sm absolute'>*</span></label>
          <div className="flex gap-3">
            <select className="text-white w-2/5 rounded-md px-3 py-2 outline-none bg-[#161D29]" name="code" id="code">
                {
                  countrycode.map((element,index)=>{
                    if(element.code==='+91') return <option selected value={element.code}>{element.code} {element.country}</option>
                    return <option value={element.code}>{element.code} {element.country}</option>
                  })
                }
            </select>
            
          <input
            onChange={changeHandler}
            value={formData.phoneNumber}
            className="text-white rounded-md px-3 py-2 w-full outline-none bg-[#161D29]"
            type="text"
            required
            placeholder="23671826718"
            name="phoneNumber"
            id="phoneNumber"
          />
          </div>
          
        </div> */}

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
