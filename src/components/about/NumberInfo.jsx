import React from "react";

const NumberInfo = ({number,info}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-[#F1F2FF] font-bold text-3xl">{number}</p>
      <p className="text-[#585D69] font-semibold">{info}</p>
    </div>
  );
};

export default NumberInfo;
