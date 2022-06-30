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
  {
    label: "Answer Count",
    value: "numbercount",
  },
];

export const ChartBox = forwardRef(
  ({ item, index, faded, style, handleDeletion, opensettings, ...props }, ref) => {
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
      border: item.selected ? "2px solid #15bcc7" : "2px solid #EEEE",
      borderRadius: "5px",
      overflow: "hidden",
      paddingTop: "5px",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      boxShadow:
        "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
      ...style,
    };

    const refer = useRef(null);

    const VerticalBarChart = () => {
      return (
        <div className={styles.chart}>
          <BarChartVertical
            data={item.data}
            title={item.titleLabel}
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
            title={item.titleLabel}
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
    const HorizontalBarChart = () => {
      return (
        <div className={styles.chart}>
          <BarChartHorizontal
            data={item.data}
            title={item.titleLabel}
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
            title={item.titleLabel}
            settings={item.design_settings}
          />
        </div>
      );
    };

    const GenericNumber = () => {
      return (
        <div className={styles.participants}>
          <span>{item.total}</span>
          <h6>{item.titleLabel}</h6>
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

    const handleDeleteChart = () => {
      //return index
      handleDeletion(index);
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
            {item.type === "verticalbarchart" && VerticalBarChart()}
            {item.type === "linechart" && lineChart()}
            {item.type === "horizontalbarchart" && HorizontalBarChart()}
            {item.type === "doughnutchart" && pieChart()}
            {item.type === "numbercount" && GenericNumber()}
          </div>
          <div className={styles.editbuttons}>
            {/* <span>Total Answered: </span> */}
            <button
              onClick={() => {
                opensettings(!item.selected);
                item.selected = !item.selected;
              }}
              className={styles.editchart}
            >
              <i className="bi bi-three-dots"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
);
