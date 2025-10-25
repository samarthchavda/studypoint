# StudyNotion - Test Accounts & Testing Guide

## 🔐 Test Account Credentials

All accounts use the same password: **Test@123**

### 👤 Admin Account
- **Email:** admin@studynotion.com
- **Password:** Test@123
- **Access:** `/dashboard/admin`
- **Features:**
  - View all users, contacts, demo bookings
  - View admin statistics dashboard
  - Create new categories
  - Delete users/contacts/bookings
  - View category-wise courses
  - View top instructors and courses

### 👨‍🏫 Instructor Account
- **Email:** instructor@studynotion.com
- **Password:** Test@123
- **Access:** `/dashboard/instructor`
- **Features:**
  - Create new courses
  - Edit existing courses
  - Add sections and subsections
  - Upload course thumbnails and videos
  - View enrolled students
  - Instructor dashboard with analytics

### 👨‍🎓 Student Account
- **Email:** student@studynotion.com
- **Password:** Test@123
- **Access:** `/dashboard/enrolled-courses`
- **Features:**
  - Browse and enroll in courses
  - View enrolled courses
  - Track course progress
  - Add courses to cart
  - Rate and review courses
  - View course catalog

---

## ✅ Forms Testing Checklist

### Authentication Forms
- [x] **Login Form** - `/login`
  - Tests email and password validation
  - Redirects based on user role
  
- [x] **Signup Form** - `/signup`
  - OTP verification working
  - Creates user with selected role
  
- [x] **Forgot Password** - `/forgot-password`
  - Sends reset email
  
- [x] **Reset Password** - `/reset-password/:token`
  - Updates password with token

### Course Management Forms (Instructor Only)
- [x] **Add Course - Step 1: Course Information**
  - Course title, description, price
  - Category selection (15 categories available)
  - Thumbnail upload
  - Benefits and instructions
  - No tags section (removed as requested)
  - Proceeds to next step after save
  
- [x] **Add Course - Step 2: Course Builder**
  - Add/edit/delete sections
  - Add/edit/delete subsections
  - Video upload for lectures
  
- [x] **Add Course - Step 3: Publish**
  - Toggle public/draft status
  - Final course submission

- [x] **Edit Course**
  - All fields editable
  - Saves changes and proceeds to next step

### Profile & Settings Forms
- [x] **Edit Profile**
  - Update personal information
  - Gender, DOB, about, contact
  
- [x] **Change Profile Picture**
  - Upload new display picture
  
- [x] **Change Password**
  - Old password verification
  - New password update

### Admin Forms
- [x] **Create Category**
  - Category name and description
  - Available at `/dashboard/create-category`

### Other Forms
- [x] **Contact Form** - `/about` and `/contact`
  - Name, email, message
  - Stores in database
  
- [x] **Course Review/Rating**
  - Star rating (1-5)
  - Review text

---

## 🔧 Recent Fixes Applied

### 1. API Connector Parameter Order
Fixed all API calls to use correct order: `apiConnector(METHOD, URL, data, headers)`

**Files Fixed:**
- `src/services/operations/authApi.js` (6 calls)
- `src/services/operations/courseApi.js` (16 calls)
- `src/services/operations/profileApi.js` (7 calls)
- `src/services/operations/CategoryApi.js` (1 call)
- `src/components/comman/NavBar.jsx` (1 call)

### 2. API Endpoints Alignment
Added missing endpoint constants in `src/services/apis.js`:
- `GETUSERDETAILS`
- `UPDATEPROFILE`
- `DELETEPROFILE`
- `UPDATEDPAPI`
- `GET_ENROLLED_COURSES_API`
- `GET_INSTRUCTOR_COURSES_API`
- `GET_INSTRUCTOR_DASHBOARD_INFO_API`

### 3. Course Information Form
- Removed tags section completely
- Added null safety check for `courseInfo` in `isFormUpdated()`
- Removed "no changes made" validation
- Removed "Continue without saving" button
- Form now always proceeds to next step after save

### 4. Admin Dashboard
Enhanced `getStats` controller to return:
- Basic statistics (users, courses, categories, etc.)
- Category-wise course distribution
- Top 5 selling courses
- Top 5 instructors by enrollment

### 5. Database Seeding
- Created 15 default categories (Web Development, Mobile Dev, Data Science, etc.)
- Created test accounts for all three user types

---

## 🧪 How to Test

### 1. Start the Application
```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
npm run dev
```

### 2. Login & Test Workflows

#### As Admin:
1. Login with `admin@studynotion.com`
2. Check `/dashboard/admin` shows statistics
3. Try creating a new category at `/dashboard/create-category`
4. Verify all admin features work

#### As Instructor:
1. Login with `instructor@studynotion.com`
2. Go to `/dashboard/add-course`
3. Fill all course information:
   - Title, description, price
   - Select a category
   - Upload thumbnail
   - Add benefits and instructions
4. Click "Next" - should proceed to Course Builder
5. Add sections and subsections
6. Proceed to Publish step
7. Test editing existing courses

#### As Student:
1. Login with `student@studynotion.com`
2. Browse courses on home page
3. View course details
4. Enroll in a course (if payment disabled, check enrollment directly)
5. View enrolled courses
6. Track progress and add reviews

### 3. Test All Forms
Go through each form listed in the checklist above and verify:
- Form validation works
- Submit button triggers correct API
- Success/error toasts appear
- Data persists in database
- Redirects work correctly

---

## 🐛 Known Issues (Fixed)
- ✅ OTP not sending - Fixed API parameter order
- ✅ Category dropdown empty - Fixed API endpoint and response path
- ✅ Tags section showing - Removed completely
- ✅ Save changes not working - Fixed validation and API call
- ✅ Admin panel blank - Enhanced getStats to return all required data
- ✅ CourseInformation null error - Added null safety check
- ✅ NavBar category fetch 400 error - Fixed API endpoint

---

## 📝 Current Database State
- **Total Users:** 5
- **Admins:** 1
- **Instructors:** 2
- **Students:** 2
- **Categories:** 15

---

## 🚀 Next Steps for Testing
1. Hard refresh browser (Cmd+Shift+R) to clear cached JavaScript
2. Login with each test account
3. Test all forms and features
4. Check browser console for any remaining errors
5. Verify all data saves to database correctly

---

## 📞 Support
If you encounter any issues:
1. Check browser console for errors
2. Check server terminal for API errors
3. Verify MongoDB is running
4. Clear browser cache
5. Restart both frontend and backend servers
