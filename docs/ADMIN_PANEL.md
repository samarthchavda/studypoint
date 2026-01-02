# Admin Panel Guide

## What is the Admin Panel?

The Admin Panel is a restricted dashboard that allows administrators to manage and monitor the StudyNotion platform. Only users with `accountType: "Admin"` can access admin features.

## Recommended Libraries for Admin Panel UI

### Core Libraries (Already Installed)
- **React** - Frontend framework
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - API calls
- **React Hot Toast** - Notifications

### Admin Dashboard Libraries

#### Option 1: **React-Admin** (Recommended)
```bash
npm install react-admin ra-data-simple-rest
```
**Features:**
- Built specifically for admin panels
- Automatic CRUD UI generation
- Built-in data tables, forms, filters
- Authentication & authorization support
- Material-UI based
- Best for rapid development

#### Option 2: **Ant Design Pro**
```bash
npm install antd @ant-design/pro-components
```
**Features:**
- Professional admin template
- Rich component library
- Charts and graphs included
- TypeScript support
- Chinese & international companies use it

#### Option 3: **Material-UI + Custom Components** (Most Flexible)
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/x-data-grid @mui/icons-material
```
**Features:**
- Build custom admin UI from scratch
- Material Design components
- Advanced data grid
- Complete control over design
- Best for custom requirements

### Chart & Analytics Libraries

#### **Recharts** (Recommended)
```bash
npm install recharts
```
- Simple and clean charts
- Responsive design
- Easy to customize
- Works perfectly with React

#### **Chart.js with React-Chartjs-2**
```bash
npm install chart.js react-chartjs-2
```
- Most popular charting library
- Multiple chart types (Line, Bar, Pie, Doughnut)
- Excellent documentation

#### **ApexCharts**
```bash
npm install apexcharts react-apexcharts
```
- Modern interactive charts
- Beautiful defaults
- Smooth animations

### Data Table Libraries

#### **TanStack Table (React Table v8)** (Recommended)
```bash
npm install @tanstack/react-table
```
- Headless UI for tables
- Sorting, filtering, pagination
- Highly customizable
- Best performance
- Lightweight

#### **Material-UI Data Grid**
```bash
npm install @mui/x-data-grid
```
- Feature-rich data table
- Built-in sorting & filtering
- Export functionality (CSV, Excel)

### Additional Utility Libraries

```bash
# Date handling
npm install date-fns

# Excel export
npm install xlsx

# PDF generation
npm install jspdf jspdf-autotable

# Rich text editor (for content management)
npm install react-quill

# Form validation
npm install react-hook-form yup
```

## Recommended Tech Stack

```
Admin Panel Frontend:
├── React (existing)
├── Redux Toolkit (existing)
├── Material-UI (@mui/material) - UI components
├── TanStack Table - Data tables
├── Recharts - Charts & graphs
├── date-fns - Date formatting
└── axios (existing) - API calls

Admin Panel Backend:
├── Express.js (existing)
├── MongoDB (existing)
├── JWT Authentication (existing)
└── Admin middleware (existing)
```

## Admin Features

### 1. **User Management**
   - View all registered users (Students & Instructors)
   - Delete users (except other admins)
   - View user details and enrolled courses
   - Filter and search users

### 2. **Course Management**
   - View all courses on the platform
   - Delete courses
   - Create course categories
   - Monitor course performance

### 3. **Contact & Support**
   - View all contact form submissions
   - View demo booking requests
   - Delete contact entries
   - Respond to inquiries

### 4. **Analytics & Statistics**
   - View platform statistics
   - Monitor user activity
   - Track course enrollments
   - Revenue analytics

## How to Create an Admin User

### Method 1: Using the Script (Recommended)

Run the admin creation script from the terminal:

```bash
cd server
node scripts/createAdmin.js
```

**Default Admin Credentials:**
- Email: `admin@studynotion.com`
- Password: `Admin@123`

### Method 2: Manual Creation via Database

Add a user document with `accountType: "Admin"` directly in MongoDB.

## Admin API Routes

All admin routes are protected with `auth` and `isAdmin` middleware:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/admin/getAllUsers` | Fetch all users |
| GET | `/api/v1/admin/getAllCourses` | Fetch all courses |
| GET | `/api/v1/admin/getAllContacts` | Fetch contact submissions |
| GET | `/api/v1/admin/getAllDemoBookings` | Fetch demo bookings |
| GET | `/api/v1/admin/getStats` | Get platform statistics |
| DELETE | `/api/v1/admin/deleteUser` | Delete a user |
| DELETE | `/api/v1/admin/deleteCourse` | Delete a course |
| DELETE | `/api/v1/admin/deleteContact` | Delete contact entry |
| DELETE | `/api/v1/admin/deleteDemoBooking` | Delete demo booking |

## Admin Permissions

- ✅ Create course categories
- ✅ Delete users (except admins)
- ✅ Delete courses
- ✅ View all platform data
- ✅ Access admin-only routes
- ❌ Cannot enroll in courses
- ❌ Cannot be deleted by other admins

## Security

- Admin routes are protected with authentication middleware
- Only `accountType: "Admin"` can access admin features
- Admins cannot delete other admin accounts
- All actions require valid JWT token

## Building the Admin UI - Step by Step

### Step 1: Install Required Libraries

Choose one approach:

**Approach A - Using Material-UI (Recommended for this project):**
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/x-data-grid @mui/icons-material
npm install recharts date-fns @tanstack/react-table
```

**Approach B - Using React-Admin (Fastest):**
```bash
npm install react-admin ra-data-simple-rest
```

### Step 2: Create Admin Components

Create these files in `src/components/dashboard/admin/`:

```
src/components/dashboard/admin/
├── AdminDashboard.jsx       # Main dashboard with stats
├── UserManagement.jsx       # User table & CRUD operations
├── CourseManagement.jsx     # Course table & CRUD operations
├── ContactManagement.jsx    # Contact form submissions
├── Analytics.jsx            # Charts and statistics
├── AdminTable.jsx           # Reusable data table component
└── StatCard.jsx             # Reusable stat card component
```

### Step 3: Add Admin Routes

Update `src/App.js`:
```javascript
import AdminDashboard from './components/dashboard/admin/AdminDashboard';

// Inside Routes
<Route 
  path="/dashboard/admin" 
  element={
    <PrivateRoute>
      <AdminDashboard />
    </PrivateRoute>
  } 
/>
```

### Step 4: Create Admin API Service

Create `src/services/operations/adminApi.js`:
```javascript
import { apiConnector } from "../apiConnector";
import { adminEndpoints } from "../apis";

export async function getAllUsers(token) {
  const response = await apiConnector(
    "GET", 
    adminEndpoints.GET_ALL_USERS_API,
    null,
    { Authorization: `Bearer ${token}` }
  );
  return response.data;
}

// Add more functions for other admin operations
```

### Step 5: Add Admin Endpoints

Update `src/services/apis.js`:
```javascript
export const adminEndpoints = {
  GET_ALL_USERS_API: baseUrl + "/admin/getAllUsers",
  GET_ALL_COURSES_API: baseUrl + "/admin/getAllCourses",
  GET_ALL_CONTACTS_API: baseUrl + "/admin/getAllContacts",
  GET_STATS_API: baseUrl + "/admin/getStats",
  DELETE_USER_API: baseUrl + "/admin/deleteUser",
  DELETE_COURSE_API: baseUrl + "/admin/deleteCourse",
};
```

## Usage Example

1. **Create Admin Account:**
   ```bash
   cd server
   node scripts/createAdmin.js
   ```

2. **Login as Admin:**
   - Go to login page (`http://localhost:3000/login`)
   - Enter: `admin@studynotion.com` / `Admin@123`
   - You'll be redirected to the dashboard

3. **Access Admin Panel:**
   - Navigate to `/dashboard/admin`
   - View statistics, manage users & courses
   - Use charts to analyze platform performance

4. **Make API Calls:**
   ```javascript
   const users = await getAllUsers(token);
   const stats = await getStats(token);
   ```

## Sample Admin Dashboard Layout

```
+--------------------------------------------------+
|  Admin Dashboard                    [Logout]     |
+--------------------------------------------------+
|  📊 Total Users: 150  |  📚 Total Courses: 45   |
|  📝 Contacts: 23      |  💰 Revenue: ₹2,45,000 |
+--------------------------------------------------+
|  [Users] [Courses] [Contacts] [Analytics]       |
+--------------------------------------------------+
|                                                  |
|  User Management                                 |
|  +--------------------------------------------+  |
|  | Name       | Email         | Role  | ...   |  |
|  +--------------------------------------------+  |
|  | John Doe   | john@...     | Student| [Del] |  |
|  | Jane Smith | jane@...     | Instructor|... |  |
|  +--------------------------------------------+  |
|                                                  |
+--------------------------------------------------+
```

## Notes

- Backend admin functionality is already implemented
- Frontend admin UI needs to be built
- Use the recommended libraries for faster development
- Protect admin routes with proper authentication
- Check `server/controllers/adminCon.js` for complete backend logic
- Refer to `server/routes/adminRoute.js` for all available routes
