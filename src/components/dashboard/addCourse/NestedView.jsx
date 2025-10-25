import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniRectangleStack } from "react-icons/hi2";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteSection } from "../../../services/operations/courseApi";
import ConfirmationModal from "../../comman/ConfirmationModal";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import SubSection from "./SubSection";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
const NestedView = ({ editSectionNameHandler }) => {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [deleteSectionInfo, setDeleteSectionInfo] = useState(null);
  const modalRef = useRef(null);
  const courseInfo = useSelector((state) => state.course.courseInfo);
  const loading = useSelector((state) => state.course.loading);
  const { token } = useSelector((state) => state.auth);
  const [openStates, setOpenStates] = useState({});
  const handleToggle = (sectionId, openValue) => {
    setOpenStates({
      ...openStates,
      [sectionId]: openValue,
    });
  };
  const courseContent = courseInfo.courseContent;
  const dispatch = useDispatch();
  const deleteSectionHandler = (payload) => {
    if (loading) return;
    dispatch(deleteSection(token, payload, payload.courseInfo, payload.index));
    setDeleteSectionInfo(null);
    setConfirmationModal(false);
  };
  const removeConfirmationModal = () => {
    setDeleteSectionInfo(null);
    setConfirmationModal(false);
  };
  useOnClickOutside(modalRef, removeConfirmationModal);
  return (
    <>
      <div className="bg-richblack-700 flex flex-col px-6 rounded-lg border border-richblack-600">
        {courseContent.length > 0 &&
          courseContent.map((section, index) => (
            <details
              onToggle={(e) => handleToggle(section._id, e.target.open)}
              key={section._id}
              className="border-b border-richblack-600 py-3 "
            >
              <summary
                isOpen={false}
                className="flex cursor-pointer  justify-between"
              >
                <div className="flex items-center gap-3">
                  <HiMiniRectangleStack className="text-richblack-400" />
                  <h3 className="text-richblack-50 font-semibold">
                    {section.name}
                  </h3>
                </div>
                <div className="flex gap-1 text-richblack-400 text-xl">
                  <button onClick={() => editSectionNameHandler(index)}>
                    <MdOutlineModeEdit />
                  </button>

                  <button
                    onClick={() => {
                      setDeleteSectionInfo({
                        sectionId: section._id,
                        courseId: courseInfo._id,
                        index,
                        courseInfo,
                      });
                      setConfirmationModal(true);
                    }}
                  >
                    <RiDeleteBin5Line />
                  </button>
                  <p>|</p>
                  {openStates[section._id] ? (
                    <IoMdArrowDropup className="text-richblack-400 text-xl  self-center" />
                  ) : (
                    <IoMdArrowDropdown className="text-richblack-400 text-xl  self-center" />
                  )}
                </div>
              </summary>
              <div></div>
              <SubSection
                sectionIndex={index}
                subSections={section.subSections}
              />
            </details>
          ))}
      </div>

      {confirmationModal && (
        <ConfirmationModal
          btn1Text={"Cancel"}
          btn2Text={"Delete"}
          btn1Handler={removeConfirmationModal}
          btn2Handler={() => {
            deleteSectionHandler(deleteSectionInfo);
          }}
          modalRef={modalRef}
          heading={"section"}
        />
      )}
    </>
  );
};

export default NestedView;
