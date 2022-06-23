import React from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const DoughnutChart = ({ data, title, settings }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: title,
        position: 'top',
        align: 'start',
        font: {
          weight: "bold",
          size: settings.titleFontSize,
          family: "'Poppins', sans-serif"
        },
      },
      datalabels: {
        display: settings.hasDataLabels,
        anchor: settings.dataLabelPosition,
        align: settings.dataLabelAlignment,
        font: {
          weight: "bold",
          size: settings.dataLabelFontSize,
        },
        color: "black",
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(settings.dataLabelSigFig) + "%";
          return percentage;
        },
      },
    },
  };
  return (
      <Doughnut options={options} data={data} width={"auto"}/>
  );
};
