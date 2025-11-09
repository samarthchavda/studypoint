# 📊 Admin Dashboard Charts - Complete Implementation Guide

## Overview
The admin dashboard uses **Chart.js** with **react-chartjs-2** library to create beautiful, interactive data visualizations.

---

## 🎨 Chart Types Used

### 1. **Pie Chart** - Category Distribution
Shows how courses are distributed across different categories.

### 2. **Polar Area Chart** - Top Instructors
Displays top instructors by number of students or courses.

### 3. **Radar Chart** - Top Selling Courses
Shows the best-performing courses by student enrollment.

---

## 📦 Required Dependencies

Add these to your `package.json`:

```bash
npm install chart.js react-chartjs-2
```

```json
{
  "dependencies": {
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0"
  }
}
```

---

## 🔧 Implementation Steps

### Step 1: Backend API - Fetch Statistics

**File:** `server/controllers/adminCon.js`

```javascript
exports.getStats = async (req, res) => {
  try {
    // 1. Get basic counts
    const totalUsers = await User.countDocuments();
    const totalInstructors = await User.countDocuments({ accountType: "Instructor" });
    const totalStudents = await User.countDocuments({ accountType: "Student" });
    const totalCourses = await Course.countDocuments();
    const totalCategories = await Category.countDocuments();

    // 2. Get category-wise course distribution
    const categoryWiseCourses = await Course.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $group: {
          _id: "$category",
          name: { $first: "$categoryDetails.name" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$name",
          count: 1,
        },
      },
    ]);

    // 3. Get top selling courses
    const mostSellingCourses = await Course.find()
      .select("name thumbnail price studentsEnrolled")
      .populate("instructor", "firstName lastName")
      .sort({ studentsEnrolled: -1 })
      .limit(5);

    // 4. Get top instructors
    const topInstructors = await Course.aggregate([
      {
        $group: {
          _id: "$instructor",
          totalStudents: { $sum: { $size: "$studentsEnrolled" } },
          totalCourses: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "instructorDetails",
        },
      },
      {
        $unwind: "$instructorDetails",
      },
      {
        $project: {
          _id: 0,
          instructorId: "$_id",
          name: {
            $concat: [
              "$instructorDetails.firstName",
              " ",
              "$instructorDetails.lastName",
            ],
          },
          email: "$instructorDetails.email",
          totalStudents: 1,
          totalCourses: 1,
        },
      },
      {
        $sort: { totalStudents: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    // 5. Return all data
    return res.status(200).json({
      success: true,
      message: "Statistics fetched successfully",
      data: {
        stats: [{
          totalUsers,
          totalInstructors,
          totalStudents,
          totalCourses,
          totalCategories,
        }],
        categoryWiseCourses,
        mostSellingCourses,
        topInstructors: [topInstructors],
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
};
```

---

### Step 2: Frontend API Call

**File:** `src/services/operations/adminapi.js`

```javascript
import { adminEndpoints } from "../apis";
import apiConnector from "../apiConnector";

export async function getAdminDashboardDetails(token) {
  try {
    const response = await apiConnector(
      "GET",
      adminEndpoints.GET_ADMIN_STATS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.log("Error fetching admin dashboard details:", error);
    return null;
  }
}
```

---

### Step 3: Create Chart Components

#### **A. Category Pie Chart**

**File:** `src/components/dashboard/adminDashbboard/CategoryPieChart.jsx`

```jsx
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Helper function to generate random colors
const randomColors = (numColors) => {
  let colors = [];
  for (let i = 0; i < numColors; i++) {
    const randomColor = `rgba(
      ${Math.floor(Math.random() * 256)}, 
      ${Math.floor(Math.random() * 256)}, 
      ${Math.floor(Math.random() * 256)}, 
      0.5
    )`;
    colors.push(randomColor);
  }
  return colors;
};

const CategoryPieChart = ({ categoryData }) => {
  // Check if data exists
  if (!categoryData || categoryData.length === 0) {
    return (
      <div className="glass px-6 pb-6 py-4">
        <h2 className="text-richblack-5 text-2xl font-semibold">
          Category Distribution
        </h2>
        <div className="text-richblack-300">No category data available</div>
      </div>
    );
  }
  
  // Prepare chart data
  const data = {
    labels: categoryData.map((category) => category.category),
    datasets: [
      {
        label: "Courses",
        data: categoryData.map((category) => category.count),
        backgroundColor: randomColors(categoryData.length),
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className="glass px-6 pb-6 py-4">
      <h2 className="text-richblack-5 text-2xl font-semibold mb-4">
        Category Distribution
      </h2>
      <Pie
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: {
                usePointStyle: true,
                color: "#AFB2BF",
              },
            },
          },
        }}
        height={300}
        data={data}
      />
    </div>
  );
};

export default CategoryPieChart;
```

---

#### **B. Instructor Polar Chart**

**File:** `src/components/dashboard/adminDashbboard/InstructorPolarChart.jsx`

```jsx
import React, { useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const randomColors = (numColors) => {
  let colors = [];
  for (let i = 0; i < numColors; i++) {
    const randomColor = `rgba(
      ${Math.floor(Math.random() * 256)}, 
      ${Math.floor(Math.random() * 256)}, 
      ${Math.floor(Math.random() * 256)}, 
      0.5
    )`;
    colors.push(randomColor);
  }
  return colors;
};

const InstructorPolarChart = ({ insData }) => {
  const [currChart, setCurrChart] = useState("Students");

  if (!insData || insData.length === 0) {
    return (
      <div className="glass px-6 pb-6 py-4">
        <h2 className="text-richblack-5 text-2xl font-semibold">
          Top Instructors
        </h2>
        <div className="text-richblack-300">No instructor data available</div>
      </div>
    );
  }

  const data = {
    labels: insData.map((ins) => ins.name),
    datasets: [
      {
        label: currChart === "Students" ? "Students" : "Courses",
        data: currChart === "Students"
          ? insData.map((ins) => ins.totalStudents)
          : insData.map((ins) => ins.totalCourses),
        backgroundColor: randomColors(insData.length),
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className="glass px-6 pb-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-richblack-5 text-2xl font-semibold">
          Top Instructors
        </h2>
        <div>
          <button
            className={`${
              currChart === "Students"
                ? "bg-richblack-900 text-yellow-100"
                : "text-yellow-200"
            } font-medium px-3 py-2 rounded-lg`}
            onClick={() => setCurrChart("Students")}
          >
            Students
          </button>
          <button
            className={`${
              currChart === "Courses"
                ? "bg-richblack-900 text-yellow-100"
                : "text-yellow-200"
            } font-medium px-3 py-2 rounded-lg ml-2`}
            onClick={() => setCurrChart("Courses")}
          >
            Courses
          </button>
        </div>
      </div>
      
      <PolarArea
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: {
                usePointStyle: true,
                color: "#AFB2BF",
              },
            },
          },
          scales: {
            r: {
              ticks: {
                color: "#AFB2BF",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
            },
          },
        }}
        height={300}
        data={data}
      />
    </div>
  );
};

export default InstructorPolarChart;
```

---

#### **C. Top Selling Courses (Radar Chart)**

**File:** `src/components/dashboard/adminDashbboard/TopSellingCoursesChart.jsx`

```jsx
import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const TopSellingCoursesChart = ({ courseData }) => {
  if (!courseData || courseData.length === 0) {
    return (
      <div className="glass px-6 pb-6 py-4">
        <h2 className="text-richblack-5 text-2xl font-semibold">
          Top Selling Courses
        </h2>
        <div className="text-richblack-300">No course data available</div>
      </div>
    );
  }

  const data = {
    labels: courseData.map((course) => course.name),
    datasets: [
      {
        label: "Students Enrolled",
        data: courseData.map((course) => course.studentsEnrolled?.length || 0),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="glass px-6 pb-6 py-4">
      <h2 className="text-richblack-5 text-2xl font-semibold mb-4">
        Top Selling Courses
      </h2>
      <Radar
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: {
                usePointStyle: true,
                color: "#AFB2BF",
              },
            },
          },
          scales: {
            r: {
              ticks: {
                color: "#AFB2BF",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
            },
          },
        }}
        height={400}
        data={data}
      />
    </div>
  );
};

export default TopSellingCoursesChart;
```

---

### Step 4: Main Dashboard Page

**File:** `src/pages/dashboardPages/AdminPages/AdminDash.jsx`

```jsx
import React, { useEffect, useState } from "react";
import { getAdminDashboardDetails } from "../../../services/operations/adminapi";
import { useSelector } from "react-redux";
import Spinner from "../../../components/comman/Spinner";
import CategoryPieChart from "../../../components/dashboard/adminDashbboard/CategoryPieChart";
import InstructorPolarChart from "../../../components/dashboard/adminDashbboard/InstructorPolarChart";
import TopSellingCoursesChart from "../../../components/dashboard/adminDashbboard/TopSellingCoursesChart";
import Stats from "../../../components/dashboard/adminDashbboard/Stats";

const AdminDash = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  
  const [stats, setStats] = useState([]);
  const [categoryWiseCourses, setCategoryWiseCourses] = useState([]);
  const [mostSellingCourses, setMostSellingCourses] = useState([]);
  const [topInstructors, setTopInstructors] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAdminDashboardDetails(token);
        if (response) {
          setStats(response.stats || []);
          setCategoryWiseCourses(response.categoryWiseCourses || []);
          setMostSellingCourses(response.mostSellingCourses || []);
          setTopInstructors(response.topInstructors || []);
        }
      } catch (error) {
        console.error("Error fetching admin dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (token) {
      fetchData();
    }
  }, [token]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-richblack-5 mb-6">
        Admin Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="mb-6">
        <Stats data={stats[0]} />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <CategoryPieChart categoryData={categoryWiseCourses} />
        <InstructorPolarChart insData={topInstructors[0]} />
        <div className="md:col-span-2">
          <TopSellingCoursesChart courseData={mostSellingCourses} />
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
```

---

## 🎨 Styling

The dashboard uses Tailwind CSS with custom glass morphism effects:

```css
/* Add to your global CSS */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 📊 Chart Types Available in Chart.js

1. **Bar Chart** - `<Bar />`
2. **Line Chart** - `<Line />`
3. **Pie Chart** - `<Pie />`
4. **Doughnut Chart** - `<Doughnut />`
5. **Radar Chart** - `<Radar />`
6. **Polar Area Chart** - `<PolarArea />`
7. **Bubble Chart** - `<Bubble />`
8. **Scatter Chart** - `<Scatter />`

---

## 🔥 Key Features

✅ **Responsive Design** - Works on all screen sizes  
✅ **Interactive Charts** - Hover tooltips and legends  
✅ **Dynamic Data** - Updates in real-time from database  
✅ **Toggle Views** - Switch between different metrics  
✅ **Random Colors** - Auto-generates unique colors for each data point  
✅ **Glass Morphism** - Modern UI with blur effects  

---

## 🚀 How to Add Your Own Chart

1. **Choose Chart Type** (Pie, Bar, Line, etc.)
2. **Register Components** from Chart.js
3. **Fetch Data** from backend API
4. **Format Data** into labels and datasets
5. **Configure Options** (colors, legends, tooltips)
6. **Render Chart** component with data

---

## 📝 Example: Add a New Bar Chart

```jsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyBarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Revenue',
        data: data.map(item => item.revenue),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
};
```

---

## 🔗 Useful Resources

- **Chart.js Docs:** https://www.chartjs.org/docs/latest/
- **react-chartjs-2:** https://react-chartjs-2.js.org/
- **Chart Examples:** https://www.chartjs.org/docs/latest/samples/

---

## 🐛 Common Issues

### Issue: Chart not rendering
**Solution:** Make sure you've registered all required Chart.js components

### Issue: Colors not showing
**Solution:** Check backgroundColor and borderColor in dataset

### Issue: Data not updating
**Solution:** Ensure you're passing new data object (not mutating)

---

## ✅ Checklist

- [ ] Install chart.js and react-chartjs-2
- [ ] Create backend API endpoint for statistics
- [ ] Fetch data in frontend component
- [ ] Register Chart.js components
- [ ] Format data into chart format
- [ ] Add chart component with options
- [ ] Style with Tailwind CSS
- [ ] Test responsiveness

---

**That's it! You now have a complete admin dashboard with beautiful data visualizations! 🎉**
