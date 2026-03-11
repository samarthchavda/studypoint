import React, { use, useRef, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import ConfirmationModal from "../../../comman/ConfirmationModal";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { deleteCourse } from "../../../../services/operations/courseApi";
import { FaCheckCircle } from "react-icons/fa";
import { HiMiniClock } from "react-icons/hi2";
import formatDuration from "../../../../utils/formatDuration";
import { useDispatch, useSelector } from "react-redux";
import showLength from "../../../../utils/showLength";
const CoursesTable = ({ courses, updateCourses }) => {
  const { token } = useSelector((state) => state.auth);
  const [deleteModal, setDeleteModal] = useState(false);
  const [delCourseId, setDelCourseId] = useState(null);
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, () => {
    !loading && setDeleteModal(false);
  });
  const navigate = useNavigate();
  const loading = useSelector((state) => state.course.loading);
  const deleteCourseHandler = async () => {
    const isDeleted = await deleteCourse(
      token,
      { courseId: delCourseId },
      dispatch
    );
    if (isDeleted) {
      const newCourses = courses.filter((course) => course._id != delCourseId);
      updateCourses(newCourses);
    }
    setDeleteModal(false);
  };

  const date = (date) => {
    const firstPart = date.split("T").at(0);
    const secondPart = date
      .split("T")
      .at(-1)
      .split(".")
      .at(0)
      .split(":")
      .slice(0, 2)
      .join(":");
    const thirdPart =
      date.split("T").at(-1).split(".").at(0).split(":").at(0) < 12
        ? "AM"
        : "PM";
    return `${firstPart} | ${secondPart} ${thirdPart}`;
  };

  return (
    <>
      <Table className="rounded-lg w-full border lg:ml-6 ml-3 my-2 border-neutral-200 bg-white shadow-md text-neutral-800 border-collapse">
        <Thead className="font-semibold text-neutral-700 bg-neutral-50">
          <Tr className="">
            <Th className="text-start py-4 px-4">Courses</Th>
            <Th className="text-center py-4 px-4">Duration</Th>
            <Th className="text-center py-4 px-4">Price</Th>
            <Th className="py-4 px-4">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.map((item, index) => {
            return (
              <Tr className="border-t border-neutral-200 hover:bg-neutral-50 transition-colors" key={index}>
                <Td className="py-[10px] md:w-4/6 px-4">
                  <div className="flex md:flex-row flex-col gap-5">
                    <img
                      className="max-h-[152px] aspect-auto rounded-lg shadow-sm"
                      src={item.thumbnail}
                      alt=""
                    />
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-[8px]">
                        <h3 className="text-neutral-800 font-semibold text-lg">
                          {item.name}
                        </h3>
                        <p className="text-neutral-600 text-sm">
                          {item.description}
                        </p>
                      </div>
                      <p className="font-medium text-xs text-neutral-500">
                        Created: {date(item.createdAt)}
                      </p>
                      <p
                        className={`text-xs font-semibold w-fit py-[2px] px-[8px] rounded-full flex gap-[6px] items-center
                      ${
                        item.status === "published"
                          ? "text-success-700 bg-success-100"
                          : "text-orange-700 bg-orange-100"
                      }`}
                      >
                        {item.status === "published" ? (
                          <FaCheckCircle />
                        ) : (
                          <HiMiniClock />
                        )}
                        {item.status === "published" ? "Published" : "Drafted"}
                      </p>
                    </div>
                  </div>
                </Td>
                <Td className="text-neutral-700 py-[10px] px-4 text-center font-medium">
                  {item?.totalDuration
                    ? showLength(formatDuration(item.totalDuration))
                    : "null"}
                </Td>
                <Td className="py-[10px] px-4">
                  <div className="flex text-neutral-700 gap-2 mx-auto sm:justify-center font-semibold">
                    <p>₹{item?.price}</p>
                  </div>
                </Td>
                <Td className="py-[10px] px-4">
                  <div className="flex gap-2 mx-auto text-neutral-600 font-bold sm:justify-center">
                    <button
                      className="w-[18px] h-[18px] hover:text-primary-600 transition-colors"
                      onClick={() => {
                        navigate(`/dashboard/edit-course/${item._id}`);
                      }}
                    >
                      <MdModeEditOutline />
                    </button>
                    <button
                      onClick={() => {
                        setDelCourseId(item._id);
                        setDeleteModal(true);
                      }}
                      className="w-[18px] h-[18px] hover:text-red-600 transition-colors"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {deleteModal && (
        <ConfirmationModal
          modalRef={modalRef}
          btn1Text={"cancel"}
          btn1Handler={() => !loading && setDeleteModal(false)}
          btn2Text={"Delete"}
          btn2Handler={() => {
            deleteCourseHandler();
          }}
        />
      )}
    </>
  );
};

export default CoursesTable;
