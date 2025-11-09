import React, { useEffect, useState } from "react";
import { getAdminDashboardDetails } from "../../../services/operations/adminapi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/comman/Spinner";
import CategoryPieChart from "../../../components/dashboard/adminDashbboard/CategoryPieChart";
import InstructorPolarChart from "../../../components/dashboard/adminDashbboard/InstructorPolarChart";
import TopSellingCoursesChart from "../../../components/dashboard/adminDashbboard/TopSellingCoursesChart";
import Stats from "../../../components/dashboard/adminDashbboard/Stats";

const AdminDash = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [mstSoldCrs, setMstSoldCrs] = useState([]);
  const [catWiseCrs, setCatWiseCrs] = useState([]);
  const [topIns, setTopIns] = useState([]);
  const [stats, setStats] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAdminDashboardDetails(token);
        console.log("Admin dashboard response:", response);
        if (response) {
          setCatWiseCrs(response?.categoryWiseCourses || []);
          setMstSoldCrs(response?.mostSellingCourses || []);
          setStats(response?.stats || []);
          setTopIns(response?.topInstructors || []);
        }
      } catch (error) {
        console.error("Error fetching admin dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (token) {
      fetchData();
    }
  }, [token]);
  return loading ? (
    <Spinner />
  ) : (
    <div className="sm:ml-6 sm:mb-6 ml-3 pb-3 md:w-full w-11/12 flex flex-col">
      <h1 className="text-3xl font-bold text-richblack-5 mb-4">Admin Dashboard</h1>
      
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => navigate("/dashboard/admin/users")}
          className="bg-yellow-50 text-richblack-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-25 transition-all text-center"
        >
          👥 Manage Users
        </button>
        <button
          onClick={() => navigate("/dashboard/admin/courses")}
          className="bg-yellow-50 text-richblack-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-25 transition-all text-center"
        >
          📚 Manage Courses
        </button>
        <button
          onClick={() => navigate("/dashboard/create-category")}
          className="bg-yellow-50 text-richblack-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-25 transition-all text-center"
        >
          📁 Create Category
        </button>
        <button
          onClick={() => navigate("/dashboard/admin")}
          className="bg-richblack-700 text-richblack-5 py-3 px-6 rounded-lg font-semibold hover:bg-richblack-600 transition-all text-center"
        >
          📊 Dashboard Stats
        </button>
      </div>

      <div className="mb-5">
        <Stats data={stats[0]} />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <CategoryPieChart categoryData={catWiseCrs} />
        <InstructorPolarChart insData={topIns[0]} />
        <div className="md:col-span-2">
          <TopSellingCoursesChart courseData={mstSoldCrs} />
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
