// External
import React, {useState} from "react";
import { BarChart } from "components/BarChart/BarChart";
import { DoughnutChart } from "components/DoughnutChart/DoughnutChart";
import styles from "./Visualizations.module.scss";
import {Grid} from './Grid';
import {SortablePhoto} from './SortablePhoto';
import {Photo} from './Photo';
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
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

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
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // const [isDropped, setIsDropped] = useState(false);
  // const draggableMarkup = <Draggable>Drag me</Draggable>;
  const display = [
    {
      url: "https://source.unsplash.com/WLUHO9A_xik/900x900",
      numParticipants: 260
    },
    {
      url: "https://source.unsplash.com/R4K8S77qtwI/900x900",
      numParticipants: 280
    },
    {
      url: "https://source.unsplash.com/jJGc21mEh8Q/900x900",
      numParticipants: 270
    },
    {
      url:  "https://source.unsplash.com/omNxg6JP6Fo/900x900",
      numParticipants: 290
    },
    {
      url: "https://source.unsplash.com/-M1gkucIqkQ/900x900",
      numParticipants: 250
    },

    {
      url: "https://source.unsplash.com/czOuPVsfHDw/900x900",
      numParticipants: 240
    },
    {
      url: "https://source.unsplash.com/-vr0gMUM6Fk/900x900",
      numParticipants: 230
    },
    {
      url: "https://source.unsplash.com/TsMuMM_qVec/900x900",
      numParticipants: 220
    }
  ]

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
        
          {items.map((url, index) => (
            <>
            {console.log(url)}
            <SortablePhoto key={url.url} url={url} index={index} numParticipants={url.numParticipants}/>
            </>
          ))}
          {/* <SortablePhoto key={"beef"} url={"beef"} index={items.length + 1} numParticipants={250} /> */}
        </Grid>
      </SortableContext>

      <DragOverlay adjustScale={true}>
        {activeId ? (
          <Photo url={activeId} index={items.indexOf(activeId)} />
        ) : null}
      </DragOverlay>
    </DndContext>


      <div className={styles.basicdata}>
        <div className={styles.participants}>
          <h1>250</h1>
          <h6>Participants</h6>
        </div>
        <BarChart data={data} />
      </div>
      <DoughnutChart data={doughnutdata} />
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
    const {active, over} = event;

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
