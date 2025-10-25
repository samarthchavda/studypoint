import React from "react";
import Label from "../../comman/Label";

const InstructionsInput = ({
  instructions,
  setInstructions,
  register,
  setValue,
  watch,
}) => {
  const instruction = watch("instruction");
  const clickHandler = () => {
    if (instruction) {
      const newIns = [...instructions, instruction];
      setInstructions(newIns);
      setValue('instruction', '');
    }
  };
  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      const value = instruction;
      if (value && value.trim()) {
        const newIns = [...instructions, instruction];
        setInstructions(newIns);
        e.target.value = "";
      }
    }
  };
  const removeInstruction = (index) => {
    instructions.splice(index, 1);
    const newIns = [...instructions];
    setInstructions(newIns);
  };
  return (
    <div>
      <div className="flex flex-col gap-1">
        <Label
          forwhat={"instruction"}
          required={true}
          text={"Requirements/Instructions"}
        />
        <input
          onKeyDown={keyDownHandler}
          className="field2"
          id="instruction"
          name="instruction"
          type="text"
          {...register("instruction")}
          placeholder="Enter instructions for the course"
        />
      </div>
      <span
        onClick={clickHandler}
        className="font-bold cursor-pointer text-sm text-[#FFD60A]"
      >
        Add
      </span>
      <ul className="flex flex-col mt-2 ">
        {instructions.map((item, index) => {
          return (
            <li key={index} className=" w-fit rounded-lg flex items-center">
              <p className="text-richblack-25 font-bold">{item}</p> 
              <span className="cursor-pointer text-richblack-400 pl-3 text-sm" onClick={()=>{removeInstruction(index)}}>clear</span>
            </li>
          );
        })}
      </ul>
      
    </div>
  );
};

export default InstructionsInput;
