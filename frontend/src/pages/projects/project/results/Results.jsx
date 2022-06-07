// External
import React, { useState } from "react";

// Internal
import { TabBar } from "components/layouts";
import { ResultsRoutes } from "routes";

export const Results = () => {
  const tabBarItems = [
    {
      id: 0,
      name: "Visualizations",
      to: `visualizations`,
    },
    {
      id: 1,
      name: "Participations",
      to: `participations`,
    },
    {
        id: 2,
        name: "Reports",
        to: `reports`,
      },
  ];
  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };
  return (
    <>
      <TabBar
        tabBarItems={tabBarItems}
        active={active}
        updateActive={handleActiveUpdate}
      ></TabBar>
      <ResultsRoutes />
    </>
  );
};
