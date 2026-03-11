import React from 'react';

const SubmitBtn = ({text}) => {
    return (
        <button
          type="submit"
          className="bg-gradient-to-r from-primary-500 to-primary-600 text-white flex gap-1 items-center rounded-lg font-semibold py-[6px] px-[18px] hover:shadow-lg hover:scale-105 transition-all"
        >
          {text}
        </button>
    );
}

export default SubmitBtn;
