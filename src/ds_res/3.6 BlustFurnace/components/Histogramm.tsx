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
  const isThemeLight = currentTheme === "light";

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        ticks: {
          color: isThemeLight ? "#001729" : "#fff",
        },
      },
      y: {
        ticks: {
          color: isThemeLight ? "#001729" : "#fff",
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
        backgroundColor: isThemeLight ? "#D0E9FF" : "#456B8C",
      },
      {
        label: "Прогноз",
        data: data?.map((item) => item.prog),
        backgroundColor: isThemeLight ? "#78C98B" : "#347041",
      },
    ],
  };

  return <Bar options={options} data={dataSet} />;
};

export default Histogramm;
