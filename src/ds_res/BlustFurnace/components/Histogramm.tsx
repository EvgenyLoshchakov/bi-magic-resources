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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Bar } from "react-chartjs-2";

const Histogramm = ({ data, currentTheme }) => {
  const labels = data?.map((item) => item.time_char);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        ticks: {
          color: currentTheme === "light" ? "#001729" : "#fff",
        },
      },
      y: {
        ticks: {
          color: currentTheme === "light" ? "#001729" : "#fff",
        },
      },
    },
  };

  const dataSet = {
    labels,
    datasets: [
      {
        label: "План",
        data: data?.map((item) => item.plan),
        backgroundColor: "#D0E9FF",
        color: "red",
      },
      {
        label: "Прогноз",
        data: data?.map((item) => item.prog),
        backgroundColor: "#78C98B",
        color: "blue",
      },
    ],
  };

  return <Bar options={options} data={dataSet} />;
};

export default Histogramm;
