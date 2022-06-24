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
import { useFetchProject } from "api/resources/projects/projects";
import { ErrorPage } from "pages";

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

export const Project = () => {
  const { id } = useParams();
  const projectQuery = useFetchProject(id);

  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };
  return (
    <>
      {projectQuery.isLoading && <Loading />}
      {projectQuery.isError && <ErrorPage />}
      {projectQuery.isSuccess && (
        <>
          <Header
            title={projectQuery.data.name || "Untitled Project"}
            backPath="/projects"
          />
          <SplitHorizontal className="flex-grow" leftShrink divider fullHeight>
            <Sidebar2
              menuItems={menuItems}
              active={active}
              updateActive={handleActiveUpdate}
            />
            <div className={styles.content}>
              {projectQuery.data && <ProjectRoutes />}
            </div>
          </SplitHorizontal>
        </>
      )}
    </>
  );
};
