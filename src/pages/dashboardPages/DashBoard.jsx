import React, { createContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
import NavBar from "../../components/comman/NavBar";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/comman/Spinner";
import { setLoading } from "../../slices/authSlice";
export  const LoadingContext = createContext();
const DashBoard = () => {
  const dispatch=useDispatch();
  dispatch(setLoading(false));
  const location = useLocation();
  const [loading, setLoadingg] = useState(false);
    const authLoading = useSelector((state) => state.auth.loading);   
  const contextValue = {
    loading,
    setLoadingg,
  };
  return (
    <LoadingContext.Provider value={contextValue}>
      <div className="w-full relative mx-auto">
        <NavBar />
        {loading || authLoading ? (
          <Spinner />
        ) : (
          <div className="bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">
            <div className="flex flex-col max-w-maxContent bg-white/30 backdrop-blur-sm sm:flex-row mx-auto shadow-lg">
              <div className="md:w-[16%] sm:min-h-[calc(100vh-3.5rem)]">
                <Sidebar />
              </div>
              <div className="sm:w-[80%] h-full bg-white/50">
                <Outlet />
              </div>
            </div>
          </div>
        )}
      </div>
    </LoadingContext.Provider>
  );
};

export default DashBoard;
