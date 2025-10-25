const baseUrl = process.env.REACT_APP_BASE_URL;

// auth endpoints
export const auth = {
  SENDOTP_API: baseUrl + "/auth/sendotp",
  SIGNUP_API: baseUrl + "/auth/signup",
  LOGIN_API: baseUrl + "/auth/login",
  RESETPASSTOKEN_API: baseUrl + "/auth/reset-password-token",
  RESETPASSWORD_API: baseUrl + "/auth/reset-password",
};

// profile endpoints
export const profileEndpoint = {
  GETUSERDETAILS: baseUrl + "/profile/getUserDetails",
  UPDATEPROFILE: baseUrl + "/profile/updateProfile",
  DELETEPROFILE: baseUrl + "/profile/deleteAccount",
  UPDATEDPAPI: baseUrl + "/profile/updateDP",
  GET_ENROLLED_COURSES_API: baseUrl + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_COURSES_API: baseUrl + "/course/getInstructorCourses",
  GET_INSTRUCTOR_DASHBOARD_INFO_API: baseUrl + "/profile/instructorDashboardInfo",
  GET_USER_DETAILS_API: baseUrl + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: baseUrl + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: baseUrl + "/profile/instructorDashboard",
};

// student endpoints
export const studentEndpoint = {
  COURSE_PAYMENT_API: baseUrl + "/payment/capturePayment",
  COURSE_VERIFY_API: baseUrl + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: baseUrl + "/payment/sendPaymentSuccessEmail",
};

// course endpoints
export const courseEndPoint = {
  GET_ALL_COURSE_API: baseUrl + "/course/getAllCourses",
  COURSE_DETAILS_API: baseUrl + "/course/getCourseDetails",
  EDIT_COURSE_API: baseUrl + "/course/editCourse",
  COURSE_CATEGORIES_API: baseUrl + "/course/showAllCategories",
  CREATE_COURSE_API: baseUrl + "/course/createCourse",
  CREATE_SECTION_API: baseUrl + "/course/addSection",
  CREATE_SUBSECTION_API: baseUrl + "/course/addSubSection",
  UPDATE_SECTION_API: baseUrl + "/course/updateSection",
  UPDATE_SUBSECTION_API: baseUrl + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: baseUrl + "/course/getInstructorCourses",
  DELETE_SECTION_API: baseUrl + "/course/deleteSection",
  DELETE_SUBSECTION_API: baseUrl + "/course/deleteSubSection",
  DELETE_COURSE_API: baseUrl + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_API: baseUrl + "/course/getFullCourseDetails",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED: baseUrl + "/course/getFullCourseDetails",
  GET_FULL_ENROLLED_COURSE_DETAILS_API: baseUrl + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: baseUrl + "/course/updateCourseProgress",
  MARK_AS_COMPLETED_API: baseUrl + "/course/updateCourseProgress",
  CREATE_RATING_API: baseUrl + "/course/createRating",
  GET_COURSE_REVIEW_API: baseUrl + "/course/getReviews",
  GET_ALL_REVIEWS_API: baseUrl + "/course/getReviews",
  GET_AVERAGE_RATING_API: baseUrl + "/course/getAverageRating",
  GET_AVG_RATING: baseUrl + "/course/getAverageRating",
  ENROLL_FREE_COURSE_API: baseUrl + "/course/enrollFreeCourse",
};

// rating and review endpoints
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: baseUrl + "/course/getReviews",
};

// category endpoints
export const categoryEndpoint = {
  CATEGORIES_API: baseUrl + "/course/showAllCategories",
  CATEGORY_PAGE_DETAILS_API: baseUrl + "/course/getCategoryPageDetails",
  CREATE_CATEGORY_API: baseUrl + "/course/createCategory",
};

// catalog page data
export const catalogData = {
  CATALOGPAGEDATA_API: baseUrl + "/course/getCategoryPageDetails",
};

// contact us
export const contactEndpoint = {
  CONTACT_US_API: baseUrl + "/reach/contact",
};

// settings page
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: baseUrl + "/profile/updateDP",
  UPDATEDPAPI: baseUrl + "/profile/updateDP",
  UPDATE_PROFILE_API: baseUrl + "/profile/updateProfile",
  UPDATEPROFILE: baseUrl + "/profile/updateProfile",
  CHANGE_PASSWORD_API: baseUrl + "/profile/changePassword",
  DELETE_PROFILE_API: baseUrl + "/profile/deleteAccount",
  DELETEPROFILE: baseUrl + "/profile/deleteAccount",
};

// payment endpoint
export const paymentEndpoint = {
  COURSE_PAYMENT_API: baseUrl + "/payment/capturePayment",
  COURSE_VERIFY_API: baseUrl + "/payment/verifySignature",
};

// admin endpoints
export const adminEndpoints = {
  GET_ALL_USERS_API: baseUrl + "/admin/getAllUsers",
  GET_ALL_CONTACTS_API: baseUrl + "/admin/getAllContacts",
  GET_ALL_DEMO_BOOKINGS_API: baseUrl + "/admin/getAllDemoBookings",
  DELETE_USER_API: baseUrl + "/admin/deleteUser",
  DELETE_CONTACT_API: baseUrl + "/admin/deleteContact",
  DELETE_DEMO_BOOKING_API: baseUrl + "/admin/deleteDemoBooking",
  GET_ADMIN_STATS_API: baseUrl + "/admin/getStats",
  CREATE_CATEGORY_API: baseUrl + "/course/createCategory",
};

export const adminEndpoint = adminEndpoints;
