# 🎯 Admin Panel Access Guide

## Admin Account Credentials

**Email:** admin@studynotion.com  
**Password:** Test@123

---

## 🚀 How to Access Admin Panel

### Step 1: Start the Application

```bash
# Terminal 1 - Start Backend Server
cd server
npm run dev

# Terminal 2 - Start Frontend
npm start
```

### Step 2: Login as Admin

1. Navigate to: `http://localhost:3000/login`
2. Enter credentials:
   - Email: `admin@studynotion.com`
   - Password: `Test@123`
3. Click "Sign In"

### Step 3: Access Admin Dashboard

After login, you'll be automatically redirected to:
`http://localhost:3000/dashboard/admin`

Or manually navigate to: **Dashboard → Admin**

---

## 📊 Admin Panel Features

### 1. **Admin Dashboard** (`/dashboard/admin`)
- **Statistics Overview:**
  - Total Users, Instructors, Students
  - Total Courses, Categories
  - Contact Forms, Demo Bookings
  
- **Visual Charts:**
  - Category-wise Course Distribution (Pie Chart)
  - Top 5 Selling Courses (Bar Chart)
  - Top 5 Instructors (Polar Chart)

### 2. **Create Category** (`/dashboard/create-category`)
- Add new course categories
- Set category name and description
- Categories appear in course creation forms

### 3. **User Management**
Available via API endpoints:
- View all users (students, instructors, admins)
- Filter by account type
- Delete users (except admins)
- View user details and enrolled courses

### 4. **Contact Forms Management**
- View all contact form submissions
- Delete contact entries
- Track user inquiries

### 5. **Demo Bookings Management**
- View all demo class bookings
- Manage booking requests
- Delete bookings

---

## 🔧 Admin API Endpoints

All admin endpoints require authentication and admin role.

### Statistics
```
GET /api/v1/admin/getStats
```

### User Management
```
GET /api/v1/admin/getAllUsers
DELETE /api/v1/admin/deleteUser
```

### Contact Forms
```
GET /api/v1/admin/getAllContacts
DELETE /api/v1/admin/deleteContact
```

### Demo Bookings
```
GET /api/v1/admin/getAllDemoBookings
DELETE /api/v1/admin/deleteDemoBooking
```

### Category Management
```
POST /api/v1/course/createCategory
```

---

## 🧪 Testing Admin Panel

### Test Checklist:

- [ ] Login with admin credentials
- [ ] View admin dashboard statistics
- [ ] Check all charts are rendering:
  - Category Pie Chart
  - Top Selling Courses Chart
  - Top Instructors Polar Chart
- [ ] Create a new category
- [ ] View statistics update in real-time
- [ ] Test navigation between admin pages
- [ ] Verify admin-only routes are protected

### Sample Test Data:
Current Statistics (as of last check):
- **Total Users:** Multiple accounts
- **Total Courses:** 15 courses across 6 categories
- **Categories:** Web Development, Mobile Development, Data Science, Programming Languages, UI/UX Design, AI
- **Active Instructors:** Multiple instructors with published courses

---

## 🎨 Admin Dashboard Components

### Located in:
- `src/pages/dashboardPages/AdminPages/AdminDash.jsx`
- `src/components/dashboard/adminDashbboard/`
  - `Stats.jsx` - Statistics cards
  - `CategoryPieChart.jsx` - Category distribution
  - `TopSellingCoursesChart.jsx` - Best courses
  - `InstructorPolarChart.jsx` - Top instructors

### Backend Controllers:
- `server/controllers/adminCon.js`
- `server/routes/adminRoute.js`

---

## 🔐 Security Features

1. **Authentication Required:** All admin routes protected by auth middleware
2. **Admin Role Check:** `isAdmin` middleware verifies account type
3. **Admin Protection:** Cannot delete admin users
4. **Token-based:** JWT authentication for all requests

---

## 💡 Quick Commands

### Check Admin Account:
```bash
node server/scripts/verifyAdmin.js
```

### Create New Admin (if needed):
```bash
node server/scripts/createAdmin.js
```

### View All Courses:
```bash
node server/scripts/checkAllCourses.js
```

---

## 📝 Notes

- Admin dashboard shows real-time data from MongoDB
- Charts use Chart.js for visualization
- All statistics are calculated server-side
- Admin panel is responsive and mobile-friendly
- Only users with `accountType: "Admin"` can access admin routes

---

## 🐛 Troubleshooting

**Issue:** Can't access admin panel  
**Solution:** Verify you're logged in as admin and navigate to `/dashboard/admin`

**Issue:** Statistics not loading  
**Solution:** Check backend server is running and database is connected

**Issue:** Charts not rendering  
**Solution:** Ensure Chart.js dependencies are installed: `npm install chart.js react-chartjs-2`

**Issue:** "Unauthorized" error  
**Solution:** Clear cookies/localStorage and login again with admin credentials

---

## 🎉 You're All Set!

The admin panel is fully functional with:
✅ Statistics Dashboard  
✅ User Management APIs  
✅ Category Creation  
✅ Visual Charts & Analytics  
✅ Secure Authentication  

Start exploring at: **http://localhost:3000/dashboard/admin**
