import toast from "react-hot-toast";
import apiConnector from "../apiConnector";
import { profileEndpoint } from "../apis";
import { setLoading, setUser } from "../../slices/profileSlice";
import { setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setDP } from "../../slices/profileSlice";
const {
  GETUSERDETAILS,
  UPDATEPROFILE,
  DELETEPROFILE,
  UPDATEDPAPI,
  GET_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_COURSES_API,
  GET_INSTRUCTOR_DASHBOARD_INFO_API,
} = profileEndpoint;

export function getUserDetails(token, setLoading, setUserDetails) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const response = await apiConnector(
        "GET",
        GETUSERDETAILS,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response.data.success) {
        // console.log("user data from db",response);
        setUserDetails(response.data.user);
      }
    } catch (error) {
      console.log("error in getuserdetails operation", error.message);
    }
    setLoading(false);
  };
}

export function updateProfile(token, payload, setLoading) {
  return async (dispatch) => {
    const tId = toast.loading("loading");
    setLoading(true);
    try {
      const response = await apiConnector("PUT", UPDATEPROFILE, payload, {
        Authorization: `Bearer ${token}`,
      });
      if (response.data.success) {
        console.log("successfully updated Profile");
        toast.success("profile Upadted!!!");
        toast.dismiss(tId);
      } else {
        toast.error("something went wrong!");
        toast.dismiss(tId);
      }
    } catch (error) {
      console.log("error in updateProfile operaion", error.message);
    }
    setLoading(false);
  };
}

export function deleteAccount(token, navigate, setLoading) {
  return async (dispatch) => {
    const tId = toast.loading("deleting...");
    setLoading(true);
    // dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "DELETE",
        DELETEPROFILE,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response.data.success) {
        dispatch(setToken(null));
        dispatch(resetCart());
        dispatch(setUser(null));
        localStorage.clear();
        toast.success("Accont Deleted!");
        navigate("/");
      } else {
        toast.error("something went wrong!");
      }
    } catch (error) {
      console.log("error while deleting account operation", error.message);
    } finally {
      setLoading(false);
      toast.dismiss(tId);
      // dispatch(setLoading(false));
    }
  };
}

export function updateDP(token, formData) {
  return async (dispatch) => {
    const tId = toast.loading("updating...");
    try {
      const response = await apiConnector("PUT", UPDATEDPAPI, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
      if (response.data.success) {
        dispatch(setDP(response.data.url));
        const user = JSON.parse(localStorage.getItem("user"));
        const updatedUser = { ...user, image: response.data.url };
        // console.log(updatedUser);
        const updatedUserJson = JSON.stringify(updatedUser);
        // console.log(updatedUserJson);
        localStorage.setItem("user", updatedUserJson);
        toast.success("Profile picture updated");
      }
    } catch (error) {
      toast.error("faild to update profile picture");
      console.log("error while update dp operation", error.message);
    }
    toast.dismiss(tId);
  };
}

export async function getEnrolledCourses(token) {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.enrolledCourses;
  } catch (error) {
    console.log("error in getEnrolled courses api", error);
    toast.error("could not get Enrolled courses");
  }
  return result;
}

export async function getInstructorCourses(token, dispatch) {
  dispatch(setLoading(true));
  try {
    const response = await apiConnector(
      "GET",
      GET_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response.data.success) {
      dispatch(setLoading(false));
      return response.data.courses;
    }
  } catch (error) {
    console.log("error in getInstructor courses api", error);
    toast.error("could not get instructor courses");
  }
  dispatch(setLoading(false));
}

export async function getInstructorDashboardInfo(token, setLoading) {
  setLoading(true);
  try {
    var tId = toast.loading("loading");
    const response = await apiConnector(
      "GET",
      GET_INSTRUCTOR_DASHBOARD_INFO_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response?.data?.success) {
      return response.data.courses;
    }
  } catch (error) {
    console.log("error in getInstructorDashboardInfo api", error);
  } finally {
    toast.dismiss(tId);
    setLoading(false);
  }
}
