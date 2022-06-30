import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({ data, title, settings}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: settings.hasLegend,
        position: settings.legendPosition,
        font: {
          size: settings.legendFontSize,
        },
        labels: {
          usePointStyle: settings.legendPointStyle,
        },
      },
      title: {
        display: settings.hasTitle,
        text: title,
        align: settings.titleAlignment,
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
          if (settings.dataLabelPercentages === true) {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data) => {
              sum += data;
            });
            let percentage =
              ((value * 100) / sum).toFixed(settings.dataLabelSigFig) + "%";
            return percentage;
          } else {
            return value;
          }
        },
      },
    },
  };
  return (
      <Line options={options} data={data} width={"auto"}/>
  );
};
