import React from "react";
import Label from "../../comman/Label";
import ErrorMessage from "../../comman/ErrorMessage";
import { RxCross2 } from "react-icons/rx";
const Tags = ({ setValue,allTags, register, errors, setAllTags, watch, getValues }) => {
  const tagWatch = watch("tags");
  const clickHandler =(e)=>{
    if (tagWatch) {
      const value = tagWatch.replace(" ", "_");
      const updTags = [...allTags, value];
      e.target.value = "";
      setAllTags(updTags);
      setValue("tags", "");
    }
  }
  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      const value = getValues("tags");
      if (value && value.trim()) {
        const updValue=value.replace(' ','_');
        const updTags = [...allTags, updValue];
        setAllTags(updTags);
        e.target.value = "";
      }
    }
  };
  const removeTag = (index) => {
    allTags.splice(index,1);
    const updTags=[...allTags];
    setAllTags(updTags);
  };
  return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label text={"Tags"} forwhat={"tags"} required={true} />
          <input
            className="field2"
            {...register("tags", {
              pattern:{value:/[\w]+/,message:"only character and digits are allowed"}
            })}
            placeholder="Enter Tags"
            type="text"
            name="tags"
            id="tags"
            onKeyDown={keyDownHandler}
          />
           <span
        onClick={clickHandler}
        className="font-bold cursor-pointer text-sm text-[#FFD60A]"
      >
        Add
      </span>
            {errors.tags && <ErrorMessage message={errors.tags.message} />}
        </div>
       
        {allTags && allTags.length > 0 && (
          <ul className="flex  gap-3">
            {allTags.map((item, index) => (
              <li
                key={index}
                className="bg-[#FFD60A] flex items-center  gap-1 p-1 text-black rounded-lg"
              >
                {item}
                <span className="cursor-pointer"
                  onClick={(e) => {
                    removeTag(index);
                  }}
                >
                  <RxCross2 />
                </span>
              </li>
            ))}
          </ul>
        )}
         
      </div>
    
  );
};

export default Tags;
