import React, { useEffect, useState } from "react";
import {
  getAllDemoBookings,
  deleteDemoBooking,
  updateDemoBookingStatus,
} from "../../services/operations/adminAPI";
import Spinner from "../../components/comman/Spinner";
import { FiTrash2, FiMail, FiPhone, FiCalendar, FiClock } from "react-icons/fi";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../components/comman/ConfirmationModal";

const AdminDemoBookings = () => {
  const [demoBookings, setDemoBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchDemoBookings();
  }, []);

  const fetchDemoBookings = async () => {
    setLoading(true);
    try {
      const response = await getAllDemoBookings();
      if (response?.success) {
        setDemoBookings(response.data);
      }
    } catch (error) {
      console.error("Error fetching demo bookings:", error);
      toast.error("Failed to fetch demo bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (id) => {
    const toastId = toast.loading("Deleting demo booking...");
    try {
      const response = await deleteDemoBooking(id);
      if (response?.success) {
        toast.success("Demo booking deleted successfully");
        setDemoBookings(demoBookings.filter((booking) => booking._id !== id));
      }
    } catch (error) {
      console.error("Error deleting demo booking:", error);
      toast.error("Failed to delete demo booking");
    } finally {
      toast.dismiss(toastId);
      setConfirmationModal(null);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await updateDemoBookingStatus(id, newStatus);
      if (response?.success) {
        toast.success("Status updated successfully");
        setDemoBookings(
          demoBookings.map((booking) =>
            booking._id === id ? { ...booking, status: newStatus } : booking
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredBookings = demoBookings.filter((booking) => {
    if (filterStatus === "All") return true;
    return booking.status === filterStatus.toLowerCase();
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-richblack-5">Demo Bookings</h1>
        <p className="text-richblack-300">
          Total: <span className="text-yellow-50 font-bold">{demoBookings.length}</span>
        </p>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-richblack-800 text-richblack-5 rounded-lg border border-richblack-700 focus:outline-none focus:border-yellow-50"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Demo Bookings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBookings.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-richblack-300">
            No demo bookings found
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-richblack-800 rounded-lg p-6 hover:bg-richblack-700 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-richblack-5">
                    {booking.firstName} {booking.lastName}
                  </h3>
                  <div className="flex items-center text-sm text-richblack-300 mt-1">
                    <FiMail className="mr-2" />
                    {booking.email}
                  </div>
                  {booking.phoneNo && (
                    <div className="flex items-center text-sm text-richblack-300 mt-1">
                      <FiPhone className="mr-2" />
                      {booking.countrycode} {booking.phoneNo}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded ${
                      booking.status === "pending"
                        ? "bg-yellow-500 text-white"
                        : booking.status === "completed"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Delete Demo Booking",
                        text2: "Are you sure you want to delete this demo booking?",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteBooking(booking._id),
                        btn2Handler: () => setConfirmationModal(null),
                      });
                    }}
                    className="text-red-500 hover:text-red-400"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {booking.courseName && (
                <div className="bg-richblack-900 p-3 rounded-lg mb-3">
                  <p className="text-sm text-richblack-300">
                    <span className="font-semibold text-richblack-5">Course:</span>{" "}
                    {booking.courseName}
                  </p>
                </div>
              )}

              {(booking.preferredDate || booking.preferredTime) && (
                <div className="bg-richblack-900 p-3 rounded-lg mb-3">
                  {booking.preferredDate && (
                    <div className="flex items-center text-sm text-richblack-300 mb-1">
                      <FiCalendar className="mr-2" />
                      {new Date(booking.preferredDate).toLocaleDateString()}
                    </div>
                  )}
                  {booking.preferredTime && (
                    <div className="flex items-center text-sm text-richblack-300">
                      <FiClock className="mr-2" />
                      {booking.preferredTime}
                    </div>
                  )}
                </div>
              )}

              {booking.message && (
                <div className="bg-richblack-900 p-3 rounded-lg mb-3">
                  <p className="text-richblack-300 text-sm whitespace-pre-wrap">
                    {booking.message}
                  </p>
                </div>
              )}

              <div className="mt-4 text-xs text-richblack-400">
                Booked: {new Date(booking.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default AdminDemoBookings;