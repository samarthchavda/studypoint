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

  const data = {
    labels:
      currChart === "Students"
        ? insData?.byStudents?.map(
            (ins) => `${ins?.firstName} ${ins?.lastName}`
          )
        : insData?.byIncome?.map((ins) => `${ins?.firstName} ${ins?.lastName}`),
    datasets: [
      {
        label: currChart === "Students" ? "Students" : "Rupees",
        data:
          currChart === "Students"
            ? insData?.byStudents?.map((ins) => ins?.totalStudents)
            : insData?.byIncome?.map((ins) => ins?.income),
        backgroundColor:
          currChart === "Students"
            ? randomColors(insData?.byStudents?.length)
            : randomColors(insData?.byIncome?.length),
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
              Most Loved Instructors
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
                  currChart === "Income"
                    ? "bg-richblack-900/50 text-yellow-100"
                    : "text-yellow-200/60"
                } font-medium px-3 py-2 rounded-lg`}
                onClick={() => setCurrChart("Income")}
              >
                Income
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
