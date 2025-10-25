import React from 'react';
import { IoCloudUpload } from "react-icons/io5";

const ImViUpload = ({forwhat}) => {
    return (
        <div className="flex flex-col border-dashed border-[#424854]  border-[1.5px] rounded-lg items-center gap-2 py-8 bg-[#2C333F]">
            <label
              htmlFor={forwhat}
              className="cursor-pointer p-3 bg-[#171717] rounded-full"
            >
              <IoCloudUpload className="text-[#FFD60A] w-5 h-5" />
            </label>
            <p className="text-[#999DAA] text-center text-xs">
              Drag and drop an image, or
              <span>
                <label
                  className="cursor-pointer font-semibold text-[#FFD60A]"
                  htmlFor={forwhat}
                >
                  {" "}
                  Browse
                </label>
              </span>
              <br />
              Max 6MB each (12MB for videos)
            </p>
            <div className="flex text-[#6E727F] text-center px-3 md:px-0 gap-3 sm:gap-12 text-xs font-semibold">
              <p>Aspect ratio 16:9</p>
              <p> Recommended size 1024x576</p>
            </div>
          </div>
    );
}

export default ImViUpload;
