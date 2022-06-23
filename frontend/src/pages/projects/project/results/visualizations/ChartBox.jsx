import React, { forwardRef, useRef, useEffect } from "react";
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
  ({ item, index, faded, style, ...props }, ref) => {
    // const [selected, setSelected] = useState(false);
    const inlineStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      height: index === 0 ? 570 : 280,
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "white",
      border: item.selected ? "2px solid #15bcc7" : "2px solid white",
      borderRadius: "5px",
      overflow: "hidden",
      paddingTop: "5px",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
      ...style,
    };

    const refer = useRef(null);


    const participantPercentage = () => {
      return (
        <div className={styles.chart}>
          <BarChartVertical
            data={item.data}
            title="Participant Percentage"
            settings={item.design_settings}
          />
        </div>
      );
    };
    const lineChart = () => {
      return (
        <div className={styles.chart}>
          <LineChart
            data={item.data}
            title="Trending Score"
            settings={item.design_settings}
          />
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
            settings={item.design_settings}
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
            settings={item.design_settings}
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

    const handleClickOutside = (event) => {
      if (refer.current && !refer.current.contains(event.target)) {
        item.selected = false;
        // if (props.insidesettings === false) {
        //   setSelected(false);
        //   // setSelected(true);
        //   // props.opensettings(false);
        // }
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }, []);

    return (
      <div ref={ref} style={inlineStyles}>
        <div
          ref={refer}
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          {" "}
          <div className={styles.chartholder} {...props}>
            {item.type === "verticalbarchart" && participantPercentage()}
            {item.type === "linechart" && lineChart()}
            {item.type === "horizontalbarchart" && rankingQuestion1()}
            {item.type === "doughnutchart" && pieChart()}
            {item.type === "numbercount" && numParticipants()}
          </div>
          <div className={styles.editbuttons}>
            <button
              onClick={() => {
                props.opensettings(!item.selected);
                item.selected = !item.selected;
              }}
              className={styles.editchart}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
);
