// External
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "../../components/BasicTable/ReactTable.jsx";
import styles from "./Projects.module.scss";
import ReactModal from "../../components/ReactModal/ReactModal.jsx";
import ReactInput from "../../components/ReactInput/ReactInput.jsx";

// Internal
import { Header } from "components/layouts";
//import { useApi, ProjectsApi } from "api";
import {
  useCreateProjectGql,
  useFetchProjectsGql,
} from "api/resources/projects/projects";
import { useToken } from "components/Login/Login";

function isOpen(value) {
  if (value.value == "Open") {
    return true;
  } else {
    return false;
  }
}

export const Projects = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Project",
        accessor: "name",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
        Cell: (e) => (
          <Link to={e.cell.row.id} style={{ color: "black" }}>
            {" "}
            {e.value}{" "}
          </Link>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
        Cell: (e) => (
          <span
            className={`${styles.status} ${
              isOpen(e) ? `${styles.isclosed}` : `${styles.isopen}`
            }`}
          >
            {e.value}{" "}
          </span>
        ),
      },
      {
        Header: "Responses",
        accessor: "responses",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Owner",
        accessor: "owner",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Modified",
        accessor: "modified",
        checked: false,
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Created",
        accessor: "created",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
    ],
    []
  );

  // const getProjects = useApi(ProjectsApi.getProjects);
  // const postProject = useApi(ProjectsApi.postProject);

  const fetchProjectsQuery = useFetchProjectsGql();
  const createProjectQuery = useCreateProjectGql();
  const { token } = useToken();
  const [show, setShow] = useState(false);
  const [projectName, setProjectName] = useState("New Project");
  const [description, setDescription] = useState("");

  const handlePostProject = () => {
    createProjectQuery.mutate({
      input: {
        name: projectName,
        description: description,
      },
      token: token
    }
    );
  };

  return (
    <>
      <Header title="Projects" />
      {fetchProjectsQuery.isLoading && <p>Loading...</p>}
      {fetchProjectsQuery.isError && <p>Error</p>}
      {/* {getProjects.data?.map((project) => (
      {projectsQuery.isLoading && <p>Loading...</p>}
      {projectsQuery.isError && <p>{projectsQuery.error}</p>}
      {projectsQuery.data?.map((project) => (
        <div key={project.id}>
          <Link to={`${project.id}/`}>{project.name}</Link>
        </div>
        
      ))} */}
      {console.log(fetchProjectsQuery)}
      {fetchProjectsQuery.isSuccess && (
        <ReactTable
          columns={columns}
          data={fetchProjectsQuery.data.surveys}
          buttonMethod={() => setShow(true)}
          modalTitle="New Project"
        />
      )}
      <ReactModal
        show={show}
        onClose={() => setShow(false)}
        onSave={() => {
          handlePostProject();
          setShow(false);
        }}
      >
        <div className="content">
          <h1>Create a New Project</h1>
          <div className={styles.text}>
            <ReactInput
              type="text"
              placeholder="Project Name"
              onChange={(e) => setProjectName(e.target.value)}
            ></ReactInput>
            <ReactInput
              type="text"
              placeholder="Description (optional)"
              onChange={(e) => setDescription(e.target.value)}
            ></ReactInput>
            {/* <ActionButton functionality={() =>handlePostProject("New Project", "Jack Sparrow", "Closed", 0, Date.now(), Date.now())} title="Click me">Click me</ActionButton> */}
          </div>
        </div>
      </ReactModal>
    </>
  );
};
