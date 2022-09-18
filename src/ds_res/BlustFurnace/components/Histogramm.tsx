import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Histogramm = ({ data }) => {
  const labels = data?.map((item) => item.time_char);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: false,
    },
  };

  const dataSet = {
    labels,
    datasets: [
      {
        label: "План",
        data: data?.map((item) => item.plan),
        backgroundColor: "#D0E9FF",
      },
      {
        label: "Прогноз",
        data: data?.map((item) => item.prog),
        backgroundColor: "#78C98B",
      },
    ],
  };

  return <Bar options={options} data={dataSet} />;
};

export default Histogramm;
