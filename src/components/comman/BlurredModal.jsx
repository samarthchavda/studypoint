import React from 'react';

const BlurredModal = () => {
      const modalRef=useRef(null);
      const screenRef=useRef(null);
    return (
        <>
             <div ref={screenRef}  onClick={modalHandler}  className="invisible w-full h-full  bg-white/10 top-0 absolute backdrop-blur-sm ">   
        </div>
        <div ref={modalRef} className="text-white border-white border-[1px]  bg-richblack-800 h-fit invisible px-6 rounded-md py-4 gap-3  flex  absolute z-10 left-[40%] top-[45%] flex-col justify-center items-center ">
            <h2 className="text-lg">Do you Really want to <span className="text-red-600 font-semibold">Log Out?</span></h2>
            <div className="flex gap-3" >
              <button className="px-2 py-1 bg-yellow-200 rounded-md" onClick={modalHandler}>
                Cancel
              </button>
              <button onClick={clickHandler} className="px-2 py-1 bg-red-600 rounded-md">
                Log out
              </button>
            </div>
          </div>
        </>
    );
}

export default BlurredModal;
