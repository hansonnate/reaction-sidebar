import React from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
    datalabels: {
      display: true,
      anchor: "center",
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
        let percentage = (value*100 / sum).toFixed(2)+"%";
        return percentage;
    },
    },
  },
};

export const DoughnutChart = ({data}) => {

  return (
    <div>
      <Doughnut options={options} data={data} />
    </div>
  );
};
