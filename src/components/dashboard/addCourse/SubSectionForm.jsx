import React, { useState, useEffect, useRef } from "react";
import { ImCross } from "react-icons/im";
import Label from "../../comman/Label";
import ImViUpload from "./ImViUpload";
import { useForm } from "react-hook-form";
import useFilePreview from "../../../hooks/useFilePreview";
import ErrorMessage from "../../comman/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import SubmitBtn from "../../comman/SubmitBtn";
import {
  createSubsection,
  deleteSubSection,
  editSubSection,
} from "../../../services/operations/courseApi";
import toast from "react-hot-toast";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const SubSectionForm = ({
  ref,
  subSectionInfo,
  sectionIndex,
  removeForm,
  create = false,
  view = false,
  edit = false,
  dele = false,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const file = watch("video");
  const [videoPreview, setVideoPreview] = useFilePreview(file);
  const courseInfo = useSelector((state) => state.course.courseInfo);
  const loading = useSelector((state) => state.course.loading);
  const { token } = useSelector((state) => state.auth);

  // Add state for video duration
  const [videoDuration, setVideoDuration] = useState(null);
  const videoRef = useRef(null); // Ref for the video element
  const deleModalRef = useRef(null);

  // Populate form fields when in view/edit/delete mode
  useEffect(() => {
    if (view || edit || dele) {
      setValue("title", subSectionInfo.title);
      setValue("description", subSectionInfo.description);
    }
  }, [view, edit, dele, subSectionInfo, setValue]);

  // Fetch video duration when videoPreview or subSectionInfo.videoUrl changes
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedMetadata = () => {
      const durationInSeconds = videoElement.duration;
      setVideoDuration(durationInSeconds); // Duration in seconds
    };

    // Reset duration when video source changes
    setVideoDuration(null);

    if (videoPreview || subSectionInfo?.videoUrl) {
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    // Cleanup event listener
    return () => {
      if (videoElement) {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, [videoPreview, subSectionInfo?.videoUrl]);

  const deleteHandler = () => {
    if (loading) return;
    const payload = {
      subSectionId: subSectionInfo._id,
      sectionId: courseInfo.courseContent[sectionIndex]._id,
    };
    dispatch(deleteSubSection(token,payload, courseInfo, sectionIndex, removeForm));
  };

  useOnClickOutside(deleModalRef, removeForm);

  const submitHandler = (data) => {
    if (loading) return;
    else if (create) {
      const formData = new FormData();
      formData.append("videoFile", data.video[0]);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("sectionId", courseInfo.courseContent[sectionIndex]._id);
      formData.append("courseId", courseInfo._id);
      // Optionally append duration if needed in the backend
      if (videoDuration) formData.append("timeDuration", videoDuration);
      dispatch(
        createSubsection(token, formData, courseInfo, sectionIndex, removeForm)
      );
    } else if (edit) {
      if (
        (file ? (file[0] ? false : true) : true) &&
        subSectionInfo.title === data.title &&
        subSectionInfo.description === data.description
      ) {
        toast.error("No changes made");
        return;
      } else {
        const formData = new FormData();
        formData.append("subSectionId", subSectionInfo._id);
        formData.append("timeDuration", videoDuration);
        if (file?.[0]) {
          formData.append("videoFile", data.video[0]);
        }
        if (data.title !== subSectionInfo.title) {
          formData.append("title", data.title);
        }
        if (data.description !== subSectionInfo.description) {
          formData.append("description", data.description);
        }
        if (videoDuration) formData.append("duration", videoDuration);
        dispatch(
          editSubSection(token,formData, courseInfo, sectionIndex, removeForm)
        );
      }
    }
  };

  return (
    <div
      ref={ref}
      className="w-[95%] max-w-[450px] rounded-lg border border-richblack-700 "
    >
      <div className="flex py-6 px-4 justify-between rounded-t-lg items-center bg-richblack-700 border border-richblack-600">
        <h2 className="text-white">
          {create
            ? "Create Lecture"
            : view
            ? "View Lecture"
            : edit
            ? "Edit Lecture"
            : dele
            ? "Delete Lecture"
            : null}
        </h2>
        <button>
          <ImCross className="text-richblack-50" onClick={removeForm} />
        </button>
      </div>
      <div className="bg-richblack-800 rounded-b-lg p-8">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1">
            <Label text={"Video Lecture"} required={true} />
            {videoPreview || subSectionInfo?.videoUrl ? (
              <video
                ref={videoRef} // Attach ref to video element
                className="h-52 rounded-lg"
                controls
                src={videoPreview || subSectionInfo?.videoUrl}
              ></video>
            ) : (
              <ImViUpload forwhat={"video"} />
            )}
            {videoPreview || (subSectionInfo?.videoUrl && edit) ? (
              <button
                className="rounded-lg font-medium cursor-pointer self-end h-fit w-fit py-3 px-6 items-center flex gap-1 my-1 bg-[#C5C7D4]"
                type="button"
              >
                <label className="cursor-pointer" htmlFor="video">Select other lecture video</label>
              </button>
            ) : null}
            <input
              {...register("video")}
              className="hidden"
              type="file"
              id="video"
              name="video"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label text={"Lecture Title"} required={true} />
            <input
              readOnly={view || dele}
              {...register("title", {
                required: {
                  value: true,
                  message: "The lecture title is required",
                },
              })}
              className="field2"
              type="text"
              name="title"
              id="title"
            />
            {errors.title && <ErrorMessage message={errors.title.message} />}
          </div>

          <div className="flex flex-col gap-1">
            <Label text={"Lecture Description"} required={true} />
            <input
              readOnly={view || dele}
              {...register("description", {
                required: {
                  value: true,
                  message: "The lecture description is required",
                },
              })}
              className="field2"
              type="text"
              name="description"
              id="description"
            />
            {errors.description && (
              <ErrorMessage message={errors.description.message} />
            )}
          </div>
          <div className="flex justify-end">
            {edit || create ? (
              <SubmitBtn
                text={create ? "Create" : edit ? "Save Edits" : null}
              />
            ) : dele ? (
              <button
                onClick={deleteHandler}
                className="font-medium text-richblack-5 bg-red-800 border border-red-300 px-6 py-4 rounded-lg"
                type="button"
              >
                Delete Lecture
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubSectionForm;
