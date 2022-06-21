import React from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
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
  Legend,
  ChartDataLabels
);


export const BarChartVertical = ({data, title}) => {
    const options = {
        indexAxis: "y",
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            display: false,
            labels: {
                usePointStyle: true,
              },
          },
          title: {
            display: true,
            text: title,
          },
          datalabels: {
            display: true,
            anchor: "end",
            align: "right",
            font: {
              weight: "bold",
            },
            color: "black",
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map(data => {
                  sum += data;
              });
              let percentage = (value*100 / sum).toFixed(1)+"%";
              return percentage;
          },
          },
        },
      };
  return (
      <Bar options={options} data={data} width={"auto"}/>
  );
};
