// External
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "components/BasicTable/ReactTable.jsx";
import styles from "./Users.module.scss";
import ReactModal from "components/ReactModal/ReactModal.jsx";
import ReactInput from "components/ReactInput/ReactInput.jsx";


// Internal
import { Header } from "components/layouts";
//import { useApi, ProjectsApi } from "api";
import {
  useCreateProject,
  useFetchProjects,
} from "api/resources/projects/projects";

function isOpen(value) {
  if (value.value == "Open") {
    return true;
  } else {
    return false;
  }
}

export const Users = () => {
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
              isOpen(e) ? `${styles.isopen}` : `${styles.isclosed}`
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

  const fetchProjectsQuery = useFetchProjects();
  const createProjectQuery = useCreateProject();
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
      <Header title="Users" />
      {fetchProjectsQuery.isLoading && <p>Loading...</p>}
      {fetchProjectsQuery.isError && <p>{fetchProjectsQuery.error}</p>}
      {fetchProjectsQuery.isSuccess && (
        <ReactTable
          columns={columns}
          data={fetchProjectsQuery.data}
          buttonMethod={() => setShow(true)}
          modalTitle="New Project"
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
          </div>
        </div>
      </ReactModal>
    </>
  );
};
