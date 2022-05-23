// External
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Internal
import { Header, SplitHorizontal } from "components/layouts";
import { ProjectRoutes } from "routes";
import { Sidebar2 } from "components/sidebars";
import styles from "./Project.module.scss";
import { useApi, ProjectsApi } from "api";
import { Loading } from "components/Loading/Loading";

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

  const getProject = useApi(ProjectsApi.getProject);

  useEffect(() => {
    getProject.request(id);
  }, []);

  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };
  return (
    <>
      {getProject.loading && <Loading />}
      {getProject.error && <p>{getProject.error}</p>}
      {getProject.data && (
        <>
          <Header title={getProject.data.name} backPath="/projects" />
          <SplitHorizontal leftShrink divider fullHeight>
            <Sidebar2
              menuItems={menuItems}
              active={active}
              updateActive={handleActiveUpdate}
            />
            <div className={styles.content}>
              <ProjectRoutes project={getProject.data} />
            </div>
          </SplitHorizontal>
        </>
      )}
    </>
  );
};
