// External
import React, { useState } from "react";
import styles from "./Projects.module.scss";
import ReactModal from "../../components/ReactModal/ReactModal.jsx";
import { useNavigate } from "react-router-dom";

// Internal
import { Header } from "components/layouts";
import {
  useCreateProjectGql,
  useDeleteProjectGql,
  // useDeleteProjectGql,
  useFetchProjectsGql,
  // useSearchProjectGql,
} from "api/resources/projects/projects";
import { TextField } from "components/inputs/index.js";
import { Form } from "components/inputs/ClickSaveForm/ClickSaveForm.jsx";
import Table from "components/tables/Table/Table.jsx";
// import BulkActionButton from "components/buttons/BulkActionButton/BulkActionButton.jsx";
// import ActionDropdown from "components/buttons/BulkActionButton/ActionDropdown.jsx";
// import { useToken } from "components/Login/Login";

function isOpen(value) {
  if (value == "Open") {
    return true;
  } else {
    return false;
  }
}

export const Projects = () => {
  const headers = [
    {
      id: 0,
      name: "Project",
      accessor: "name",
      enabled: true,
      cell_style: null,
    },
    {
      id: 1,
      name: "Status",
      accessor: "status",
      enabled: true,
      cell_style: (value) => (
        <span
          className={`${styles.status} ${
            isOpen(value) ? `${styles.isopen}` : `${styles.isclosed}`
          }`}
        >
          {/* {console.log(e)} */}
          {value}{" "}
        </span>
      ),
    },
    {
      id: 2,
      name: "Responses",
      accessor: "responses",
      enabled: true,
      cell_style: null,
    },
    {
      id: 3,
      name: "Owner",
      accessor: "owner",
      enabled: true,
      cell_style: null,
    },
    {
      id: 4,
      name: "Created",
      accessor: "created_at",
      enabled: true,
      cell_style: null,
    },
    {
      id: 5,
      name: "Modified",
      accessor: "updated_at",
      enabled: true,
      cell_style: null,
    },
  ];

  const fetchProjectsQuery = useFetchProjectsGql();
  const createProjectQuery = useCreateProjectGql();
  const deleteProjectQuery = useDeleteProjectGql();
  // const searchProjectQuery = useSearchProjectGql();
  
  // const { token } = useToken();
  const [show, setShow] = useState(false);
  const handlePostProject = (data) => {
    createProjectQuery.mutate({
      organization_id: "0684348415",
      name: data.name,
      description: data.description,
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      status: "Closed",
      responses: 0,
      owner: "Mark Wagner",
    });
    setShow(false);
  };



  const deleteSelected = (selected) => {
    console.log(selected);
    for (let i = 0; i < selected.length; i++) {
      deleteProjectQuery.mutate({
        id: selected[i].original.id,
      });
    }
  };

  //to be able to navigate to the project. onClick in the row
  let navigate = useNavigate();
  const routeChange = (row) => {
    // console.log(path);
    navigate(row.id);
  };

  return (
    <>
      <Header title="Projects" />
      {fetchProjectsQuery.isLoading && <p>Loading...</p>}
      {fetchProjectsQuery.isError && <p>Error</p>}
      {console.log(fetchProjectsQuery)}
      {fetchProjectsQuery.isSuccess && (
        <>
          <Table
            initHeaders={headers}
            data={fetchProjectsQuery.data.surveys}
            createMethod={() => setShow(true)}
            createTitle="New Project"
            deleteSelected={deleteSelected}
            onRowClick={routeChange}
            search="project"
          ></Table>
        </>
      )}
      <ReactModal
        show={show}
      >
        <div className="content">
          <h1>Create a New Project</h1>
          <div className={styles.text}>
            <Form onSave={handlePostProject} onClose={() => setShow(false)}>
              <TextField
                type="text"
                name="name"
                placeholder="Project Name"
              ></TextField>
              <TextField
                type="text"
                name="description"
                placeholder="Description (optional)"
              ></TextField>
            </Form>
            {/* <ActionButton functionality={() =>handlePostProject("New Project", "Jack Sparrow", "Closed", 0, Date.now(), Date.now())} title="Click me">Click me</ActionButton> */}
          </div>
        </div>
      </ReactModal>
    </>
  );
};
