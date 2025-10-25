import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, getAllContactForms, getAllDemoBookings, getDashboardStats } from "../../services/operations/adminAPI";
import Spinner from "../../components/comman/Spinner";
import { FiUsers, FiMail, FiCalendar, FiBook, FiStar } from "react-icons/fi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentContactForms, setRecentContactForms] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await getDashboardStats();
        if (response?.success) {
          setStats(response.data.stats);
          setRecentUsers(response.data.recentUsers);
          setRecentContactForms(response.data.recentContactForms);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <FiUsers className="w-8 h-8" />,
      bgColor: "bg-blue-500",
      link: "/dashboard/admin/users",
    },
    {
      title: "Total Students",
      value: stats?.totalStudents || 0,
      icon: <FiUsers className="w-8 h-8" />,
      bgColor: "bg-green-500",
    },
    {
      title: "Total Instructors",
      value: stats?.totalInstructors || 0,
      icon: <FiUsers className="w-8 h-8" />,
      bgColor: "bg-purple-500",
    },
    {
      title: "Total Courses",
      value: stats?.totalCourses || 0,
      icon: <FiBook className="w-8 h-8" />,
      bgColor: "bg-yellow-500",
    },
    {
      title: "Contact Forms",
      value: stats?.totalContactForms || 0,
      subValue: `${stats?.newContactForms || 0} new`,
      icon: <FiMail className="w-8 h-8" />,
      bgColor: "bg-pink-500",
      link: "/dashboard/admin/contact-forms",
    },
    {
      title: "Demo Bookings",
      value: stats?.totalDemoBookings || 0,
      subValue: `${stats?.pendingDemoBookings || 0} pending`,
      icon: <FiCalendar className="w-8 h-8" />,
      bgColor: "bg-indigo-500",
      link: "/dashboard/admin/demo-bookings",
    },
    {
      title: "Total Reviews",
      value: stats?.totalReviews || 0,
      icon: <FiStar className="w-8 h-8" />,
      bgColor: "bg-orange-500",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-richblack-5 mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            onClick={() => stat.link && navigate(stat.link)}
            className={`${
              stat.link ? "cursor-pointer hover:scale-105" : ""
            } bg-richblack-800 rounded-lg p-6 transition-all duration-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-richblack-50 text-sm font-medium mb-1">
              {stat.title}
            </h3>
            <p className="text-3xl font-bold text-richblack-5">{stat.value}</p>
            {stat.subValue && (
              <p className="text-sm text-richblack-300 mt-1">{stat.subValue}</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-richblack-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-richblack-5">Recent Users</h2>
            <button
              onClick={() => navigate("/dashboard/admin/users")}
              className="text-yellow-50 hover:text-yellow-25 text-sm"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {recentUsers.length === 0 ? (
              <p className="text-richblack-300 text-center py-4">No users yet</p>
            ) : (
              recentUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-3 bg-richblack-700 rounded-lg"
                >
                  <div>
                    <p className="text-richblack-5 font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-richblack-300 text-sm">{user.email}</p>
                  </div>
                  <span className="text-xs bg-richblack-600 text-richblack-5 px-2 py-1 rounded">
                    {user.role}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Contact Forms */}
        <div className="bg-richblack-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-richblack-5">
              Recent Contact Forms
            </h2>
            <button
              onClick={() => navigate("/dashboard/admin/contact-forms")}
              className="text-yellow-50 hover:text-yellow-25 text-sm"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {recentContactForms.length === 0 ? (
              <p className="text-richblack-300 text-center py-4">
                No contact forms yet
              </p>
            ) : (
              recentContactForms.map((form) => (
                <div
                  key={form._id}
                  className="p-3 bg-richblack-700 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-richblack-5 font-medium">
                        {form.firstName} {form.lastName}
                      </p>
                      <p className="text-richblack-300 text-sm">{form.email}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        form.status === "new"
                          ? "bg-green-500 text-white"
                          : form.status === "read"
                          ? "bg-yellow-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {form.status}
                    </span>
                  </div>
                  <p className="text-richblack-300 text-sm line-clamp-2">
                    {form.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/dashboard/admin/users")}
          className="bg-yellow-50 text-richblack-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-25 transition-all"
        >
          Manage Users
        </button>
        <button
          onClick={() => navigate("/dashboard/admin/contact-forms")}
          className="bg-yellow-50 text-richblack-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-25 transition-all"
        >
          View Contact Forms
        </button>
        <button
          onClick={() => navigate("/dashboard/admin/demo-bookings")}
          className="bg-yellow-50 text-richblack-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-25 transition-all"
        >
          View Demo Bookings
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;