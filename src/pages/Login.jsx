import React, { useState } from "react";
import img1 from "../assets/Images/login.webp";
import img2 from "../assets/Images/insLogin.jpg";
import Template from "../components/loginSignup/Template";
import NavBar from "../components/comman/NavBar";
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <NavBar />
      <Template
        insLoginImg={img2}
        stLoginImg={img1}
        type="login"
        setIsLoggedIn={setIsLoggedIn}
      ></Template>
    </div>
  );
};

export default Login;
