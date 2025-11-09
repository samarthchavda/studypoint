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

  // Check if it's a YouTube URL
  const isYouTubeUrl = (url) => {
    return url?.includes('youtube.com') || url?.includes('youtu.be');
  };

  // Convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    
    // Handle youtu.be format
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Handle youtube.com/watch format
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url;
  };

  const isYouTube = isYouTubeUrl(subSection?.videoUrl);
  const embedUrl = isYouTube ? getYouTubeEmbedUrl(subSection?.videoUrl) : subSection?.videoUrl;

  // Function to open YouTube video in new tab
  const openYouTubeVideo = () => {
    if (subSection?.videoUrl) {
      window.open(subSection.videoUrl, '_blank');
    }
  };

  return subSection?.videoUrl ? (
    <div className="flex flex-col  mx-auto gap-4  w-full h-full">
      <div className="w-full h-full relative">
        {isYouTube ? (
          <div className="w-full flex flex-col items-center justify-center bg-richblack-800 rounded-lg p-8" style={{ minHeight: '400px' }}>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-richblack-5 mb-2">
                {subSection?.title}
              </h3>
              <p className="text-richblack-300 mb-6">
                Click the button below to watch this lecture on YouTube
              </p>
            </div>
            <button
              onClick={openYouTubeVideo}
              className="bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-bold py-4 px-8 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <svg 
                className="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Click Here to Watch Video
            </button>
          </div>
        ) : (
          <Player
            key={subSection?.videoUrl}
            ref={videoRef}
            onEnded={videoEndHandler}
          >
            <source src={subSection?.videoUrl} />
          </Player>
        )}
        {lectureEnded && !isYouTube && (
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
      
      {/* Navigation buttons for YouTube videos */}
      {isYouTube && (
        <div className="flex flex-wrap gap-3 justify-center pb-4">
          {!completedLectures?.includes(subSectionId) && (
            <YellowBtn
              disabled={loading}
              text={loading ? "Loading..." : "Mark as Completed"}
              clickHandler={markAsCompleteHandler}
            />
          )}
          {!isFirstVideo() && (
            <YellowBtn
              disabled={loading}
              text={"Previous Lecture"}
              bgColour={"#000814"}
              textColour={"#FFFFFF"}
              clickHandler={previousVideo}
            />
          )}
          {!isLastVideo() && (
            <YellowBtn
              disabled={loading}
              text={"Next Lecture"}
              clickHandler={nextVideo}
            />
          )}
        </div>
      )}
      
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
