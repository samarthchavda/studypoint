import React, { use, useEffect, useRef } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import {
  Link,
  matchRoutes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import apiConnector from "../../services/apiConnector";
import { IoIosArrowDropdown } from "react-icons/io";
import { categoryEndpoint } from "../../services/apis";
import { useState } from "react";
import { MdLogout } from "react-icons/md";
import { logout } from "../../services/operations/authApi";
import { RiDashboard2Line } from "react-icons/ri";
import ConfirmationModal from "./ConfirmationModal";
import useOnClickOutside from "../../hooks/useOnClickOutside";
const NavBar = () => {
  const boxRef = useRef(null);
  const modalRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [logutModal, setLogoutModal] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.profile.user);
  const catalogRef=useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  useOnClickOutside(modalRef, () => {
    setLogoutModal(false);
  });
  useEffect(() => {
    apiConnector("GET", categoryEndpoint.CATEGORIES_API)
      .then((response) => {
        if (response?.data?.data) {
          setCategories(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const token = useSelector((state) => state.auth.token);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const showBox = () => {
    if (boxRef.current.classList.contains("invisible")) {
      boxRef.current.classList.remove("invisible");
      boxRef.current.classList.add("visible");
    } else {
      boxRef.current.classList.add("invisible");
      boxRef.current.classList.remove("visible");
    }
  };

  const toggleMenu=()=>{
    if(catalogRef.current.classList.contains('invisible')){
      catalogRef.current.classList.remove('invisible');
      catalogRef.current.classList.remove('opacity-0');
      catalogRef.current.classList.add('visible');
      catalogRef.current.classList.add('opacity-100');
    }else{ catalogRef.current.classList.add('invisible');
      catalogRef.current.classList.add('opacity-0');
      catalogRef.current.classList.remove('visible');
      catalogRef.current.classList.remove('opacity-100');

    }
  }

  const logoutHandler = (e) => {
    setLogoutModal(false);
    dispatch(logout(navigate));
  };

  const checkForBgColour = (path, pos) => {
    return location.pathname.split("/").at(pos) === path;
  };

  return (
    <div
      className={`w-full ${
        checkForBgColour("dashboard", 1) ||
        checkForBgColour("sub-sectionId", -2) ||
        checkForBgColour("catalog", -2) ||
        checkForBgColour("course", -2)
          ? "bg-richblack-800"
          : "bg-richblack-900"
      } border-b-[0.5px] flex flex-col md:flex-row gap-2 md:gap-0 pt-2 pb-2 md:pb-0 md:pt-0 border-richblack-700 h-fit md:h-14`}
    >
      <div className="w-11/12 mx-auto flex justify-between max-w-maxContent items-center">
        <div className="">
          <img className="w-[160px] h-[32px]" src={logo} alt="" />
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-5">
            {NavbarLinks.map((item, index) => {
              return (
                <li key={index}>
                  {item.title === "Catalog" ? (
                    <div className="text-richblack-200 relative  cursor-pointer">
                      <div onClick={()=>toggleMenu()} className={`${location.pathname.split('/').at(1)==='catalog'?"text-[#FFD60A] font-bold" :"text-richblack-200"} flex gap-1 items-center`}>
                        Catalog
                        <IoIosArrowDropdown />
                      </div>
                      <div ref={catalogRef}  className=" invisible opacity-0 
                      transition-all z-30  duration-[250] 
                      absolute px-2 -translate-x-5  top-12 rounded-xl py-3 text-richblack-800 bg-richblack-25">
                        <div className="z-10 min-w-[15em] min-h-[5em] flex flex-col gap-1 justify-center relative ">
                          {categories.length === 0
                            ? "No Categroies have been created"
                            : categories.map((category, index) => {
                                return (
                                  <Link
                                    to={`/catalog/${category.name.replace(" ","-")}`}
                                    className="px-10  rounded-lg font-[550] py-1 hover:bg-richblack-50/80 "
                                    key={index}
                                  >
                                    {category.name}
                                  </Link>
                                );
                              })}
                        </div>

                        <div className="bg-richblack-25 h-20 w-20 absolute top-0 left-12 rotate-45"></div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      className={`${
                        location.pathname === `${item.path}`
                          ? "text-[#FFD60A] font-bold"
                          : "text-richblack-200"
                      }`}
                      to={item.path}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        {token === null ? (
          <div className="flex gap-4">
            <Link
              className="bg-richblack-800 text-richblack-50 px-4 py-2 border-richblack-600 
              rounded-lg border-[1px]"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="bg-richblack-800 text-richblack-50 px-4 py-2 border-richblack-600 
              rounded-lg border-[1px]"
              to="/signup"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div className="flex gap-4">
            {user?.accountType === "Student" ? (
              <Link to={"/dashboard/wishList"} className="relative ">
                <IoCartOutline className="text-white cursor-pointer h-8 w-8" />
                {totalItems === 0 ? (
                  ""
                ) : (
                  <div
                    className="h-4 w-4 rounded-full absolute right-0 
                    text-xs text-black -top-1 ball_animation bg-green-400 flex justify-center items-center"
                  >
                    {totalItems}
                  </div>
                )}
              </Link>
            ) : null}
            <div className="relative " onClick={showBox}>
              <div
                className="text-white cursor-pointer rounded-full h-8 w-8 "
                style={{
                  backgroundImage: `url(${user?.image})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <div
                ref={boxRef}
                className="flex flex-col rounded-lg gap-1 z-[2000] right-0 -bottom-20 invisible  text-richblack-200 absolute bg-richblack-700 px-3 py-2 "
              >
                {/* <div className=" h-10m w-10 top-0 left-0 rotate-45 bg-richblack-200"></div> */}
                <div
                  onClick={() => {
                    setLogoutModal(true);
                  }}
                  className="flex border-b-[1px] pb-1 border-richblack-200/50  gap-1 cursor-pointer items-center"
                >
                  <MdLogout />
                  Logout
                </div>
                <Link
                  to={"/dashboard"}
                  className="flex gap-1 cursor-pointer items-center"
                >
                  <RiDashboard2Line />
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="md:hidden mx-auto ">
        <nav className="">
          <ul className="flex gap-5">
            {NavbarLinks.map((item, index) => {
              return (
                <li key={index}>
                  {item.title === "Catalog" ? (
                    <div className="text-richblack-200 relative group cursor-pointer">
                      <div className="flex gap-1 items-center">
                        Catalog
                        <IoIosArrowDropdown />
                      </div>
                      <div className="group-hover:visible invisible opacity-0 group-hover:opacity-100 transition-all z-30 group-hover:-translate-y-2 duration-[250] absolute px-2 -translate-x-5  top-12 rounded-xl py-3 text-black bg-richblack-25">
                        <div className="z-10  flex flex-col gap-1 relative ">
                          {categories.length === 0
                            ? "No Categroies have been created"
                            : categories.map((category, index) => {
                                return (
                                  <Link
                                    to={`/catalog/${category.name}`}
                                    className="px-10 text-lg rounded-lg font-[550] py-1 hover:bg-richblack-100 "
                                    key={index}
                                  >
                                    {category.name}
                                  </Link>
                                );
                              })}
                        </div>

                        <div className="bg-richblack-25 h-20 w-20 absolute top-0 left-12 rotate-45"></div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      className={`${
                        location.pathname === `${item.path}`
                          ? "text-[#FFD60A] font-bold"
                          : "text-richblack-200"
                      }`}
                      to={item.path}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {logutModal && (
        <ConfirmationModal
          modalRef={modalRef}
          btn1Text={"Cancel"}
          btn1Handler={() => setLogoutModal(false)}
          btn2Handler={logoutHandler}
          btn2Text={"Log Out"}
        />
      )}
    </div>
  );
};

export default NavBar;
