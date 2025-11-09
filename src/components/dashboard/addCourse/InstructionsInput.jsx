import React from "react";
import Label from "../../comman/Label";
import ErrorMessage from "../../comman/ErrorMessage";

const InstructionsInput = ({
  instructions,
  setInstructions,
}) => {
  
  const handleChange = (e) => {
    const value = e.target.value;
    // Split by line breaks and filter out empty lines
    const instructionArray = value.split('\n').filter(line => line.trim() !== '');
    setInstructions(instructionArray);
  };

  return (
    <div className="flex flex-col gap-1">
      <Label
        forwhat={"instructions"}
        required={true}
        text={"Requirements/Instructions"}
      />
      <textarea
        className="field2"
        id="instructions"
        name="instructions"
        rows={6}
        onChange={handleChange}
        placeholder="Enter instructions for the course (one per line)"
        defaultValue={instructions.join('\n')}
      />
      {instructions.length === 0 && (
        <ErrorMessage message="Please add at least one instruction" />
      )}
      
      {instructions.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-richblack-300">Preview ({instructions.length} instruction{instructions.length > 1 ? 's' : ''}):</p>
          <ul className="flex flex-col gap-1 mt-1">
            {instructions.map((item, index) => (
              <li key={index} className="text-sm text-richblack-25 flex items-start gap-2">
                <span className="text-yellow-50">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InstructionsInput;
