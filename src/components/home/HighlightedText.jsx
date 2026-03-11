import React from "react";

const HighlightedText = ({
  text,
  color1 = "#0EA5E9",
  color2 = "#D946EF",
  color3 = "#F97316",
}) => {
  return (
    <span
      className={`font-bold text-transparent
             bg-clip-text text-4xl lg:text-5xl`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${color1}, ${color2}, ${color3})`,
      }}
    >
      {text}
    </span>
  );
};

export default HighlightedText;
