import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { adminEndpoints, categoryEndpoint } from "../apis";

const {
  GET_ALL_USERS_API,
  GET_ALL_CONTACTS_API,
  GET_ALL_DEMO_BOOKINGS_API,
  DELETE_USER_API,
  DELETE_CONTACT_API,
  DELETE_DEMO_BOOKING_API,
  GET_ADMIN_STATS_API,
} = adminEndpoints;

// Get admin dashboard details
export const getAdminDashboardDetails = async (token) => {
  const toastId = toast.loading("Loading dashboard...");
  let result = null;
  try {
    const response = await apiConnector("GET", GET_ADMIN_STATS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch dashboard details");
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_ADMIN_STATS_API ERROR:", error);
    toast.error(error.response?.data?.message || "Could not fetch dashboard details");
  }
  toast.dismiss(toastId);
  return result;
};

// Get all users
export const getAllUsers = async (token) => {
  const toastId = toast.loading("Loading users...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_USERS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch users");
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_ALL_USERS_API ERROR:", error);
    toast.error(error.response?.data?.message || "Could not fetch users");
  }
  toast.dismiss(toastId);
  return result;
};

// Get all contacts
export const getAllContacts = async (token) => {
  const toastId = toast.loading("Loading contacts...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_CONTACTS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch contacts");
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_ALL_CONTACTS_API ERROR:", error);
    toast.error(error.response?.data?.message || "Could not fetch contacts");
  }
  toast.dismiss(toastId);
  return result;
};

// Get all demo bookings
export const getAllDemoBookings = async (token) => {
  const toastId = toast.loading("Loading demo bookings...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_DEMO_BOOKINGS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch demo bookings");
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_ALL_DEMO_BOOKINGS_API ERROR:", error);
    toast.error(error.response?.data?.message || "Could not fetch demo bookings");
  }
  toast.dismiss(toastId);
  return result;
};

// Delete user
export const deleteUser = async (userId, token) => {
  const toastId = toast.loading("Deleting user...");
  let result = false;
  try {
    const response = await apiConnector("DELETE", DELETE_USER_API, { userId }, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not delete user");
    }
    toast.success("User deleted successfully");
    result = true;
  } catch (error) {
    console.log("DELETE_USER_API ERROR:", error);
    toast.error(error.response?.data?.message || "Could not delete user");
  }
  toast.dismiss(toastId);
  return result;
};

// Delete contact
export const deleteContact = async (contactId, token) => {
  const toastId = toast.loading("Deleting contact...");
  let result = false;
  try {
    const response = await apiConnector("DELETE", DELETE_CONTACT_API, { contactId }, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not delete contact");
    }
    toast.success("Contact deleted successfully");
    result = true;
  } catch (error) {
    console.log("DELETE_CONTACT_API ERROR:", error);
    toast.error(error.response?.data?.message || "Could not delete contact");
  }
  toast.dismiss(toastId);
  return result;
};

// Delete demo booking
export const deleteDemoBooking = async (bookingId, token) => {
  const toastId = toast.loading("Deleting demo booking...");
  let result = false;
  try {
    const response = await apiConnector("DELETE", DELETE_DEMO_BOOKING_API, { bookingId }, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not delete demo booking");
    }
    toast.success("Demo booking deleted successfully");
    result = true;
  } catch (error) {
    console.log("DELETE_DEMO_BOOKING_API ERROR:", error);
    toast.error(error.response?.data?.message || "Could not delete demo booking");
  }
  toast.dismiss(toastId);
  return result;
};

// Get admin stats
export const getAdminStats = async (token) => {
  let result = null;
  try {
    const response = await apiConnector("GET", GET_ADMIN_STATS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch statistics");
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_ADMIN_STATS_API ERROR:", error);
    toast.error(error.response?.data?.message || "Could not fetch statistics");
  }
  return result;
};

// Create category (admin only)
export const createCategory = async (data, token) => {
  const toastId = toast.loading("Creating category...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      categoryEndpoint.CATEGORIES_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could not create category");
    }
    
    toast.success("Category created successfully");
    result = response.data.data;
  } catch (error) {
    console.log("CREATE_CATEGORY_API ERROR:", error);
    toast.error(error.response?.data?.message || "Could not create category");
  }
  toast.dismiss(toastId);
  return result;
};
