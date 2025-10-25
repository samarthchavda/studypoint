import React from "react";
import { MdSignalWifiStatusbarConnectedNoInternet1 } from "react-icons/md";
const YouAreOffline = () => {
  return (
    <div className="flex flex-col font-medium items-center justify-center h-screen">
      <MdSignalWifiStatusbarConnectedNoInternet1 className="text-4xl text-yellow-200"/>
      <h1 className="text-2xl text-richblack-400">You are offline</h1>
      <p className="text-xl text-richblack-400">Please check your internet connection.</p>
    </div>
  );
};

export default YouAreOffline;
