import React from "react";

const YellowBtn = ({ clickHandler,widthFull, text, textColour, bgColour,disabled=false }) => {
  return (
    <button disabled={disabled}
      className={`rounded-lg font-medium cursor-pointer justify-center
       h-fit
        py-3 px-6 items-center flex gap-1 border border-[#2C333F]`}
      style={{
        width:widthFull?'100%':'auto',
        color: textColour || "#000814",
        backgroundColor: bgColour || "#FFD60A",
      }}
      onClick={() => clickHandler()}
    >
      {text}
    </button>
  );
};

export default YellowBtn;
