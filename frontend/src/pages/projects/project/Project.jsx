// External
import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Internal
import fakeproject from "fakedata/projects/survey1.json";
import { Header, SplitHorizontal } from "components/layouts";
import { ProjectRoutes } from "routes";
import { Sidebar2 } from "components/sidebars";
import styles from "./Project.module.scss";

export const Project = () => {
  const { id } = useParams();
  console.log(id);
  const menuItems = [
    {
      id: 0,
      name: "Survey Build",
      to: `survey-build`,
      iconClassName: "bi bi-file-earmark-plus",
    },
    {
      id: 1,
      name: "Delivery",
      to: `delivery`,
      iconClassName: "bi bi-truck",
    },
    {
      id: 2,
      name: "Results",
      to: `results`,
      iconClassName: "bi bi-graph-up",
    },
  ];
  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };
  return (
    <>
      <Header title={fakeproject.name} backPath="/projects" />
      <SplitHorizontal leftShrink divider fullHeight>
        <Sidebar2
          menuItems={menuItems}
          active={active}
          updateActive={handleActiveUpdate}
        />
        <div className={styles.content}>
          <ProjectRoutes />
        </div>
      </SplitHorizontal>
    </>
  );
};
