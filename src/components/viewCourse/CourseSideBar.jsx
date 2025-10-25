import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getFullCourseDetails,
  getFullEnrolledCourseDetails,
} from "../../services/operations/courseApi";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../comman/Spinner";
import SectionBarViewCourse from "./SectionBarViewCourse";
import ReviewModal from "../comman/ReviewModal";
import { IoChevronBackCircle } from "react-icons/io5";
import {
  setCompletedLectures,
  setEntireCourseData,
  setSectionData,
  setTotalLectures,
} from "../../slices/viewCourse";
import YellowBtn from "../comman/YellowBtn";
const CourseSidebar = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.course.loading);
  const { token } = useSelector((state) => state.auth);

  const sectionData = useSelector((state) => state.viewCourse.sectionData);
  const [reviewModal, setReviewModal] = useState(false);
  const modalRef = useRef(null);
  const entireCourseData = useSelector(
    (state) => state.viewCourse.entireCourseData
  );
  const completedLectures = useSelector(
    (state) => state.viewCourse.completedLectures
  );
  const totalLectures = useSelector((state) => state.viewCourse.totalLectures);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      const response = await getFullEnrolledCourseDetails(
        token,
        courseId,
        dispatch
      );
      if (response) {
        console.log(response);
        dispatch(setEntireCourseData(response));
        dispatch(setSectionData(response?.courseContent));
        const totalLectures = response?.courseContent?.reduce(
          (acc, section) => acc + section?.subSections?.length,
          0
        );
        dispatch(setTotalLectures(totalLectures));
        dispatch(setCompletedLectures(response?.completedLectures));
      } else {
        console.error("Failed to fetch course details");
      }
    };
    fetchCourseDetails();
    return () => {
      dispatch(setEntireCourseData(null));
      dispatch(setSectionData(null));
      dispatch(setTotalLectures(null));
      dispatch(setCompletedLectures(null));
    };
  }, []);
  const detailsList = document.querySelectorAll("details");
  detailsList.forEach((details) => {
    details.addEventListener("toggle", () => {
      if (details.open) {
        detailsList.forEach((otherDetails) => {
          if (otherDetails !== details) {
            otherDetails.removeAttribute("open");
          }
        });
      }
    });
  });

  return loading ? (
    <Spinner />
  ) : sectionData && sectionData.length > 0 ? (
    <div className="bg-richblack-800 pt-5 border-r-[1px] border-b-[1px] border-richblack-700 md:w-2/5 md:max-w-[300px] min-h-fit">
      <div className="flex justify-between mx-6">
        <Link to={"/dashboard/enrolled-courses"}>
          <IoChevronBackCircle className="text-4xl text-richblack-200" />
        </Link>
        <YellowBtn
          clickHandler={() => setReviewModal(true)}
          text={"Add Review"}
        />
      </div>
      <div className="border-b-[1px] pt-7 pb-3 border-richblack-600 mb-5 mx-6">
        <h1 className="text-[18px] font-bold  text-richblack-25">
          {entireCourseData?.name}
        </h1>
        <p className="text-richblack-500 text-sm font-semibold">
          <span>
            {completedLectures?.length}/{totalLectures}
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {sectionData?.map((section, index) => (
          <SectionBarViewCourse section={section} />
        ))}
      </div>
      {reviewModal && (
        <div className="fixed flex inset-0 justify-center items-center bg-richblack-900/80 z-20 h-full ">
            <ReviewModal
            modalRef={modalRef}
            disappearHandler={() => setReviewModal(false)}
          />
        </div>
      )}
    </div>
  ) : (
    <p>No Data Found</p>
  );
};

export default CourseSidebar;
