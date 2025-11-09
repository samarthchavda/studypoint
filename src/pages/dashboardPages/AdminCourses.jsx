import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCourses, deleteCourse } from "../../services/operations/adminapi";
import Spinner from "../../components/comman/Spinner";
import { FiTrash2, FiEye, FiDollarSign, FiUsers, FiBook, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../components/comman/ConfirmationModal";
import { useNavigate } from "react-router-dom";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      console.log("Fetching courses with token:", token ? "Token exists" : "No token");
      const response = await getAllCourses(token);
      console.log("Courses response:", response);
      if (response) {
        setCourses(response);
        console.log("Courses set:", response.length, "courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const success = await deleteCourse(courseId, token);
      if (success) {
        setCourses(courses.filter((course) => course._id !== courseId));
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setConfirmationModal(null);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.lastName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || course.category?.name === filterCategory;

    const matchesStatus =
      filterStatus === "All" || course.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories
  const categories = [...new Set(courses.map((course) => course.category?.name).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-richblack-5">Course Management</h1>
        <p className="text-richblack-300">
          Total Courses:{" "}
          <span className="text-yellow-50 font-bold">{courses.length}</span>
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by course name, description, or instructor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-richblack-800 text-richblack-5 rounded-lg border border-richblack-700 focus:outline-none focus:border-yellow-50"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 bg-richblack-800 text-richblack-5 rounded-lg border border-richblack-700 focus:outline-none focus:border-yellow-50"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-richblack-800 text-richblack-5 rounded-lg border border-richblack-700 focus:outline-none focus:border-yellow-50"
        >
          <option value="All">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center py-12 text-richblack-300">
            No courses found
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-richblack-800 rounded-lg overflow-hidden hover:bg-richblack-700 transition-all"
            >
              {/* Course Thumbnail */}
              <div className="relative h-48">
                <img
                  src={course.thumbnail || "https://via.placeholder.com/400x200"}
                  alt={course.courseName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.status === "published"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-richblack-900"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
                {course.price === 0 && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      FREE
                    </span>
                  </div>
                )}
              </div>

              {/* Course Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-richblack-5 mb-2 line-clamp-2">
                  {course.courseName || "Untitled Course"}
                </h3>

                <p className="text-sm text-richblack-300 mb-3 line-clamp-2">
                  {course.courseDescription || "No description"}
                </p>

                {/* Instructor Info */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
                    {course.instructor?.image ? (
                      <img
                        src={course.instructor.image}
                        alt={course.instructor.firstName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-richblack-900 text-sm font-semibold">
                        {course.instructor?.firstName?.charAt(0) || "I"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-richblack-300">
                    {course.instructor?.firstName} {course.instructor?.lastName}
                  </p>
                </div>

                {/* Course Stats */}
                <div className="flex items-center gap-4 mb-3 text-sm text-richblack-300">
                  <div className="flex items-center gap-1">
                    <FiUsers />
                    <span>{course.studentsEnrolled?.length || 0} enrolled</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiBook />
                    <span>{course.category?.name || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-50 font-bold text-lg">
                    <FiDollarSign />
                    <span>{course.price === 0 ? "Free" : course.price}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-all"
                      title="View Details"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Delete Course",
                          text2: `Are you sure you want to delete "${course.courseName}"? This action cannot be undone.`,
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleteCourse(course._id),
                          btn2Handler: () => setConfirmationModal(null),
                        });
                      }}
                      className="p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition-all"
                      title="Delete Course"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 overflow-y-auto p-4">
          <div className="bg-richblack-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-richblack-800 border-b border-richblack-700 p-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-richblack-5 mb-2">
                  {selectedCourse.courseName}
                </h2>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedCourse.status === "published"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-richblack-900"
                    }`}
                  >
                    {selectedCourse.status}
                  </span>
                  {selectedCourse.price === 0 && (
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      FREE COURSE
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-richblack-300 hover:text-richblack-5 transition-all"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Course Image */}
              <div>
                <img
                  src={selectedCourse.thumbnail || "https://via.placeholder.com/800x400"}
                  alt={selectedCourse.courseName}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Course Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Instructor Info */}
                <div className="bg-richblack-700 p-4 rounded-lg">
                  <h3 className="text-richblack-300 text-sm mb-2">Instructor</h3>
                  <div className="flex items-center gap-3">
                    {selectedCourse.instructor?.image ? (
                      <img
                        src={selectedCourse.instructor.image}
                        alt={selectedCourse.instructor.firstName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                        <span className="text-richblack-900 font-bold">
                          {selectedCourse.instructor?.firstName?.charAt(0) || "I"}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-richblack-5 font-semibold">
                        {selectedCourse.instructor?.firstName}{" "}
                        {selectedCourse.instructor?.lastName}
                      </p>
                      <p className="text-richblack-300 text-sm">
                        {selectedCourse.instructor?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="bg-richblack-700 p-4 rounded-lg">
                  <h3 className="text-richblack-300 text-sm mb-2">Category</h3>
                  <p className="text-richblack-5 font-semibold text-lg">
                    {selectedCourse.category?.name || "N/A"}
                  </p>
                </div>

                {/* Price */}
                <div className="bg-richblack-700 p-4 rounded-lg">
                  <h3 className="text-richblack-300 text-sm mb-2">Price</h3>
                  <p className="text-yellow-50 font-bold text-2xl">
                    {selectedCourse.price === 0 ? "Free" : `₹${selectedCourse.price}`}
                  </p>
                </div>

                {/* Students Enrolled */}
                <div className="bg-richblack-700 p-4 rounded-lg">
                  <h3 className="text-richblack-300 text-sm mb-2">Students Enrolled</h3>
                  <p className="text-richblack-5 font-bold text-2xl">
                    {selectedCourse.studentsEnrolled?.length || 0}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-richblack-700 p-4 rounded-lg">
                <h3 className="text-richblack-5 font-semibold mb-2">Description</h3>
                <p className="text-richblack-300">
                  {selectedCourse.courseDescription || "No description available"}
                </p>
              </div>

              {/* What You Will Learn */}
              {selectedCourse.whatYouWillLearn && (
                <div className="bg-richblack-700 p-4 rounded-lg">
                  <h3 className="text-richblack-5 font-semibold mb-2">
                    What You Will Learn
                  </h3>
                  <p className="text-richblack-300">{selectedCourse.whatYouWillLearn}</p>
                </div>
              )}

              {/* Instructions */}
              {selectedCourse.instructions && selectedCourse.instructions.length > 0 && (
                <div className="bg-richblack-700 p-4 rounded-lg">
                  <h3 className="text-richblack-5 font-semibold mb-2">Instructions</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedCourse.instructions.map((instruction, index) => (
                      <li key={index} className="text-richblack-300">
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Course Content */}
              {selectedCourse.courseContent && selectedCourse.courseContent.length > 0 && (
                <div className="bg-richblack-700 p-4 rounded-lg">
                  <h3 className="text-richblack-5 font-semibold mb-3">
                    Course Content ({selectedCourse.courseContent.length} Sections)
                  </h3>
                  <div className="space-y-2">
                    {selectedCourse.courseContent.map((section, index) => (
                      <div
                        key={section._id || index}
                        className="bg-richblack-800 p-3 rounded-lg"
                      >
                        <p className="text-richblack-5 font-medium">
                          Section {index + 1}: {section.name || section.sectionName || "Untitled Section"}
                        </p>
                        {((section.subSections && section.subSections.length > 0) || (section.subSection && section.subSection.length > 0)) && (
                          <p className="text-richblack-300 text-sm mt-1">
                            {(section.subSections?.length || section.subSection?.length || 0)} lecture(s)
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              {selectedCourse.ratingAndReviews && selectedCourse.ratingAndReviews.length > 0 && (
                <div className="bg-richblack-700 p-4 rounded-lg">
                  <h3 className="text-richblack-5 font-semibold mb-2">
                    Reviews ({selectedCourse.ratingAndReviews.length})
                  </h3>
                  <p className="text-richblack-300">
                    {selectedCourse.ratingAndReviews.length} reviews available
                  </p>
                </div>
              )}

              {/* Created & Updated Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-richblack-700 p-4 rounded-lg">
                  <h3 className="text-richblack-300 text-sm mb-2">Created At</h3>
                  <p className="text-richblack-5">
                    {new Date(selectedCourse.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="bg-richblack-700 p-4 rounded-lg">
                  <h3 className="text-richblack-300 text-sm mb-2">Last Updated</h3>
                  <p className="text-richblack-5">
                    {new Date(selectedCourse.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-richblack-800 border-t border-richblack-700 p-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-6 py-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 rounded-lg transition-all"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setConfirmationModal({
                    text1: "Delete Course",
                    text2: `Are you sure you want to delete "${selectedCourse.courseName}"? This action cannot be undone.`,
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeleteCourse(selectedCourse._id),
                    btn2Handler: () => setConfirmationModal(null),
                  });
                }}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default AdminCourses;
