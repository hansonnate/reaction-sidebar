// External
import React, { useState } from "react";
import styles from "./SurveyBuild.module.scss";

// Internal
import { TabPill } from "components/layouts";
import { SurveyBuildRoutes } from "routes";

export const SurveyBuild = () => {
  const tabBarItems = [
    {
      id: 0,
      name: "Questions",
      to: `questions`,
    },
    {
      id: 1,
      name: "Design",
      to: `design`,
    },
  ];
  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.page}>
        <div className={styles.content}>
          <TabPill
            tabBarItems={tabBarItems}
            active={active}
            updateActive={handleActiveUpdate}
          ></TabPill>
          <SurveyBuildRoutes />
        </div>
        <div className={styles.footer}>
          <i className="bi bi-life-preserver"></i> Need Help?{" "}
          <a href="">Learn More</a> about designing a survey
        </div>
      </div>
    </div>
  );
};
