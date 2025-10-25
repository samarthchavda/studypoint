import React from "react";

const HighlightedText = ({
  text,
  color1 = "#1FA2FF",
  color2 = "#12D8FA",
  color3 = "#A6FFCB",
}) => {
  return (
    <span
      className={`font-bold  text-transparent
             bg-clip-text text-4xl`}
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${color1}, ${color2}, ${color3})`,
      }}
    >
      {text}
    </span>
  );
};

export default HighlightedText;
