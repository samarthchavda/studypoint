import React from "react";

const YellowBtn = ({ clickHandler,widthFull, text, textColour, bgColour,disabled=false }) => {
  return (
    <button disabled={disabled}
      className={`rounded-lg font-semibold cursor-pointer justify-center h-fit py-3 px-6 items-center flex gap-1 hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
      style={{
        width:widthFull?'100%':'auto',
        color: textColour || "#ffffff",
        background: bgColour || "linear-gradient(to right, #0EA5E9, #0284C7)",
      }}
      onClick={() => clickHandler()}
    >
      {text}
    </button>
  );
};

export default YellowBtn;
