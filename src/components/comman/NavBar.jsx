import React, { use, useEffect, useRef } from "react";
import logo from "../../assets/Logo/studypoint-logo.png";
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
import { defaultCategories } from "../../data/catalog-data";
const NavBar = () => {
  const boxRef = useRef(null);
  const mobileBoxRef = useRef(null);
  const modalRef = useRef(null);
  const [categories, setCategories] = useState(defaultCategories); // Use default categories
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
    // Try to fetch from API, but fallback to default if it fails
    apiConnector("GET", categoryEndpoint.CATEGORIES_API)
      .then((response) => {
        if (response?.data?.data && response.data.data.length > 0) {
          setCategories(response.data.data);
        }
      })
      .catch((error) => {
        console.log("Using default categories due to API error");
        setCategories(defaultCategories);
      });
  }, []);
  const token = useSelector((state) => state.auth.token);
  const totalItems = useSelector((state) => state.cart.totalItems);
  
  const showBox = (e) => {
    e.stopPropagation();
    if (boxRef.current.classList.contains("invisible")) {
      boxRef.current.classList.remove("invisible");
      boxRef.current.classList.remove("opacity-0");
      boxRef.current.classList.add("visible");
      boxRef.current.classList.add("opacity-100");
    } else {
      boxRef.current.classList.add("invisible");
      boxRef.current.classList.add("opacity-0");
      boxRef.current.classList.remove("visible");
      boxRef.current.classList.remove("opacity-100");
    }
  };

  const showMobileBox = (e) => {
    e.stopPropagation();
    if (mobileBoxRef.current.classList.contains("invisible")) {
      mobileBoxRef.current.classList.remove("invisible");
      mobileBoxRef.current.classList.remove("opacity-0");
      mobileBoxRef.current.classList.add("visible");
      mobileBoxRef.current.classList.add("opacity-100");
    } else {
      mobileBoxRef.current.classList.add("invisible");
      mobileBoxRef.current.classList.add("opacity-0");
      mobileBoxRef.current.classList.remove("visible");
      mobileBoxRef.current.classList.remove("opacity-100");
    }
  };

  const toggleMenu=()=>{
    if(catalogRef.current.classList.contains('invisible')){
      catalogRef.current.classList.remove('invisible');
      catalogRef.current.classList.remove('opacity-0');
      catalogRef.current.classList.add('visible');
      catalogRef.current.classList.add('opacity-100');
    }else{ 
      catalogRef.current.classList.add('invisible');
      catalogRef.current.classList.add('opacity-0');
      catalogRef.current.classList.remove('visible');
      catalogRef.current.classList.remove('opacity-100');
    }
  }
  
  // Close profile dropdown when clicking outside
  useOnClickOutside(boxRef, () => {
    if (boxRef.current && boxRef.current.classList.contains("visible")) {
      boxRef.current.classList.add("invisible");
      boxRef.current.classList.add("opacity-0");
      boxRef.current.classList.remove("visible");
      boxRef.current.classList.remove("opacity-100");
    }
  });

  useOnClickOutside(mobileBoxRef, () => {
    if (mobileBoxRef.current && mobileBoxRef.current.classList.contains("visible")) {
      mobileBoxRef.current.classList.add("invisible");
      mobileBoxRef.current.classList.add("opacity-0");
      mobileBoxRef.current.classList.remove("visible");
      mobileBoxRef.current.classList.remove("opacity-100");
    }
  });

  const logoutHandler = (e) => {
    setLogoutModal(false);
    dispatch(logout(navigate));
  };

  const checkForBgColour = (path, pos) => {
    return location.pathname.split("/").at(pos) === path;
  };

  return (
    <div
      className={`w-full bg-white/80 backdrop-blur-lg border-b-[1px] flex flex-col md:flex-row gap-2 md:gap-0 py-3 md:py-0 border-neutral-200 h-fit md:h-24 shadow-sm sticky top-0 z-50`}
    >
      <div className="w-11/12 mx-auto flex justify-between max-w-maxContent items-center h-full">
        <Link to="/" className="flex items-center h-full py-3">
          <img 
            className="h-20 w-auto md:h-20 object-contain max-w-[280px]" 
            src={logo} 
            alt="StudyPoint Logo"
            onError={(e) => {
              console.error('Logo failed to load:', logo);
              e.target.style.border = '2px solid red';
            }}
          />
        </Link>
        <nav className="hidden md:block">
          <ul className="flex gap-5">
            {NavbarLinks.map((item, index) => {
              return (
                <li key={index}>
                  {item.title === "Catalog" ? (
                    <div className="text-neutral-700 relative cursor-pointer">
                      <div onClick={()=>toggleMenu()} className={`${location.pathname.split('/').at(1)==='catalog'?"text-primary-600 font-semibold" :"text-neutral-700 hover:text-primary-600"} flex gap-1 items-center transition-colors duration-200`}>
                        Catalog
                        <IoIosArrowDropdown />
                      </div>
                      <div ref={catalogRef}  className=" invisible opacity-0 
                      transition-all z-30  duration-[250] 
                      absolute px-2 -translate-x-5  top-12 rounded-xl py-3 text-neutral-800 bg-white shadow-xl border border-neutral-200">
                        <div className="z-10 min-w-[15em] min-h-[5em] flex flex-col gap-1 justify-center relative ">
                          {categories.length === 0
                            ? "No Categroies have been created"
                            : categories.map((category, index) => {
                                return (
                                  <Link
                                    to={`/catalog/${category.name.replace(/ /g,"-")}`}
                                    className="px-10 rounded-lg font-medium py-2 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                                    key={index}
                                  >
                                    {category.name}
                                  </Link>
                                );
                              })}
                        </div>

                        <div className="bg-white h-20 w-20 absolute top-0 left-12 rotate-45 border-l border-t border-neutral-200"></div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      className={`${
                        location.pathname === `${item.path}`
                          ? "text-primary-600 font-semibold"
                          : "text-neutral-700 hover:text-primary-600"
                      } transition-colors duration-200`}
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
        <div className="hidden md:flex">
          {token === null ? (
            <div className="flex gap-3">
              <Link
                className="bg-white text-neutral-700 px-5 py-2 border-neutral-300 
                rounded-lg border-[1px] hover:bg-neutral-50 transition-all font-medium"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-5 py-2
                rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
                to="/signup"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="flex gap-4">
              {user?.accountType === "Student" ? (
                <Link to={"/dashboard/wishList"} className="relative ">
                  <IoCartOutline className="text-neutral-700 cursor-pointer h-7 w-7 hover:text-primary-600 transition-colors" />
                  {totalItems === 0 ? (
                    ""
                  ) : (
                    <div
                      className="h-5 w-5 rounded-full absolute right-0 
                      text-xs text-white -top-1 ball_animation bg-gradient-to-r from-accent-500 to-accent-600 flex justify-center items-center font-semibold shadow-md"
                    >
                      {totalItems}
                    </div>
                  )}
                </Link>
              ) : null}
              <div className="relative " onClick={showBox}>
                {user?.image ? (
                  <div
                    className="cursor-pointer rounded-full h-9 w-9 border-2 border-primary-400 hover:border-primary-600 transition-all"
                    style={{
                      backgroundImage: `url(${user.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                ) : (
                  <div className="cursor-pointer rounded-full h-9 w-9 border-2 border-primary-400 hover:border-primary-600 transition-all bg-primary-100 flex items-center justify-center">
                    <FaRegCircleUser className="text-primary-600 h-6 w-6" />
                  </div>
                )}
                <div
                  ref={boxRef}
                  className="flex flex-col rounded-xl gap-1 z-[2000] right-0 -bottom-24 invisible opacity-0 transition-all duration-200 text-neutral-700 absolute bg-white shadow-xl border border-neutral-200 px-3 py-2 min-w-[140px]"
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setLogoutModal(true);
                    }}
                    className="flex border-b-[1px] pb-2 mb-1 border-neutral-200 gap-2 cursor-pointer items-center hover:text-accent-600 transition-colors font-medium"
                  >
                    <MdLogout />
                    Logout
                  </div>
                  <Link
                    to={"/dashboard"}
                    className="flex gap-2 cursor-pointer items-center hover:text-primary-600 transition-colors font-medium"
                  >
                    <RiDashboard2Line />
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden w-11/12 mx-auto flex flex-col gap-3">
        <nav className="">
          <ul className="flex gap-5 justify-center">
            {NavbarLinks.map((item, index) => {
              return (
                <li key={index}>
                  {item.title === "Catalog" ? (
                    <div className="text-neutral-700 relative group cursor-pointer">
                      <div className={`${location.pathname.split('/').at(1)==='catalog'?"text-primary-600 font-semibold" :"text-neutral-700"} flex gap-1 items-center`}>
                        Catalog
                        <IoIosArrowDropdown />
                      </div>
                      <div className="group-hover:visible invisible opacity-0 group-hover:opacity-100 transition-all z-30 group-hover:-translate-y-2 duration-[250] absolute px-2 -translate-x-5 top-12 rounded-xl py-3 text-neutral-800 bg-white shadow-xl border border-neutral-200">
                        <div className="z-10 flex flex-col gap-1 relative">
                          {categories.length === 0
                            ? "No Categroies have been created"
                            : categories.map((category, index) => {
                                return (
                                  <Link
                                    to={`/catalog/${category.name.replace(/ /g,"-")}`}
                                    className="px-10 text-lg rounded-lg font-medium py-2 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                                    key={index}
                                  >
                                    {category.name}
                                  </Link>
                                );
                              })}
                        </div>

                        <div className="bg-white h-20 w-20 absolute top-0 left-12 rotate-45 border-l border-t border-neutral-200"></div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      className={`${
                        location.pathname === `${item.path}`
                          ? "text-primary-600 font-semibold"
                          : "text-neutral-700 hover:text-primary-600"
                      } transition-colors duration-200`}
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
          <div className="flex gap-3 justify-center">
            <Link
              className="bg-white text-neutral-700 px-4 py-2 border-neutral-300 
              rounded-lg border-[1px] hover:bg-neutral-50 transition-all font-medium"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2
              rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
              to="/signup"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 justify-center items-center">
            {user?.accountType === "Student" ? (
              <Link to={"/dashboard/wishList"} className="relative">
                <IoCartOutline className="text-neutral-700 cursor-pointer h-7 w-7 hover:text-primary-600 transition-colors" />
                {totalItems === 0 ? (
                  ""
                ) : (
                  <div
                    className="h-5 w-5 rounded-full absolute right-0 
                    text-xs text-white -top-1 ball_animation bg-gradient-to-r from-accent-500 to-accent-600 flex justify-center items-center font-semibold shadow-md"
                  >
                    {totalItems}
                  </div>
                )}
              </Link>
            ) : null}
            <div className="relative " onClick={showMobileBox}>
              {user?.image ? (
                <div
                  className="cursor-pointer rounded-full h-9 w-9 border-2 border-primary-400 hover:border-primary-600 transition-all"
                  style={{
                    backgroundImage: `url(${user.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              ) : (
                <div className="cursor-pointer rounded-full h-9 w-9 border-2 border-primary-400 hover:border-primary-600 transition-all bg-primary-100 flex items-center justify-center">
                  <FaRegCircleUser className="text-primary-600 h-6 w-6" />
                </div>
              )}
              <div
                ref={mobileBoxRef}
                className="flex flex-col rounded-xl gap-1 z-[2000] right-0 -bottom-24 invisible opacity-0 transition-all duration-200 text-neutral-700 absolute bg-white shadow-xl border border-neutral-200 px-3 py-2 min-w-[140px]"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setLogoutModal(true);
                  }}
                  className="flex border-b-[1px] pb-2 mb-1 border-neutral-200 gap-2 cursor-pointer items-center hover:text-accent-600 transition-colors font-medium"
                >
                  <MdLogout />
                  Logout
                </div>
                <Link
                  to={"/dashboard"}
                  className="flex gap-2 cursor-pointer items-center hover:text-primary-600 transition-colors font-medium"
                >
                  <RiDashboard2Line />
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
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
