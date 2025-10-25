import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  createSection,
  updateSectionName,
} from "../../../services/operations/courseApi";
import ErrorMessage from "../../comman/ErrorMessage";
import YellowBtn from "../../comman/YellowBtn";
import { setEditCourse, setStep } from "../../../slices/courseSlice";
import { MdKeyboardArrowLeft,MdKeyboardArrowRight } from "react-icons/md";
import NestedView from "./NestedView";
import toast from "react-hot-toast";
const CourseBuilder = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const courseInfo = useSelector((state) => state.course.courseInfo);
    const { token } = useSelector((state) => state.auth);
  const sections = courseInfo.courseContent;
  const dispatch = useDispatch();
  const [editSection, setEditSection] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(null);
  const courseId = courseInfo._id;
  const editSectionNameHandler = (index) => {
    setEditSection(true);
    setSectionIndex(index);
    setValue("sectionName", sections[index].name);
  };
  const cancelEditHandler = () => {
    setEditSection(false);
    setValue("sectionName", "");
  };
  const submitHanlder = (data) => {
    if (editSection) {
      if (data.sectionName === sections[sectionIndex].name) {
        toast.error("change the section name");
        return;
      }
    }
    const payload = editSection
      ? {
          name: data.sectionName,
          sectionId: sections[sectionIndex]._id,
        }
      : {
          name: data.sectionName,
          courseId,
        };
    editSection
      ? dispatch(updateSectionName(token,payload,courseInfo,sectionIndex,setEditSection))
      : dispatch(createSection(token,payload,courseInfo));

    reset();
  };
  const nextStepHandler = () => {
    if (!sections || sections.length <= 0) {
        toast.error("Add at least one section in course");
        return;
    }
    if (!sections.every(section => section.subSections && section.subSections.length >= 1)) {
        toast.error("Add at least one lecture in each section");
        return;
    }
    dispatch(setStep(3));
};
  return (
    <div className="flex flex-col gap-10">
      <div className="back p-6 ml-6 flex flex-col gap-4">
        <h2 className="text-2xl text-richblack-5 font-semibold">
          Course Builder
        </h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((data) => submitHanlder(data))}
        >
          <input
            {...register("sectionName", {
              required: { value: true, message: "Enter Section Name" },
            })}
            type="text"
            className="field2"
            placeholder="Add a Section to build your course"
          />
          {errors.sectionName && (
            <ErrorMessage message={errors.sectionName.message} />
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex gap-1 w-fit items-center bg-richblack-800 border border-yellow-50 rounded-lg py-3 px-6 font-medium text-yellow-50"
            >
              <IoAddCircleOutline />
              {editSection ? "Edit Section Name" : "Create Section"}
            </button>
            {editSection && (
              <button
                type="button"
                onClick={() => cancelEditHandler()}
                className="text-richblack-400 text-sm font-semibold "
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
        {courseInfo?.courseContent?.length > 0 && (
          <NestedView editSectionNameHandler={editSectionNameHandler} />
        )}
      </div>
      <div className="self-end flex gap-4">
        <YellowBtn
          bgColour="#161D29"
          textColour="#F1F2FF"
          clickHandler={() => {
            dispatch(setStep(1));
          }}
          text={
            <>
              <MdKeyboardArrowLeft className="text-xl" /> Back
            </>
          }
        />
          <YellowBtn
          bgColour="#FFD60A"
          textColour="#000814"
          clickHandler={() => {
            nextStepHandler();
          }}
          text={
            <>
               Next <MdKeyboardArrowRight className="text-xl" />
            </>
          }
        />
      </div>
    </div>
  );
};

export default CourseBuilder;
