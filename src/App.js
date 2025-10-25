import { Navigate, Routes, useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import ResetForgotPassword from "./pages/ResetForgotPassword";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import DashBoard from "./pages/dashboardPages/DashBoard";
import Profile from "./pages/dashboardPages/Profile";
import Settings from "./pages/dashboardPages/Settings";
import EnrolledCourses from "./pages/dashboardPages/EnrolledCourses";
import WishList from "./pages/dashboardPages/WishList";
import MyCourses from "./pages/dashboardPages/InstructorPages/MyCourses";
import AddCourse from "./components/dashboard/addCourse";
import EditCourse from "./components/dashboard/Instructor/myCourses/EditCourse";
import CatalogPage from "./pages/CatalogPage";
import CourseInfoPage from "./pages/CourseInfoPage";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/viewCourse/VideoDetails";
import InsDash from "./components/dashboard/Instructor/instructorDashboard/InsDash";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import YouAreOffline from "./components/comman/YouAreOffline";
import AdminDash from "./pages/dashboardPages/AdminPages/AdminDash";
import CreateCategory from "./pages/dashboardPages/AdminPages/CreateCategory";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from '@vercel/analytics/react';

function App() {
  const user = useSelector((state) => state.profile.user);
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = async () => {
      setTimeout(() => {
        setIsOnline(true);
      }, 5000);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <div
      className={`font-inter w-screen overflow-x-hidden min-h-screen ${
        location.pathname.split("/").at(1) === "dashboard"
          ? "bg-richblack-800"
          : "bg-richblack-900"
      }`}
    >
      {isOnline ? (
        <>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signUp" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/verify-email" element={<Verify />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route
              path="/catalog/:catalogName"
              element={<CatalogPage />}
            ></Route>
            <Route
              path="/course/:courseId"
              element={<CourseInfoPage />}
            ></Route>
            <Route
              path="/forgot-password/:id"
              element={<ResetForgotPassword />}
            ></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<ContactPage />}></Route>
            <Route path="*" element={<NotFound />}></Route>
            {user && (
              <Route path="/dashboard" element={<DashBoard />}>
                {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <Route
                    index={true}
                    element={<Navigate to={"/dashboard/enrolled-courses"} />}
                  />
                )}
                {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                  <Route
                    index={true}
                    element={<Navigate to={"/dashboard/my-courses"} />}
                  />
                )}
                {user?.accountType === ACCOUNT_TYPE.ADMIN && (
                  <Route
                    index={true}
                    element={<Navigate to={"/dashboard/admin"} />}
                  />
                )}
                {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <>
                    <Route
                      element={<Navigate to={"/dashboard/enrolled-courses"} />}
                    />
                    <Route
                      path="enrolled-courses"
                      element={<EnrolledCourses />}
                    />
                    <Route path="wishList" element={<WishList />} />
                  </>
                )}
                {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                  <>
                    <Route path="my-courses" element={<MyCourses />} />
                    <Route path="add-course" element={<AddCourse />} />
                    <Route
                      path="edit-course/:courseId"
                      element={<EditCourse />}
                    />
                    <Route path="Instructor" element={<InsDash />} />
                  </>
                )}
                {user?.accountType === ACCOUNT_TYPE.ADMIN && (
                  <>
                    <Route path="admin" element={<AdminDash />} />
                    <Route
                      path="create-category"
                      element={<CreateCategory />}
                    />
                  </>
                )}
                <Route path="my-profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            )}

            <Route element={<ViewCourse />}>
              <Route
                path="/view-course/:courseId/sectionId/:sectionId/sub-sectionId/:subSectionId"
                element={<VideoDetails />}
              />
            </Route>
          </Routes>
          <SpeedInsights />
          <Analytics />
        </>
      ) : (
        <YouAreOffline />
      )}
    </div>
  );
}

export default App;
