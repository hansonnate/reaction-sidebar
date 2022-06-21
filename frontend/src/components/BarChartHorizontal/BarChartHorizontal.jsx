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


export const BarChartHorizontal = ({data, title}) => {
    const options = {
        indexAxis: "x",
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "top",
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
            anchor: "center",
            align: "center",
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
              let percentage = (value*100 / sum).toFixed(0)+"%";
              return percentage;
          },
          },
        },
      };
  return (
      <Bar options={options} data={data} width={"auto"}/>
  );
};
