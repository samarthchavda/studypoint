import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Player } from "video-react";
import "video-react/dist/video-react.css"; // import css
import YellowBtn from "../comman/YellowBtn";
import Spinner from "../comman/Spinner";
import { markAsComplete } from "../../services/operations/courseApi";
import toast from "react-hot-toast";

const VideoDetails = () => {
  const videoRef = useRef(null);
  const params = useParams();
  const [lectureEnded, setLectureEnded] = useState(false);
  const [subSection, setSubSection] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(null);
  const [subSectionIndex, setSubSectionIndex] = useState(null);
  const subSectionId = params.subSectionId;
  const sectionId = params.sectionId;
  const courseId = params.courseId;
  const sectionData = useSelector((state) => state.viewCourse.sectionData);
    const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const completedLectures = useSelector(
    (state) => state.viewCourse.completedLectures
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (sectionData?.length > 0) {
      const sectionIndex = sectionData.findIndex(
        (section) => section._id === sectionId
      );
      setSectionIndex(sectionIndex);
      const subSectionIndex = sectionData[sectionIndex].subSections.findIndex(
        (subSection) => subSection._id === subSectionId
      );
      setSubSectionIndex(subSectionIndex);
      setSubSection(sectionData[sectionIndex].subSections[subSectionIndex]);
      setLectureEnded(false);
    }
  }, [params.sectionId, params.subSectionId, sectionData]);

  //   const subSection = sectionData[
  //     sectionData?.findIndex((section) =>
  //       section?.subSections?.some(
  //         (subSection) => subSection._id === subSectionId
  //       )
  //     )
  //   ]?.subSections?.filter((subSection) => subSection?._id === subSectionId)[0];
  const navigate = useNavigate();
  const sectionLength = sectionData ? sectionData?.length : null;
  const lecturesLength = sectionData
    ? sectionData[sectionIndex]?.subSections?.length
    : null;

  const isFirstVideo = () => {
    return sectionData[0].subSections[0]._id === subSectionId;
  };

  const isLastVideo = () => {
    return (
      sectionData[sectionLength - 1].subSections[
        sectionData[sectionLength - 1].subSections.length - 1
      ]._id === subSectionId
    );
  };

  const nextVideo = () => {
    console.log(sectionIndex);
    if (
      sectionData[sectionIndex].subSections[lecturesLength - 1]._id ===
      subSectionId
    ) {
      navigate(
        `/view-course/${courseId}/sectionId/${
          sectionData[sectionIndex + 1]._id
        }/sub-sectionId/${sectionData[sectionIndex + 1].subSections[0]._id}`
      );
    } else {
      navigate(
        `/view-course/${courseId}/sectionId/${
          sectionData[sectionIndex]._id
        }/sub-sectionId/${
          sectionData[sectionIndex].subSections[subSectionIndex + 1]._id
        }`
      );
    }
  };

  const previousVideo = () => {
    if (sectionData[sectionIndex].subSections[0]._id === subSectionId) {
      navigate(
        `/view-course/${courseId}/sectionId/${
          sectionData[sectionIndex - 1]._id
        }/sub-sectionId/${
          sectionData[sectionIndex - 1].subSections[
            sectionData[sectionIndex - 1].subSections.length - 1
          ]._id
        }`
      );
    } else {
      navigate(
        `/view-course/${courseId}/sectionId/${
          sectionData[sectionIndex]._id
        }/sub-sectionId/${
          sectionData[sectionIndex].subSections[subSectionIndex - 1]._id
        }`
      );
    }
  };
  const videoEndHandler = () => {
    setLectureEnded(true);
  };

  const playAgainHandler = () => {
    videoRef.current.seek(0);
    setLectureEnded(false);
    videoRef.current.play();
  };

  const markAsCompleteHandler = async () => {
    const response = await markAsComplete(
      token,
      courseId,
      subSectionId,
      dispatch,
      setLoading,
      completedLectures
    );
    if (response?.success) {
      toast.success("lecture marked as completed");
    }
  };

  return subSection?.videoUrl ? (
    <div className="flex flex-col  mx-auto gap-4  w-full h-full">
      <div className="w-full h-full relative">
        <Player
          key={subSection?.videoUrl}
          ref={videoRef}
          onEnded={videoEndHandler}
        >
          <source src={subSection?.videoUrl} />
        </Player>
        {lectureEnded && (
          <div className="absolute left-0 top-0 z-10 flex flex-col items-center  justify-center gap-3 bg-gradient-to-t from-richblack-900 to-richblack-200/10 w-full h-full">
            {!completedLectures?.includes(subSectionId) && (
              <YellowBtn
                disabled={loading}
                text={loading ? "Loading..." : "Mark as Completed"}
                clickHandler={markAsCompleteHandler}
              />
            )}
            {
              <YellowBtn
                text={"ReWatch"}
                disabled={loading}
                bgColour={"#000814"}
                textColour={"#FFFFFF"}
                clickHandler={playAgainHandler}
              />
            }
            {!isLastVideo() && (
              <YellowBtn
                disabled={loading}
                text={"Next"}
                clickHandler={nextVideo}
              />
            )}
            {!isFirstVideo() && (
              <YellowBtn
                disabled={loading}
                text={"Previous"}
                bgColour={"#000814"}
                textColour={"#FFFFFF"}
                clickHandler={previousVideo}
              />
            )}
          </div>
        )}
      </div>
      <div className="pl-3 pb-3">
        <h2 className="text-richblack-5 text-3xl">{subSection.title}</h2>
        <p className="text-richblack-50">{subSection.description}</p>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default VideoDetails;
