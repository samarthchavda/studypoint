import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../services/operations/profileApi";
import PersonalDetails from "../../components/dashboard/PersonalDetails";
import Spinner from "../../components/comman/Spinner";
import LocationBar from "../../components/dashboard/LocationBar";
const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const token=useSelector((state)=>state.auth.token);
  useEffect(() => {
    const fetchUserDetails = async () => {
      dispatch(getUserDetails(token,setLoading, setUserDetails));
    };
    fetchUserDetails();
  }, [dispatch]);
  const user=useSelector((state)=>state.profile.user);
  // useEffect(() => {
  //    console.log("user in profile", userDetails);
  // }, [userDetails]);
  return (
    <div className="h-full w-full"> 
      {loading ? (
        <div className="h-full flex justify-center items-center mx-auto w-full">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="sm:p-6 pl-2 sm:pl-6 pt-6 sm:pt-6">
            <LocationBar />
          </div>
          <PersonalDetails userDetails={userDetails} />
        </div>
      )}
    </div>
  );
};

export default Profile;
