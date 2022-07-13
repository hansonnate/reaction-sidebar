// External
import React, { useState, useRef, useEffect } from "react";
import styles from "./Visualizations.module.scss";
import { Grid } from "./Grid";
import { SortableBox } from "./SortableBox";
import { ChartBox } from "./ChartBox";

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SplitHorizontal } from "components/layouts";
import { VizSettings } from "components/VizSettings/VizSettings";
import {
  useFetchVisualizationGql,
  useFetchVisualizationsGql,
} from "api/resources/projects/visualizations";

// Internal

export const Visualizations = () => {
  const ref = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  /* eslint-disable no-unused-vars */
  const fetchVisualization = useFetchVisualizationGql();
  const fetchVisualizations = useFetchVisualizationsGql();

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSettingsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const rankingQuestionData = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Score",
        data: [0, 3, 2, 5, 6, 3, 2, 5, 8, 10, 40],
        // you can set indiviual colors for each bar
        backgroundColor: "#ED9146",
        borderWidth: 1,
      },
    ],
  };
  const data = {
    labels: ["Completed", "Open", "Unopen", "Bounced"],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Amount",
        data: [125, 38, 75, 12],
        // you can set indiviual colors for each bar
        backgroundColor: "#ED9146",
        borderWidth: 1,
      },
    ],
  };

  const doughnutdata = {
    labels: ["9", "14", "6", "None", "Does it matter?", "As much as he could"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "#15bcc7",
          "#7fcfd3",
          "#b5e1df",
          "#ed9146",
          "#edb57e",
          "#f4e3c2",
        ],
        borderWidth: 1,
      },
    ],
  };
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "RFMG",
        data: [12, 145, 345, 314, 132, 344],
        borderColor: "#15bcc7",
        backgroundColor: "#15bcc7",
      },
      {
        label: "PMG",
        data: [555, 685, 412, 235, 124, 236],
        borderColor: "#ed9146",
        backgroundColor: "#ed9146",
      },
    ],
  };
  const trendedNPSData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Score",
        data: [54.76, 52.32, 54.72, 61.29],
        borderColor: "#15bcc7",
        backgroundColor: "#15bcc7",
      },
    ],
  };

  const display = [
    {
      data: data,
      total: 250,
      index: 0,
      title: "Participant Percentage",
      titleLabel: "Participant Percentage",
      type: "verticalbarchart",
      selected: false,
      design_settings: {
        hasDataLabels: true,
        dataLabelFontSize: 20,
        dataLabelPosition: "end",
        dataLabelAlignment: "right",
        dataLabelSigFig: 1,
        dataLabelPercentages: true,
        hasTitle: true,
        titleLabel: "Participant Percentage",
        titleFontSize: 12,
        titleAlignment: "center",
        hasLegend: false,
        legendPosition: "top",
        legendFontSize: 12,
        legendPointStyle: true,
      },
      id: 0,
    },
    {
      data: data,
      total: 250,
      index: 0,
      type: "numbercount",
      title: "Participants",
      titleLabel: "Participants",
      selected: false,
      design_settings: {
        hasDataLabels: true,
        dataLabelFontSize: 12,
        dataLabelPosition: "center",
        dataLabelAlignment: "center",
        dataLabelSigFig: 1,
        dataLabelPercentages: true,
        hasTitle: true,
        titleLabel: "Participants",
        titleFontSize: 12,
        titleAlignment: "center",
        hasLegend: true,
        legendPosition: "top",
        legendFontSize: 12,
        legendPointStyle: true,
      },
      id: 1,
    },
    {
      data: lineData,
      total: 235,
      index: 0,
      title: "Trending Score",
      titleLabel: "Trending Score",
      type: "linechart",
      selected: false,
      design_settings: {
        hasDataLabels: false,
        dataLabelFontSize: 12,
        dataLabelPosition: "center",
        dataLabelAlignment: "center",
        dataLabelSigFig: 1,
        dataLabelPercentages: false,
        hasTitle: true,
        titleLabel: "Trending Score",
        titleFontSize: 12,
        titleAlignment: "center",
        hasLegend: true,
        legendPosition: "top",
        legendFontSize: 12,
        legendPointStyle: true,
      },
      id: 2,
    },
    {
      data: doughnutdata,
      total: 250,
      index: 0,
      type: "doughnutchart",
      title: "How much wood could a wood chuck chuck?",
      titleLabel: "How much wood could a wood chuck chuck?",
      selected: false,
      design_settings: {
        hasDataLabels: true,
        dataLabelFontSize: 12,
        dataLabelPosition: "center",
        dataLabelAlignment: "center",
        dataLabelSigFig: 1,
        dataLabelPercentages: true,
        hasTitle: true,
        titleLabel: "How much wood could a wood chuck chuck?",
        titleFontSize: 12,
        titleAlignment: "center",
        hasLegend: true,
        legendPosition: "bottom",
        legendFontSize: 12,
        legendPointStyle: true,
      },
      id: 3,
    },
    {
      data: rankingQuestionData,
      total: 250,
      index: 0,
      type: "horizontalbarchart",
      title:
        "How likely are you to recommend Primary Medical Group to a friend or to a family member?",
      titleLabel:
        "How likely are you to recommend Primary Medical Group to a friend or to a family member?",
      selected: false,
      design_settings: {
        hasDataLabels: true,
        dataLabelFontSize: 12,
        dataLabelPosition: "center",
        dataLabelAlignment: "center",
        dataLabelSigFig: 0,
        dataLabelPercentages: true,
        hasTitle: true,
        titleLabel:
          "How likely are you to recommend Primary Medical Group to a friend or to a family member?",
        titleFontSize: 12,
        titleAlignment: "center",
        hasLegend: false,
        legendPosition: "top",
        legendFontSize: 12,
        legendPointStyle: true,
      },
      id: 4,
    },
    {
      data: trendedNPSData,
      total: 250,
      index: 0,
      type: "linechart",
      title: "Trended NPS",
      titleLabel: "Trended NPS",
      selected: false,
      design_settings: {
        hasDataLabels: false,
        dataLabelFontSize: 12,
        dataLabelPosition: "center",
        dataLabelAlignment: "center",
        dataLabelSigFig: 1,
        dataLabelPercentages: true,
        hasTitle: true,
        titleLabel: "Trended NPS",
        titleFontSize: 12,
        titleAlignment: "center",
        hasLegend: true,
        legendPosition: "top",
        legendFontSize: 12,
        legendPointStyle: true,
      },
      id: 5,
    },
  ];

  const defaultChart = {
    data: data,
    total: 250,
    index: 0,
    title: "Participant Percentage",
    titleLabel: "Participant Percentage",
    type: "verticalbarchart",
    selected: false,
    design_settings: {
      hasDataLabels: true,
      dataLabelFontSize: 12,
      dataLabelPosition: "end",
      dataLabelAlignment: "right",
      dataLabelSigFig: 1,
      dataLabelPercentages: true,
      hasTitle: true,
      titleLabel: "Participant Percentage",
      titleFontSize: 12,
      titleAlignment: "center",
      hasLegend: false,
      legendPosition: "top",
      legendFontSize: 12,
      legendPointStyle: true,
    },
    id: 0,
  };
  const [items, setItems] = useState(display);
  const [selectedIndex, setSelectedIndex] = useState();

  function handleDeleteChart() {
    let index = selectedIndex;
    console.log(index);
    var array = items; // make a separate copy of the array
    // var index = array.indexOf(i)
    if (index !== -1) {
      array.splice(index, 1);
      setItems(array);
    }
  }

  const handleNewChart = () => {
    var array = items;
    defaultChart.index = items.length; // make a separate copy of the array
    array.push(defaultChart);
    setItems(array);
    getVisuals();
  };

  function handleChartData(value, index) {
    console.log(value);
    console.log(index);
    let array = display;
    for (let i = 0; i < display.length; i++) {
      if (display[i].id === value) {
        // console.log(i)
        // console.log(selectedIndex)
        array[index].data = display[i].data;
        array[index].title = display[i].title;
        array[index].titleLabel = display[i].titleLabel;
        console.log(array[index]);
        console.log(display[i]);
      }
    }
    setItems(array);
    // items[selectedIndex].data = value;
  }

  function setItemIndex(item, index) {
    item.index = index;
  }

  function getVisuals() {
    if (fetchVisualizations.isSuccess) {
      // console.log(fetchVisualizations.data.allVisualizations);
      let array = fetchVisualizations.data.allVisualizations;
      for (let i = 0; i < array.length; i++) {
        array[i].data = setData(array[i])
      }
      console.log(array)
      return array;
    } else {
      console.log("Fetch visualizaitons failed")
      return [];
    }
  }

  function setData(visualization) {
    //returns the formatted data for the charts
    if (visualization.type === "horizontalbarchart") {
      let labels = [];
      for (let i = 0; i < visualization.Question.Choices.length; i++) {
        labels.push(visualization.Question.Choices[i].choice_value);
      }
      return {
        labels: labels,
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
          {
            // you can set indiviual colors for each bar
            label: "# of Votes",
            data: [1, 1, 0, 0, 1, 0],
            backgroundColor: [
              "#15bcc7",
              "#7fcfd3",
              "#b5e1df",
              "#ed9146",
              "#edb57e",
              "#f4e3c2",
            ],
            borderWidth: 1,
          },
        ],
      };
    } else {
      return {}
    }
  }

  return (
    <>
      {fetchVisualizations.isLoading && <p>Loading...</p>}
      {fetchVisualizations.isError && <p>Error</p>}
      {fetchVisualizations.isSuccess && (
        <SplitHorizontal fullHeight divider={settingsVisible}>
          <div className={styles.visualizations}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <SortableContext items={items} strategy={rectSortingStrategy}>
                <Grid columns={4}>
                  {items.map((item, index) => (
                    <>
                      {/* {console.log(item)} */}
                      {setItemIndex(item, index)}
                      <SortableBox
                        key={item.id}
                        item={item}
                        index={index}
                        opensettings={setSettingsVisible}

                        // handleDeletion={handleDeleteChart}
                      />
                    </>
                  ))}
                  {/* <SortableBox
                    key={fetchVisualizations.data.allVisualizations[0].id}
                    item={getVisuals()[0]}
                    index={items.length}
                    opensettings={setSettingsVisible}

                    // handleDeletion={handleDeleteChart}
                  /> */}
                  {/* <SortablePhoto key={"beef"} url={"beef"} index={items.length + 1} numParticipants={250} /> */}
                  <div className={styles.newchartdiv}>
                    <button onClick={handleNewChart}>New Chart +</button>
                  </div>
                </Grid>
              </SortableContext>

              <DragOverlay adjustScale={true}>
                {/* {console.log(items.indexOf(activeId))} */}
                {activeId ? (
                  <ChartBox item={activeId} index={items.indexOf(activeId)} />
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
          {settingsVisible ? (
            <div ref={ref} className={styles.settingscontainer}>
              {items.map((item, index) => (
                <div key={index}>
                  {() => setSelectedIndex(index)}
                  {item.selected == true && (
                    <VizSettings
                      item={item}
                      index={index}
                      handleDeleteChart={handleDeleteChart}
                      questions={display}
                      handleChartData={handleChartData}
                      // index={index}
                    ></VizSettings>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </SplitHorizontal>
      )}
    </>
  );

  // function handleDragEnd(event) {
  //   if (event.over && event.over.id === 'droppable') {
  //     setIsDropped(true);
  //   }
  // }
  function handleDragStart(event) {
    // console.log(event);
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }
};
