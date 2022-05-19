// External
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Internal
import { Header } from "components/layouts";
import { useApi, ProjectsApi } from "api";

export const Projects = () => {
  const getProjects = useApi(ProjectsApi.getProjects);

  useEffect(() => {
    getProjects.request();
  }, []);

  return (
    <>
      <Header title="Projects" />
      {getProjects.loading && <p>Loading...</p>}
      {getProjects.error && <p>{getProjects.error}</p>}
      {getProjects.data?.map((project) => (
        <div key={project.id}>
          <Link to={`${project.id}/`}>{project.name}</Link>
        </div>
      ))}
    </>
  );
};
