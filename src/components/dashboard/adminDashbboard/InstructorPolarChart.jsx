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
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)},0.5)`;
    colors.push(randomColor);
  }
  return colors;
};
const InstructorPolarChart = ({ insData }) => {
  const [currChart, setCurrChart] = useState("Students");

  // Check if data exists and is in correct format
  // insData comes as array from backend, not object with byStudents/byIncome
  if (!insData || insData.length === 0) {
    return (
      <div className="relative">
        <div className="glass flex flex-col gap-3 px-6 pb-6 py-4">
          <h2 className="text-richblack-5 text-2xl font-semibold">
            Top Instructors
          </h2>
          <div className="text-richblack-300">No instructor data available</div>
        </div>
      </div>
    );
  }

  const data = {
    labels: insData?.map((ins) => ins?.name || `${ins?.firstName} ${ins?.lastName}`),
    datasets: [
      {
        label: currChart === "Students" ? "Students" : "Courses",
        data: currChart === "Students"
          ? insData?.map((ins) => ins?.totalStudents || 0)
          : insData?.map((ins) => ins?.totalCourses || 0),
        backgroundColor: randomColors(insData?.length),
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className=" relative">
      <div
        className={`box1 backdrop-blur-2xl shadow-[1px_1px_300px_90px_#E65C00] absolute top-1/2 left-1/2 h-1 w-1 rounded-full`}
      ></div>
      <div className="glass flex flex-col gap-3 px-6 pb-6 py-4">
        <div>
          <div className="flex items-center justify-between gap-1">
            <h2 className="text-richblack-5 text-2xl font-semibold">
              Top Instructors
            </h2>

            <div>
              <button
                className={`${
                  currChart === "Students"
                    ? "bg-richblack-900/50 text-yellow-100"
                    : "text-yellow-200/60"
                } font-medium px-3 py-2 rounded-lg`}
                onClick={() => setCurrChart("Students")}
              >
                Students
              </button>
              <button
                className={`${
                  currChart === "Courses"
                    ? "bg-richblack-900/50 text-yellow-100"
                    : "text-yellow-200/60"
                } font-medium px-3 py-2 rounded-lg`}
                onClick={() => setCurrChart("Courses")}
              >
                Courses
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <PolarArea
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
            height={"300"}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default InstructorPolarChart;
