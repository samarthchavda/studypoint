import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Label from "../../comman/Label";
import ErrorMessage from "../../comman/ErrorMessage";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { getAllCategory } from "../../../services/operations/CategoryApi";
import {
  setLoading,
  setStep,
} from "../../../slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../comman/Spinner";
import ThumbnailUpload from "./ThumbnailUpload";
import InstructionsInput from "./InstructionsInput";
import { MdKeyboardArrowRight } from "react-icons/md";
import SubmitBtn from "../../comman/SubmitBtn";
import toast from "react-hot-toast";
import { createCourse } from "../../../services/operations/courseApi";
import { editCourseDetails } from "../../../services/operations/courseApi";
import YellowBtn from "../../comman/YellowBtn";
const CourseInformation = () => {
  const navigate = useNavigate();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isDirty,dirtyFields },
  } = useForm();
  const [categories, setCategories] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const loading = useSelector((state) => state.course.loading);
  const courseInfo = useSelector((state) => state.course.courseInfo);
  const thumnailPreview = courseInfo?.thumbnail;
  const editCourse = useSelector((state) => state.course.editCourse);
  const dispatch = useDispatch();
  const thumbanil = watch("thumbnail");

  // useEffect(()=>{
  //   return ()=>{
  //     dispatch(setCourseInfo(null));
  //     dispatch(setStep(1));
  //     }
  // })
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory(dispatch, setLoading);
        if (response?.data?.data) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.log("error while fetching categories", error);
      }
    };
    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    if (editCourse && courseInfo) {
      setValue("courseTitle", courseInfo.courseName);
      setValue("courseDesc", courseInfo.courseDescription);
      setValue("benefits", courseInfo.whatYouWillLearn);
      setValue("price", courseInfo.price);
      setValue("category", courseInfo.category._id, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setInstructions([...courseInfo.instructions]);
    } else {
      reset();
      setInstructions([]);
    }
  }, [editCourse, courseInfo, reset, setValue]);

  const isFormUpdated = () => {
    if (!editCourse || !courseInfo) return false; // If not in edit mode or no courseInfo, don't check for updates
    
    if (
      getValues("courseTitle") !== courseInfo.courseName ||
      getValues("courseDesc") !== courseInfo.courseDescription ||
      getValues("price") !== courseInfo.price ||
      getValues("category") !== courseInfo.category._id ||
      getValues("benefits") !== courseInfo.whatYouWillLearn
    ) {
      return true;
    }
    if (!compareArrays(instructions, courseInfo.instructions)) {
      return true;
    }
    if (thumbanil[0]) return true;
    return false;
  };

  const compareArrays = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((item, index) => item === arr2[index]);
  };

  const submitHandler = async (data) => {
    console.log("Form data:", data);
    console.log("Instructions:", instructions);
    console.log("Dirty fields:", dirtyFields);
    
    if (!editCourse) {
      if (!data.thumbnail[0]) {
        toast.error("please upload thumbnail");
        return;
      }
      if (instructions.length === 0) {
        toast.error("Please add at least one instruction");
        return;
      }
      
      const formData = new FormData();
      formData.append("thumbnailImage", data.thumbnail[0]);
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseDesc);
      formData.append("whatYouWillLearn", data.benefits);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("tag", JSON.stringify([])); // Empty tags array
      formData.append("instructions", JSON.stringify(instructions));
      formData.append("status", "published"); // Publish directly
      
      console.log("Sending course creation request...");
      console.log("Instructions being sent:", JSON.stringify(instructions));
      
      dispatch(createCourse(token, formData, courseInfo, setLoading, navigate));
    } else {
      // Edit mode
      // If courseInfo is null in edit mode, treat as new course
      if (!courseInfo) {
        // Create as new course instead
        if (!data.thumbnail[0]) {
          toast.error("please upload thumbnail");
          return;
        }
        if (instructions.length === 0) {
          toast.error("Please add at least one instruction");
          return;
        }
        const formData = new FormData();
        formData.append("thumbnailImage", data.thumbnail[0]);
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseDesc);
        formData.append("whatYouWillLearn", data.benefits);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("tag", JSON.stringify([]));
        formData.append("instructions", JSON.stringify(instructions));
        formData.append("status", "published");
        dispatch(createCourse(token, formData, courseInfo, setLoading, navigate));
        return;
      }
      
      const formData = new FormData();
      if (data?.thumbnail[0]) {
        formData.append("thumbnailImage", data.thumbnail[0]);
      }
      
      if (data.courseTitle !== courseInfo.courseName) {
        formData.append("courseName", data.courseTitle);
      }
      if (data.courseDesc !== courseInfo.courseDescription) {
        formData.append("courseDescription", data.courseDesc);
      }
      if (data.benefits !== courseInfo.whatYouWillLearn) {
        formData.append("whatYouWillLearn", data.benefits);
      }
      if (data.price !== courseInfo.price) {
        formData.append("price", data.price);
      }
      if (data.category !== courseInfo.category._id) {
        formData.append("category", data.category);
      }
      if (!compareArrays(instructions, courseInfo.instructions)) {
        formData.append("instructions", JSON.stringify(instructions));
      }
      
      formData.append("courseId", courseInfo._id);
      formData.append("status", "published"); // Keep as published
      
      // Find the selected category object
      const selectedCategory = categories.find(cat => cat._id === data.category);
      
      const updCourse = {
        ...courseInfo,
        courseName: data.courseTitle,
        courseDescription: data.courseDesc,
        whatYouWillLearn: data.benefits,
        price: data.price,
        category: selectedCategory || courseInfo.category,
        tag: [],
        instructions: instructions,
        thumbnail: data.thumbnail[0]
            ? URL.createObjectURL(data.thumbnail[0])
            : thumnailPreview,
      };
      console.log(updCourse,"upd course");
      dispatch(editCourseDetails(token, formData, updCourse, navigate));
    }
  };
  const downHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  return loading ? (
    <div className="flex h-full w-full justify-center items-center">
      {" "}
      <Spinner />{" "}
    </div>
  ) : (
    <form
      onKeyDown={downHandler}
      onSubmit={handleSubmit(submitHandler)}
      className="md:ml-5 ml-3  flex rounded-lg border border-richblack-700 flex-col gap-5 bg-[#161D29] p-6"
    >
      <div className="flex flex-col gap-1">
        <Label text={"Course Title"} forwhat={"courseTitle"} required={true} />
        <input
          className="field2"
          {...register("courseTitle", {
            required: { value: true, message: "course title is required" },
          })}
          placeholder="Enter Course Title"
          type="text"
          name="courseTitle"
          id="courseTitle"
        />
        {errors.courseTitle && (
          <ErrorMessage message={errors.courseTitle.message} />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label
          text={"Course Short Description"}
          forwhat={"courseDesc"}
          required={true}
        />
        <textarea
          className="field2"
          rows={6}
          {...register("courseDesc", {
            required: {
              value: true,
              message: "Course Short Description is required",
            },
          })}
          placeholder="Enter Course Description"
          type="text"
          name="courseDesc"
          id="courseDesc"
        />
        {errors.courseDesc && (
          <ErrorMessage message={errors.courseDesc.message} />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label text={"Price"} forwhat={"price"} required={true} />
        <div className="flex gap-1 items-center field2">
          <RiMoneyRupeeCircleLine className="text-[#585D69] text-3xl" />
          <input
            className="w-full outline-none bg-[#2C333F] text-[rgba(153,157,170,1)] pl-1"
            {...register("price", {
              required: { value: true, message: "Price is required" },
            })}
            placeholder="Enter Price"
            type="text"
            name="price"
            id="price"
          />
        </div>
        {errors.price && <ErrorMessage message={errors.price.message} />}
      </div>

      <div className="flex flex-col gap-1">
        <Label text={"Category"} forwhat={"category"} required={true} />
        <select
          {...register("category", {
            required: { value: true, message: "Category is required" },
          })}
          name="category"
          className="field2 cursor-pointer"
          id="category"
          defaultValue=""
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {categories?.map((item, index) => (
            <option key={index} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.category && <ErrorMessage message={errors.category.message} />}
      </div>

      <ThumbnailUpload watch={watch} register={register} erros={errors} />

      <div className="flex flex-col gap-1">
        <Label
          text={"Benefits of the Course"}
          forwhat={"benefits"}
          required={true}
        />
        <textarea
          className="field2"
          rows={6}
          {...register("benefits", {
            required: {
              value: true,
              message: "Course benefits are required",
            },
          })}
          placeholder="Enter Course benefits"
          type="text"
          name="benefits"
          id="benefits"
        />
        {errors.benefits && <ErrorMessage message={errors.benefits.message} />}
      </div>

      <InstructionsInput
        instructions={instructions}
        setInstructions={setInstructions}
      />
      <div className="self-end flex gap-2">
        <SubmitBtn
          text={
            <>
              {editCourse ? (
                "Save changes"
              ) : (
                <>
                  Create & Publish Course
                </>
              )}
            </>
          }
        />
      </div>
    </form>
  );
};
export default CourseInformation;
