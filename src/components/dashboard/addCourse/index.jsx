import React, { useEffect } from "react";

import RenderSteps from "./RenderSteps";
import StepDots from "./StepDots";
import Tips from "./Tips";
import { setCourseInfo, setEditCourse, setStep } from "../../../slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";

const AddCourse = () => {
  const editCourse=useSelector((state) => state.course.editCourse);
  const dispatch = useDispatch();
  useEffect(()=>{
    return ()=>{
      // dispatch(setCourseInfo(null));
      // dispatch(setStep(1));
      // dispatch(setEditCourse(false));
    }
  },[])
  return (
    <RenderSteps/>    
  );
};

export default AddCourse;
