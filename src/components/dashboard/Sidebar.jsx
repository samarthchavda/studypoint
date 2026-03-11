import React, { useState,useRef } from "react";
import { sidebarLinks } from "../../data/dashboard-links";
import { NavLink, useNavigate } from "react-router-dom";
import SideBarLink from "./SideBarLink";
import { VscSignOut } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import { logout } from "../../services/operations/authApi";
import { useDispatch } from "react-redux";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import ConfirmationModal from "../comman/ConfirmationModal";
const Sidebar = () => {
  const location = useLocation();
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const handler=()=>{
    setConfirmationModal(false);
  }
  useOnClickOutside(modalRef, handler);
  const role = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).accountType
    : null;

  const matchRoute = (path) => {
    return location.pathname === path;
  };

  const clickHandler = (e) => {
    dispatch(logout(navigate));
  };
  return (
    <div className="h-full border-r-[1px] border-neutral-200 bg-white/50">
      <div className="relative pt-3 sm:pt-6 pb-3 sm:pb-0 flex h-full flex-col gap-2">
        <div className="w-full">
          {sidebarLinks.map((item, index) => {
            return item.type === role ||
              item.path === "/dashboard/my-profile" ||
              item.path === "/dashboard/settings" ? (
              <SideBarLink link={item} key={item.id} />
            ) : null;
          })}
        </div>
        <div className="w-[calc(100%-2rem)] mx-auto px-4 h-[1px] bg-neutral-200"></div>
        <div>
          <SideBarLink
            link={{
              name: "Settings",
              icon: "VscSettingsGear",
              path: "/dashboard/settings",
            }}
          />
        </div>
        <button
          onClick={()=>{setConfirmationModal(true)}}
          className="sm:pl-4 pl-2 flex gap-2 font-semibold items-center text-accent-600 hover:text-accent-700 transition-colors"
        >
          <VscSignOut />
          Log Out
        </button>
      </div>
      {/* modal */}
      {confirmationModal && <ConfirmationModal
      modalRef={modalRef}
      btn1Text="Cancel"
      btn2Text="Log Out"
      btn1Handler={handler}
      btn2Handler={clickHandler}
      />}
    </div>
  );
};

export default Sidebar;
