import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  token === null ? <Navigate to={'/login'}/> : <>{children}</>;
};

export default ProtectedRoute;
