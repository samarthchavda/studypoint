import React, { useEffect } from "react";
import Label from "../../comman/Label";
import useFilePreview from "../../../hooks/useFilePreview";
import { useSelector } from "react-redux";
import ErrorMessage from "../../comman/ErrorMessage";
import ImViUpload from "./ImViUpload";
const ThumbnailUpload = ({ register, erros, watch }) => {
  const editCourse=useSelector((state)=>state.course.editCourse);
  const courseInfo  = useSelector((state) => state.course.courseInfo);
  const thumbnail= courseInfo?.thumbnail;
  const file = watch("thumbnail");
  const [filePreview, setFilePreview] = useFilePreview(file);
  return ( 
    <>
      {filePreview || thumbnail ? (
        <div className="flex flex-col items-center gap-3 border-dashed border-[1.5px] rounded-lg border-primary-300 py-4 px-3 bg-primary-50">
          <img className="h-60 w-fit rounded-lg shadow-md" src={filePreview || thumbnail} alt="" />
          <label className="rounded-lg font-semibold text-white cursor-pointer h-fit bg-gradient-to-r from-primary-500 to-primary-600 py-3 px-6 items-center flex gap-2 hover:shadow-lg hover:scale-105 transition-all" htmlFor="thumbnail">Select other thumbnail</label>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <Label
            text={"Course Thumbnail"}
            required={true}
            forwhat={"thumbnail"}
          />
         <ImViUpload forwhat={'thumbnail'}/>
         
        </div>
      )}

      <input
        className="hidden"
        id="thumbnail"
        {...register("thumbnail")}
        type="file"
      />
      
    </>
  );
};

export default ThumbnailUpload;
