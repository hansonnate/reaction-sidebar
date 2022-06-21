// External
import React, { useState } from "react";
// import { BarChartVertical } from "components/BarChartVertical/BarChartVertical";
// import { BarChartHorizontal } from "components/BarChartHorizontal/BarChartHorizontal";
// import { DoughnutChart } from "components/DoughnutChart/DoughnutChart";
import styles from "./Visualizations.module.scss";
import { Grid } from "./Grid";
import { SortableBox } from "./SortableBox";
import { ChartBox } from "./ChartBox";
// import { LineChart } from "components/LineChart/LineChart";
// import photos from './photos.json';
// import { Droppable } from "./Droppable.jsx";
// import { Draggable } from "./Draggable.jsx";
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

// Internal

export const Visualizations = () => {

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
  const trendedNPSData= {
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
      type: "verticalbarchart",
      id: 0,
    },
    {
      data: 250,
      type: "numbercount",
      title: "Participants",
      id: 1,
    },
    {
      data: lineData,
      title: "Trending Score",
      type: "linechart",
      id: 2,
    },
    {
      data: doughnutdata,
      type: "doughnutchart",
      title: "How much wood could a wood chuck chuck?",
      id: 3,
    },
    {
      data: rankingQuestionData,
      type: "verticalbarchart",
      title: "How likely are you to recommend Primary Medical Group to a friend or to a family member?",
      id: 4,
    },
    {
      data: trendedNPSData,
      type: "linechart",
      title: "Trended NPS",
      id: 5,
    },
  ];

  const [items, setItems] = useState(display);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  return (
    <div className={styles.vizpage}>
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
                <SortableBox key={item.url} item={item} index={index} />
              </>
            ))}
            {/* <SortablePhoto key={"beef"} url={"beef"} index={items.length + 1} numParticipants={250} /> */}
          </Grid>
        </SortableContext>

        <DragOverlay adjustScale={true}>
          {/* {console.log(items.indexOf(activeId))} */}
          {activeId ? (
            <ChartBox
              item={activeId}
              index={items.indexOf(activeId)}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
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
