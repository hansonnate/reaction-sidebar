// External
import React, { useState } from "react";
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "components/BasicTable/ReactTable.jsx";
import styles from "./SMS.module.scss";
import ReactModal from "components/ReactModal/ReactModal.jsx";
import ReactInput from "components/ReactInput/ReactInput.jsx";
import { useParams } from "react-router-dom";
import { useFetchProject } from "api/resources/projects/projects";

// Internal
import {
  useCreateProject,
  useFetchProjects,
} from "api/resources/projects/projects";

function isOpen(value) {
  if (value.value == "Bad") {
    return true;
  } else {
    return false;
  }
}

export const SMS = () => {
  const { id } = useParams();
  const projectQuery = useFetchProject(id);
  console.log(projectQuery.data);
  const columns = React.useMemo(
    () => [
      {
        Header: "Subject",
        accessor: "subject",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Audience",
        accessor: "audience",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "From",
        accessor: "from",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Date",
        accessor: "date",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Strength",
        accessor: "strength",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
        Cell: (e) => (
          <span
            className={`${styles.status} ${
              isOpen(e) ? `${styles.isopen}` : `${styles.isclosed}`
            }`}
          >
            {e.value}{" "}
          </span>
        ),
      },
    ],
    []
  );

  // const getProjects = useApi(ProjectsApi.getProjects);
  // const postProject = useApi(ProjectsApi.postProject);

  const fetchProjectsQuery = useFetchProjects();
  const createProjectQuery = useCreateProject();
  console.log(fetchProjectsQuery.data);
  

  // useEffect(() => {
  //   getProjects.request();
  // }, []);

  const [show, setShow] = useState(false);
  const [projectName, setProjectName] = useState("New Project");
  const [description, setDescription] = useState("");

  const handlePostProject = (
    projectName,
    owner,
    status,
    responses,
    created,
    modified,
    description
  ) => {
    createProjectQuery.mutate({
      name: projectName,
      owner: owner,
      status: status,
      responses: responses,
      created: created,
      modified: modified,
      description: description,
    });
  };

  return (
    <>
      {fetchProjectsQuery.isLoading && <p>Loading...</p>}
      {fetchProjectsQuery.isError && <p>{fetchProjectsQuery.error}</p>}
      {/* {getProjects.data?.map((project) => (
      {projectsQuery.isLoading && <p>Loading...</p>}
      {projectsQuery.isError && <p>{projectsQuery.error}</p>}
      {projectsQuery.data?.map((project) => (
        <div key={project.id}>
          <Link to={`${project.id}/`}>{project.name}</Link>
        </div>
        
      ))} */}
      {fetchProjectsQuery.isSuccess && (
        <ReactTable
          columns={columns}
          data={projectQuery.data.emails}
          buttonMethod={() => setShow(true)}
          modalTitle="Compose Email"
        />
      )}
      <ReactModal
        show={show}
        onClose={() => setShow(false)}
        onSave={() => {
          handlePostProject(
            projectName,
            "Jack Sparrow",
            "Closed",
            0,
            Date.now(),
            Date.now(),
            description
          );
          setShow(false);
        }}
      >
        <div className="content">
          <h1>Create a New Project</h1>
          <div className="text">
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
