import React from "react";
import { useNavigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  token === null ? navigate("/login") : <>{children}</>;
};

export default OpenRoute;
