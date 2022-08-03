// External
//eslint-disable-next-line
import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Internal
import { Header, SplitHorizontal } from "components/layouts";
import { ProjectRoutes } from "routes";
import { Sidebar2 } from "components/sidebars";
import styles from "./Project.module.scss";
import { Loading } from "components/Loading/Loading";
import { useFetchProjectGql } from "api/resources/projects/projects";
import { ErrorPage } from "pages";

const menuItems = [
  {
    id: 0,
    name: "Survey Details",
    to: `survey-details`,
    iconClassName: "bi bi-gear",
  },
  {
    id: 1,
    name: "Survey Build",
    to: `survey-build`,
    iconClassName: "bi bi-file-earmark-plus",
  },
  {
    id: 2,
    name: "Delivery",
    to: `delivery`,
    iconClassName: "bi bi-truck",
  },
  {
    id: 3,
    name: "Results",
    to: `results`,
    iconClassName: "bi bi-graph-up",
  },
];

export const Project = () => {
  const { id } = useParams();
  const fetchProjectQuery = useFetchProjectGql(id);

  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };
  return (
    <>
      {fetchProjectQuery.isLoading && <Loading />}
      {fetchProjectQuery.isError && <ErrorPage />}
      {fetchProjectQuery.isSuccess && (
        <>
          <Header
            title={fetchProjectQuery.data.survey.name || "Untitled Project"}
            // backPath="/projects"
          />
          <SplitHorizontal className="flex-grow" leftShrink divider fullHeight>
            <Sidebar2
              menuItems={menuItems}
              active={active}
              updateActive={handleActiveUpdate}
            />
            <div className={styles.content}>
              {fetchProjectQuery.data.survey && <ProjectRoutes />}
            </div>
          </SplitHorizontal>
        </>
      )}
    </>
  );
};
