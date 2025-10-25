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
  const data = {
    labels: courseData?.map((course) => course.name),
    datasets: [
      {
        label: "students",
        data: courseData?.map((course) => course?.studentsEnrolled),
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
          Most Selling Courses
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
