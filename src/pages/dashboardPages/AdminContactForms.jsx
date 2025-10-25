import React, { useEffect, useState } from "react";
import {
  getAllContactForms,
  deleteContactForm,
  updateContactFormStatus,
} from "../../services/operations/adminAPI";
import Spinner from "../../components/comman/Spinner";
import { FiTrash2, FiMail, FiPhone } from "react-icons/fi";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../components/comman/ConfirmationModal";

const AdminContactForms = () => {
  const [contactForms, setContactForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchContactForms();
  }, []);

  const fetchContactForms = async () => {
    setLoading(true);
    try {
      const response = await getAllContactForms();
      if (response?.success) {
        setContactForms(response.data);
      }
    } catch (error) {
      console.error("Error fetching contact forms:", error);
      toast.error("Failed to fetch contact forms");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteForm = async (id) => {
    const toastId = toast.loading("Deleting contact form...");
    try {
      const response = await deleteContactForm(id);
      if (response?.success) {
        toast.success("Contact form deleted successfully");
        setContactForms(contactForms.filter((form) => form._id !== id));
      }
    } catch (error) {
      console.error("Error deleting contact form:", error);
      toast.error("Failed to delete contact form");
    } finally {
      toast.dismiss(toastId);
      setConfirmationModal(null);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await updateContactFormStatus(id, newStatus);
      if (response?.success) {
        toast.success("Status updated successfully");
        setContactForms(
          contactForms.map((form) =>
            form._id === id ? { ...form, status: newStatus } : form
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredForms = contactForms.filter((form) => {
    if (filterStatus === "All") return true;
    return form.status === filterStatus.toLowerCase();
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
        <h1 className="text-3xl font-bold text-richblack-5">Contact Forms</h1>
        <p className="text-richblack-300">
          Total: <span className="text-yellow-50 font-bold">{contactForms.length}</span>
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
          <option value="New">New</option>
          <option value="Read">Read</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Contact Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredForms.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-richblack-300">
            No contact forms found
          </div>
        ) : (
          filteredForms.map((form) => (
            <div
              key={form._id}
              className="bg-richblack-800 rounded-lg p-6 hover:bg-richblack-700 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-richblack-5">
                    {form.firstName} {form.lastName}
                  </h3>
                  <div className="flex items-center text-sm text-richblack-300 mt-1">
                    <FiMail className="mr-2" />
                    {form.email}
                  </div>
                  {form.phoneNo && (
                    <div className="flex items-center text-sm text-richblack-300 mt-1">
                      <FiPhone className="mr-2" />
                      {form.countrycode} {form.phoneNo}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <select
                    value={form.status}
                    onChange={(e) => handleStatusChange(form._id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded ${
                      form.status === "new"
                        ? "bg-green-500 text-white"
                        : form.status === "read"
                        ? "bg-yellow-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <button
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Delete Contact Form",
                        text2: "Are you sure you want to delete this contact form?",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteForm(form._id),
                        btn2Handler: () => setConfirmationModal(null),
                      });
                    }}
                    className="text-red-500 hover:text-red-400"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-richblack-900 p-4 rounded-lg">
                <p className="text-richblack-300 text-sm whitespace-pre-wrap">
                  {form.message}
                </p>
              </div>

              <div className="mt-4 text-xs text-richblack-400">
                Received: {new Date(form.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default AdminContactForms;