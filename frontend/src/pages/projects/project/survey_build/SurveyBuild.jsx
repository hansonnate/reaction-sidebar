// External
import React, { useState } from "react";

// Internal
import { TabBar } from "components/layouts";
import { SurveyBuildRoutes } from "routes";

export const SurveyBuild = ({ project }) => {
  const tabBarItems = [
    {
      id: 0,
      name: "Survey Details",
      to: `survey-details`,
    },
    {
      id: 1,
      name: "Questions",
      to: `questions`,
    },
    {
      id: 2,
      name: "Design",
      to: `design`,
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
      <SurveyBuildRoutes project={project} />
    </>
  );
};
