import React from 'react';
import { IoCloudUpload } from "react-icons/io5";

const ImViUpload = ({forwhat}) => {
    return (
        <div className="flex flex-col border-dashed border-primary-300 border-[1.5px] rounded-lg items-center gap-2 py-8 bg-primary-50">
            <label
              htmlFor={forwhat}
              className="cursor-pointer p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full hover:shadow-lg transition-all"
            >
              <IoCloudUpload className="text-white w-5 h-5" />
            </label>
            <p className="text-neutral-700 text-center text-xs">
              Drag and drop an image, or
              <span>
                <label
                  className="cursor-pointer font-semibold text-primary-600 hover:text-primary-700"
                  htmlFor={forwhat}
                >
                  {" "}
                  Browse
                </label>
              </span>
              <br />
              Max 6MB each (12MB for videos)
            </p>
            <div className="flex text-neutral-600 text-center px-3 md:px-0 gap-3 sm:gap-12 text-xs font-semibold">
              <p>Aspect ratio 16:9</p>
              <p> Recommended size 1024x576</p>
            </div>
          </div>
    );
}

export default ImViUpload;
