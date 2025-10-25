import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import YellowBtn from "../../comman/YellowBtn";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
ChartJS.register(ArcElement, Tooltip, Legend);

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
const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        padding: 20,
        color: "#AFB2BF", // richblack-300
      },
    },
  },
};
const CategoryPieChart = ({ categoryData }) => {
  const navigate = useNavigate();
  const data = {
    labels: categoryData?.map((category) => category.name),
    datasets: [
      {
        label: "students",
        data: categoryData?.map((category) => category.totalStudents),
        backgroundColor: randomColors(categoryData?.length),
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="flex flex-col  gap-1 relative">
      <div
        className={`box1 backdrop-blur-2xl shadow-[1px_1px_300px_90px_rgba(71,165,197,1)] absolute top-1/2 left-1/2 h-1 w-1 rounded-full`}
      ></div>
      <div className="w-full flex flex-col gap-5 glass  px-6 pb-6 py-4 h-full">
        <h2 className="text-richblack-5 text-2xl font-semibold">Most Engaging Categories</h2>
        <div className="w-full h-full">
        <Pie
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
        />{" "}
        </div>
      </div>
    </div>
  );
};

export default CategoryPieChart;
