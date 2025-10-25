import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector,useDispatch } from "react-redux";
import { MdKeyboardArrowLeft } from "react-icons/md";
import YellowBtn from "../../comman/YellowBtn";
import { deleteCourseInfo, setEditCourse, setStep } from "../../../slices/courseSlice";
import { editCourseDetails } from "../../../services/operations/courseApi";
import { useNavigate } from "react-router-dom";
import SubmitBtn from "../../comman/SubmitBtn"; 
const Publish = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const courseInfo = useSelector((state) => state.course.courseInfo);
    const { token } = useSelector((state) => state.auth);
  const navigate=useNavigate();
  const submitHanlder = (data,event) => {
    event.preventDefault();
    const formData=new FormData();
    formData.append("courseId",courseInfo._id);
    formData.append("status",data.publish?data.publish:'draft');
    dispatch(editCourseDetails(token,formData,courseInfo,1));
    dispatch(deleteCourseInfo);
    dispatch(setEditCourse(false));
    dispatch(setStep(1));
    navigate('/dashboard/my-courses'); 
  }
  const dispatch = useDispatch();
  return (
    <div className=" ml-6 rounded-lg ">
      <form onSubmit={handleSubmit(submitHanlder)} className="flex flex-col gap-20">
        <div className="flex p-6 rounded-lg bg-richblack-800 flex-col gap-4">
          <h2 className="font-semibold text-richblack-5 text-2xl">
            Publish Settings
          </h2>
          <div className="flex gap-2">
            <input value={'published'} {...register('publish')} type="checkbox" name="publish" id="publish" />
            <label className="text-richblack-400 font-medium" htmlFor="publish">
              Make this course public
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <YellowBtn
            bgColour="#161D29"
            textColour="#F1F2FF"
            clickHandler={() => {
              dispatch(setStep(2));
            }}
            text={
              <>
                <MdKeyboardArrowLeft className="text-xl" /> Back
              </>
            }
          />
            <SubmitBtn text={'Save'}/>
        </div>
      </form>
    </div>
  );
};

export default Publish;
