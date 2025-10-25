import React, { useEffect, useState } from "react";
import { getAdminDashboardDetails } from "../../../services/operations/adminapi";
import { useSelector } from "react-redux";
import Spinner from "../../../components/comman/Spinner";
import CategoryPieChart from "../../../components/dashboard/adminDashbboard/CategoryPieChart";
import InstructorPolarChart from "../../../components/dashboard/adminDashbboard/InstructorPolarChart";
import TopSellingCoursesChart from "../../../components/dashboard/adminDashbboard/TopSellingCoursesChart";
import Stats from "../../../components/dashboard/adminDashbboard/Stats";
const AdminDash = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [mstSoldCrs, setMstSoldCrs] = useState([]);
  const [catWiseCrs, setCatWiseCrs] = useState([]);
  const [topIns, setTopIns] = useState([]);
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const fetchData = async (token) => {
      const response = await getAdminDashboardDetails(token, setLoading);
      if (response) {
        setCatWiseCrs(response?.categoryWiseCourses);
        setMstSoldCrs(response?.mostSellingCourses);
        setStats(response?.stats);
        setTopIns(response?.topInstructors);
      }
    };
    fetchData(token);
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <div className="sm:ml-6 sm:mb-6 ml-3 pb-3 md:w-full w-11/12  flex flex-col ">
      <h1>Admin DashBoard</h1>
      <div className="mb-5">
        <Stats data={stats[0]} />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
        <CategoryPieChart categoryData={catWiseCrs} />
        <InstructorPolarChart insData={topIns[0]} />
        <div className= "md:col-span-2 ">
          <TopSellingCoursesChart courseData={mstSoldCrs} />
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
