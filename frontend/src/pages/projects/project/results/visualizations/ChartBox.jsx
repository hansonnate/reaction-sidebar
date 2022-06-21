import React, { forwardRef, useState } from "react";
import styles from "./Visualizations.module.scss";
import { BarChartVertical } from "components/BarChartVertical/BarChartVertical";
import { BarChartHorizontal } from "components/BarChartHorizontal/BarChartHorizontal";
import { DoughnutChart } from "components/DoughnutChart/DoughnutChart";
import { LineChart } from "components/LineChart/LineChart";

/* eslint-disable */

const options = [
  {
    label: "Vertical Bar Chart",
    value: "verticalbarchart",
  },
  {
    label: "Horizontal Bar Chart",
    value: "horizontalbarchart",
  },
  {
    label: "Line Chart",
    value: "linechart",
  },
  {
    label: "Doughnut Chart",
    value: "doughnutchart",
  },
];

export const ChartBox = forwardRef(
  ({ item, index, faded, style, setType, currType, ...props }, ref) => {
    let type = "trending";
    const inlineStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      height: index === 0 ? 570 : 280,
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "white",
      border: "2px solid #EFEFEF",
      borderRadius: "5px",
      overflow: "hidden",
      paddingTop: "5px",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      ...style,
    };
    if (item.type === "sentinfo") {
      type = "verticalbarchart";
    }

    // const [currChartType, setCurrChartType] = useState(item.type);
    const [clicked, setClicked] = useState(false);
    // function chartType(charttype) {
    //   console.log(charttype);
    //   switch (charttype) {
    //     case charttype === "verticalbarchart":
    //       return (
    //         <div className={styles.chart}>
    //           <BarChartVertical data={item.data} title="Participant Percentage" />
    //         </div>
    //       );
    //     case charttype === "horizontalbarchart":
    //       return (
    //         <BarChartHorizontal
    //           data={item.data}
    //           title="How likely are you to recommend Primary Medical Group to a friend or to a family member?"
    //         />
    //       );
    //     case charttype === "linechart":
    //       return (
    //         <div className={styles.chart}>
    //           <LineChart data={item.data} title="Trending Score" />
    //         </div>
    //       );
    //     case charttype === "doughnutchart":
    //       return (
    //         <div className={styles.chart}>
    //           <DoughnutChart
    //             data={item.data}
    //             title="How much wood could a wood chuck chuck?"
    //           />
    //         </div>
    //       );
    //     default:
    //       return (<p>Hmm nope</p>);
    //   }
    // };

    const participantPercentage = () => {
      return (
        <div className={styles.chart}>
          <BarChartVertical data={item.data} title="Participant Percentage" />
        </div>
      );
    };
    const lineChart = () => {
      return (
        <div className={styles.chart}>
          <LineChart data={item.data} title="Trending Score" />
        </div>
      );
    };
    // const trendedNPSScore = () => {
    //   return (
    //     <div className={styles.chart}>
    //       <LineChart data={item.data} title="Trended NPS" />
    //     </div>
    //   );
    // };
    const rankingQuestion1 = () => {
      return (
        <div className={styles.chart}>
          <BarChartHorizontal
            data={item.data}
            title="How likely are you to recommend Primary Medical Group to a friend or to a family member?"
          />
        </div>
      );
    };
    const pieChart = () => {
      return (
        <div className={styles.chart}>
          <DoughnutChart
            data={item.data}
            title="How much wood could a wood chuck chuck?"
          />
        </div>
      );
    };

    const numParticipants = () => {
      return (
        <div className={styles.participants}>
          <span>250</span>
          <h6>Participants</h6>
        </div>
      );
    };

    return (
      <div ref={ref} style={inlineStyles}>
        {" "}
        <div className={styles.chartholder} {...props}>
          {currType === "verticalbarchart" && participantPercentage()}
          {currType === "linechart" && lineChart()}
          {currType === "horizontalbarchart" && rankingQuestion1()}
          {currType === "doughnutchart" && pieChart()}
          {currType === "numbercount" && numParticipants()}
        </div>
        <button
          onClick={() => setClicked(!clicked)}
          className={styles.editbutton}
        >
          <i className="bi bi-three-dots"></i>
        </button>
        {clicked && (
          <>
            {currType !== "numbercount" && (
              <div className={styles.dropdown}>
                {options.map((option) => (
                  <span onClick={() => setCurrType(option.value)}>
                    {option.label}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);
