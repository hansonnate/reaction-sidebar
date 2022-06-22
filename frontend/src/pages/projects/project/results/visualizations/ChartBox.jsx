import React, { forwardRef, useState, useRef, useEffect } from "react";
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
    const [selected, setSelected] = useState(false);
    const inlineStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      height: index === 0 ? 570 : 280,
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "white",
      border: selected ? "2px solid #15bcc7" : "2px solid #EFEFEF",
      borderRadius: "5px",
      overflow: "hidden",
      paddingTop: "5px",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      ...style,
    };

    
    const [chartClicked, setchartClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [hasLabels, setHasLabels] = useState(
      item.design_settings.hasDataLabels
    );

    const participantPercentage = () => {
      return (
        <div className={styles.chart}>
          <BarChartVertical
            data={item.data}
            title="Participant Percentage"
            settings={item.design_settings}
            dataLabels={item.design_settings.hasDataLabels}
            dataLabelFontSize={item.design_settings.dataLabelFontSize}
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
            dataLabels={item.design_settings.hasDataLabels}
            dataLabelFontSize={item.design_settings.dataLabelFontSize}
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
            dataLabels={item.design_settings.hasDataLabels}
            dataLabelFontSize={item.design_settings.dataLabelFontSize}
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
            dataLabels={item.design_settings.hasDataLabels}
            dataLabelFontSize={item.design_settings.dataLabelFontSize}
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

    function changeType(value) {
      item.type = value;
      setchartClicked(false);
      // console.log(item.type);
      // setCurrChartType(value);
    }

    function handleLabels(value) {
      item.design_settings.hasDataLabels = !value;
      // console.log(item.design_settings.hasDataLabels);
    }

    const refer = useRef(null);

    const handleClickOutside = (event) => {
      if (refer.current && !refer.current.contains(event.target)) {
        setchartClicked(false);
        setEditClicked(false);
        setSelected(false);
        props.openSettings(false);
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }, []);

    return (
      <div ref={ref} style={inlineStyles} >
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
                setchartClicked(!chartClicked);
                setEditClicked(false);
              }}
              className={styles.editchart}
            >
              <i className="bi bi-bar-chart"></i>
            </button>
            <button
              onClick={() => {
                // setEditClicked(!editClicked);
                setchartClicked(false);
                setSelected(!selected);
                props.openSettings(!selected);
              }}
              className={styles.editchart}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
          </div>
          {chartClicked && (
            <>
              {item.type !== "numbercount" && (
                <div className={styles.chartdropdown}>
                  {options.map((option) => (
                    <span
                      key={option.value}
                      onClick={() => changeType(option.value)}
                    >
                      {option.label}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
          {editClicked && (
            <>
              {item.type !== "numbercount" && (
                <div className={styles.editdropdown}>
                  <div className="setting">
                    <span>Font:</span>
                    <select>
                      <option value="12pt">12pt</option>
                      <option value="18pt">18pt</option>
                      <option value="24pt">24pt</option>
                      <option value="36pt">36pt</option>
                    </select>
                  </div>
                  <div className="setting">
                    <input
                      type="checkbox"
                      checked={hasLabels}
                      onChange={() => {
                        handleLabels(item.design_settings.hasDataLabels);
                        setHasLabels(!hasLabels);
                      }}
                    ></input>
                    <span>DataLabels</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);
