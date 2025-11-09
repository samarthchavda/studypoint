import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OpenRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  if (token) return <Navigate to={'/'} />; // or redirect to dashboard if needed
  return <>{children}</>;
};

export default OpenRoute;
