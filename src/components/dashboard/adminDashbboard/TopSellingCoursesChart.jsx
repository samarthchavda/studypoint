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
const randomColors = (numColors) => {
  let colors = [];
  for (let i = 0; i < numColors; i++) {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)},0.5)`;
    colors.push(randomColor);
  }
  return colors;
};
const TopSellingCoursesChart = ({ courseData }) => {
  // Check if data exists
  if (!courseData || courseData.length === 0) {
    return (
      <div className="relative">
        <div className="glass px-6 pb-6 py-4">
          <h2 className="text-richblack-5 text-2xl font-semibold">
            Top Selling Courses
          </h2>
          <div className="text-richblack-300 mt-4">No course data available</div>
        </div>
      </div>
    );
  }
  
  const data = {
    labels: courseData?.map((course) => course.name),
    datasets: [
      {
        label: "Students Enrolled",
        data: courseData?.map((course) => {
          // Handle both array and number formats
          if (Array.isArray(course?.studentsEnrolled)) {
            return course.studentsEnrolled.length;
          }
          return course?.studentsEnrolled || 0;
        }),
        backgroundColor: randomColors(1),
        borderColor: randomColors(1),
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className="relative">
      <div
        className={`box1 backdrop-blur-2xl shadow-[1px_1px_300px_90px_#12D8FA] absolute top-1/2 left-1/2 h-1 w-1 rounded-full`}
      ></div>
      <div className="glass  px-6 pb-6 py-4">
        <h2 className="text-richblack-5 text-2xl font-semibold">
          Top Selling Courses
        </h2>

        <div className="px-5 sm:px-14 lg:px-44">
          <Radar
            options={{
              offset: 0,
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
            height={"400"}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default TopSellingCoursesChart;
