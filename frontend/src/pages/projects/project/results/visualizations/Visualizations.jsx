// External
import React, { useState, useRef, useEffect } from "react";
import styles from "./Visualizations.module.scss";
import { Grid } from "./Grid";
import { SortableBox } from "./SortableBox";
import { ChartBox } from "./ChartBox";
// import { reference } from "./ChartBox";

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

// Internal

export const Visualizations = () => {
  const ref = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));


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
        titleLabel: "Participant Percentage",
        titleFontSize: 12,
        titleAlignment: "center",
        hasLegend: false,
        legendPosition: "top",
      },
      id: 0,
    },
    {
      data: 250,
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
        titleLabel: "Participants",
        titleFontSize: 12,
        titleAlignment: "center",
        hasLegend: true,
        legendPosition: "top",
      },
      id: 1,
    },
    {
      data: lineData,
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
        titleLabel: "Trending Score",
        titleFontSize: 12,
        titleAlignment: "center",
        hasLegend: true,
        legendPosition: "top",
      },
      id: 2,
    },
    {
      data: doughnutdata,
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
        titleLabel: "How much wood could a wood chuck chuck?",
        titleFontSize: 12,
        titleAlignment: "center",
        hasLegend: true,
        legendPosition: "top",
      },
      id: 3,
    },
    {
      data: rankingQuestionData,
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
        titleLabel:
          "How likely are you to recommend Primary Medical Group to a friend or to a family member?",
        titleFontSize: 12,
        titleAlignment: "center",
        hasLegend: true,
        legendPosition: "top",
      },
      id: 4,
    },
    {
      data: trendedNPSData,
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
        titleLabel: "Trended NPS",
        titleFontSize: 12,
        titleAlignment: "center",
        hasLegend: true,
        legendPosition: "top",
      },
      id: 5,
    },
  ];
  const [items, setItems] = useState(display);

  return (
    <div className={styles.vizpage}>
      <SplitHorizontal>
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
                    <SortableBox
                      key={item.url}
                      item={item}
                      index={index}
                      opensettings={setSettingsVisible}
                    />
                  </>
                ))}
                {/* <SortablePhoto key={"beef"} url={"beef"} index={items.length + 1} numParticipants={250} /> */}
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
                {item.selected == true && <VizSettings item={item}></VizSettings>}
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </SplitHorizontal>
    </div>
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
