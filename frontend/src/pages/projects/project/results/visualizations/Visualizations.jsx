// External
import React, { useState } from "react";
import { BarChartVertical } from "components/BarChartVertical/BarChartVertical";
import { BarChartHorizontal } from "components/BarChartHorizontal/BarChartHorizontal";
import { DoughnutChart } from "components/DoughnutChart/DoughnutChart";
import styles from "./Visualizations.module.scss";
import { Grid } from "./Grid";
import { SortableBox } from "./SortableBox";
import { ChartBox } from "./ChartBox";
import { LineChart } from "components/LineChart/LineChart";
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
  // useEffect(() => {
  //   const fetchPrices = async () => {
  //     const res = await fetch("https://api.coincap.io/v2/assets/?limit=5")
  //     const data = await res.json()
  //     setChartData({
  //       labels: data.data.map((crypto) => crypto.name),
  //       datasets: [
  //         {
  //           label: "Price in USD",
  //           data: data.data.map((crypto) => crypto.priceUsd),
  //           backgroundColor: [
  //             "#ffbb11",
  //             "#ecf0f1",
  //             "#50AF95",
  //             "#f3ba2f",
  //             "#2a71d0"
  //           ]
  //         }
  //       ]
  //     });
  //   };
  //   fetchPrices()
  // }, []);

  // const [chartData, setChartData] = useState({})
  // console.log(chartData);

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

  const numParticipants = () => {
    return (
      <div className={styles.participants}>
        <span>250</span>
        <h6>Participants</h6>
      </div>
    );
  };
  const participantPercentage = () => {
    return (
      <div className={styles.chart}>
        <BarChartVertical data={data} title="Participant Percentage" />
      </div>
    );
  };
  const lineChart = () => {
    return (
      <div className={styles.chart}>
        <LineChart data={lineData} title="Trending Score" />
      </div>
    );
  };
  const rankingQuestion1 = () => {
    return (
      <div className={styles.chart}>
        <BarChartHorizontal
          data={rankingQuestionData}
          title="How likely are you to recommend Primary Medical Group to a friend or to a family member?"
        />
      </div>
    );
  };
  const pieChart = () => {
    return (
      <div className={styles.chart}>
        <DoughnutChart
          data={doughnutdata}
          title="How much wood could a wood chuck chuck?"
        />
      </div>
    );
  };
  // const [isDropped, setIsDropped] = useState(false);
  // const draggableMarkup = <Draggable>Drag me</Draggable>;
  const display = [
    {
      data: participantPercentage(),
    },
    {
      data: numParticipants(),
    },
    {
      data: lineChart(),
    },
    {
      data: pieChart(),
    },
    {
      data: rankingQuestion1(),
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
                {console.log(item)}
                <SortableBox key={item.url} item={item} index={index} />
              </>
            ))}
            {/* <SortablePhoto key={"beef"} url={"beef"} index={items.length + 1} numParticipants={250} /> */}
          </Grid>
        </SortableContext>

        <DragOverlay adjustScale={true}>
          {activeId ? (
            <ChartBox
              item={activeId}
              index={items.indexOf(activeId)}
              numParticipants={activeId.numParticipants}
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
    console.log(event);
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
