import { React, use, useRef, useState } from "react";
import { HiMiniRectangleStack } from "react-icons/hi2";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RiAddLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import SubSectionForm from "./SubSectionForm";
const SubSection = ({ ref, subSections, sectionIndex }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.course.loading);
  const [createSub, setCreateSub] = useState(false);
  const [editSub, setEditSub] = useState(false);
  const [deleteSub, setDeleteSub] = useState(false);
  const [viewSub, setViewSub] = useState(false);
  const [subSectionInfo, setSubSectionInfo] = useState(null);
  const modalRef = useRef(null);
  const removeModal = () => {
    if (!loading) {
      setCreateSub(false);
      setEditSub(false);
      setDeleteSub(false);
      setViewSub(false);
    }
  };
  useOnClickOutside(modalRef, removeModal);
  return (
    <>
      <div>
        {subSections.length > 0 &&
          subSections.map((subSection, index) => (
            <details
              key={subSection._id}
              className={`flex items-center gap-3 py-2 ${
                index < subSections.length - 1 ? "border-b" : null
              } border-richblack-600 ml-10`}
            >
              <summary className="flex cursor-pointer justify-between">
                <div
                  onClick={() => {
                    setViewSub(true);
                    setSubSectionInfo(subSection);
                  }}
                  className="flex w-full items-center gap-3"
                >
                  <HiMiniRectangleStack className="text-richblack-400" />
                  <h3 className="text-richblack-50 font-semibold">
                    {subSection.title}
                  </h3>
                </div>
                <div className="flex gap-1 text-richblack-400 text-xl">
                  <button>
                    <MdOutlineModeEdit
                      onClick={() => {
                        setEditSub(true);
                        setSubSectionInfo(subSection);
                      }}
                    />
                  </button>

                  <button
                    onClick={() => {
                      setDeleteSub(true);
                      setSubSectionInfo(subSection);
                    }}
                  >
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </summary>
            </details>
          ))}
        <button
          onClick={() => setCreateSub(true)}
          className="text-yellow-50 font-medium flex gap-1 items-center"
        >
          <RiAddLine className="h-6 w-6" />
          Add Lecture
        </button>
      </div>

     {(createSub || editSub || deleteSub || viewSub) && (
      <div className="fixed inset-0 z-[1000] bg-richblack-900/50 backdrop-blur-sm flex items-center justify-center">
        {(createSub && (
          <SubSectionForm
            sectionIndex={sectionIndex}
            removeForm={removeModal}
            ref={modalRef}
            create={true}
          />
        )) ||
          (editSub && (
            <SubSectionForm
              sectionIndex={sectionIndex}
              subSectionInfo={subSectionInfo}
              removeForm={removeModal}
              ref={modalRef}
              edit={true}
            />
          )) ||
          (deleteSub && (
            <SubSectionForm
              sectionIndex={sectionIndex}
              subSectionInfo={subSectionInfo}
              removeForm={removeModal}
              ref={modalRef}
              dele={true}
            />
          )) ||
          (viewSub && (
            <SubSectionForm
              sectionIndex={sectionIndex}
              subSectionInfo={subSectionInfo}
              removeForm={removeModal}
              ref={modalRef}
              view={true}
            />
          ))}
      </div>
    )}
    </>
  );
};

export default SubSection;
