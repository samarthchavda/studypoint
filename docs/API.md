# 📚 API Documentation

## Base URL
```
http://localhost:4000/api/v1
```

## Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## User & Authentication Routes

### POST `/auth/signup`
Register a new user
- **Body**: `{ firstName, lastName, email, password, confirmPassword, accountType, otp }`
- **Response**: User object with token

### POST `/auth/sendotp`
Send OTP for email verification
- **Body**: `{ email }`
- **Response**: Success message

### POST `/auth/login`
Login user
- **Body**: `{ email, password }`
- **Response**: User object with token

### POST `/auth/changepassword`
Change user password (Protected)
- **Body**: `{ oldPassword, newPassword }`
- **Response**: Success message

---

## Profile Routes

### GET `/profile/getUserDetails`
Get current user details (Protected)
- **Response**: User profile data

### PUT `/profile/updateProfile`
Update user profile (Protected)
- **Body**: `{ firstName, lastName, dateOfBirth, about, contactNumber, gender }`
- **Response**: Updated profile

### PUT `/profile/updateDisplayPicture`
Update profile picture (Protected)
- **Body**: FormData with image file
- **Response**: Updated profile with new image URL

### DELETE `/profile/deleteAccount`
Delete user account (Protected)
- **Response**: Success message

---

## Course Routes

### GET `/course/getAllCourses`
Get all published courses
- **Response**: Array of courses

### GET `/course/getCourseDetails/:courseId`
Get specific course details
- **Response**: Course with sections and subsections

### POST `/course/createCourse`
Create new course (Instructor only)
- **Body**: `{ courseName, courseDescription, whatYouWillLearn, price, category, tag, thumbnail }`
- **Response**: Created course

### PUT `/course/editCourse`
Update course (Instructor only)
- **Body**: Course fields to update
- **Response**: Updated course

### DELETE `/course/deleteCourse/:courseId`
Delete course (Instructor only)
- **Response**: Success message

### POST `/course/createSection`
Add section to course (Instructor only)
- **Body**: `{ sectionName, courseId }`
- **Response**: Updated course

### PUT `/course/updateSection`
Update section (Instructor only)
- **Body**: `{ sectionName, sectionId, courseId }`
- **Response**: Updated course

### DELETE `/course/deleteSection/:sectionId/:courseId`
Delete section (Instructor only)
- **Response**: Updated course

### POST `/course/addSubSection`
Add subsection/lecture (Instructor only)
- **Body**: `{ sectionId, title, description, videoFile }`
- **Response**: Updated section

### PUT `/course/updateSubSection`
Update subsection (Instructor only)
- **Body**: Subsection fields to update
- **Response**: Updated subsection

### DELETE `/course/deleteSubSection/:subSectionId/:sectionId`
Delete subsection (Instructor only)
- **Response**: Success message

---

## Category Routes

### GET `/course/showAllCategories`
Get all course categories
- **Response**: Array of categories

### GET `/course/getCategoryPageDetails/:categoryId`
Get category with courses
- **Response**: Category details with courses

---

## Payment Routes

### POST `/payment/capturePayment`
Initialize course purchase (Student only)
- **Body**: `{ courseId }`
- **Response**: Razorpay order

### POST `/payment/verifyPayment`
Verify payment and enroll (Student only)
- **Body**: `{ razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId }`
- **Response**: Success message with enrollment

---

## Rating & Review Routes

### POST `/course/createRating`
Add course review (Student, Enrolled only)
- **Body**: `{ rating, review, courseId }`
- **Response**: Created review

### GET `/course/getAverageRating/:courseId`
Get average rating for course
- **Response**: `{ averageRating }`

### GET `/course/getReviews`
Get all reviews across platform
- **Response**: Array of reviews with user details

---

## Course Progress Routes

### POST `/course/updateCourseProgress`
Update student's course progress (Student only)
- **Body**: `{ courseId, subSectionId }`
- **Response**: Updated progress

### GET `/course/getProgressPercentage/:courseId`
Get course completion percentage (Student only)
- **Response**: `{ completionPercentage }`

---

## Admin Routes (if implemented)

### GET `/admin/getAllUsers`
Get all users (Admin only)
- **Response**: Array of users

### GET `/admin/getInstructorStats`
Get platform statistics (Admin only)
- **Response**: Stats object

---

## Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (in development)"
}
```

## Common Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized (invalid/missing token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **500**: Internal Server Error

---

## Roles

- **Student**: Can enroll, view courses, track progress, leave reviews
- **Instructor**: All student permissions + create/edit/delete own courses
- **Admin**: Full platform access (if implemented)

## Rate Limiting

API calls may be rate-limited. Check response headers for limit info.

## File Uploads

- **Max file size**: 50MB
- **Accepted formats**: 
  - Images: jpg, jpeg, png
  - Videos: mp4, webm
  
Files are uploaded to Cloudinary and URLs are stored in database.
