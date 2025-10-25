import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/operations/adminAPI";
import Spinner from "../../components/comman/Spinner";
import { FiTrash2, FiMail, FiUser } from "react-icons/fi";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../components/comman/ConfirmationModal";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      if (response?.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    const toastId = toast.loading("Deleting user...");
    try {
      const response = await deleteUser(userId);
      if (response?.success) {
        toast.success("User deleted successfully");
        setUsers(users.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      toast.dismiss(toastId);
      setConfirmationModal(null);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "All" || user.role === filterRole;

    return matchesSearch && matchesRole;
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
        <h1 className="text-3xl font-bold text-richblack-5">User Management</h1>
        <p className="text-richblack-300">
          Total Users:{" "}
          <span className="text-yellow-50 font-bold">{users.length}</span>
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-richblack-800 text-richblack-5 rounded-lg border border-richblack-700 focus:outline-none focus:border-yellow-50"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 bg-richblack-800 text-richblack-5 rounded-lg border border-richblack-700 focus:outline-none focus:border-yellow-50"
        >
          <option value="All">All Roles</option>
          <option value="Student">Students</option>
          <option value="Instructor">Instructors</option>
          <option value="Admin">Admins</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-richblack-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-richblack-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-50 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-50 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-50 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-50 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-50 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-richblack-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-richblack-300">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-richblack-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.image ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={user.image}
                              alt={user.firstName}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-yellow-50 flex items-center justify-center">
                              <FiUser className="text-richblack-900" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-richblack-5">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-richblack-300">
                        <FiMail className="mr-2" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "Admin"
                            ? "bg-red-500 text-white"
                            : user.role === "Instructor"
                            ? "bg-blue-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-richblack-300">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => {
                          setConfirmationModal({
                            text1: "Delete User",
                            text2: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDeleteUser(user._id),
                            btn2Handler: () => setConfirmationModal(null),
                          });
                        }}
                        className="text-red-500 hover:text-red-400"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default AdminUsers;