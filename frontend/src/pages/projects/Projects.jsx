// External
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "../../components/tables/BasicTable/ReactTable.jsx";
import styles from "./Projects.module.scss";
import ReactModal from "../../components/ReactModal/ReactModal.jsx";
// import ReactInput from "../../components/ReactInput/ReactInput.jsx";

// Internal
import { Header } from "components/layouts";
//import { useApi, ProjectsApi } from "api";
import {
  useCreateProjectGql,
  useDeleteProjectGql,
  // useDeleteProjectGql,
  useFetchProjectsGql,
} from "api/resources/projects/projects";
import { TextField } from "components/inputs/index.js";
import { Form } from "components/inputs/ClickSaveForm/ClickSaveForm.jsx";
// import BulkActionButton from "components/buttons/BulkActionButton/BulkActionButton.jsx";
// import ActionDropdown from "components/buttons/BulkActionButton/ActionDropdown.jsx";
// import { useToken } from "components/Login/Login";

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

  const fetchProjectsQuery = useFetchProjectsGql();
  const createProjectQuery = useCreateProjectGql();
  const deleteProjectQuery = useDeleteProjectGql();
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

  // const actions = () => {
  //   return (
  //     <BulkActionButton>
  //       <ActionDropdown>
  //         <span className={styles.actionitem}>
  //           Delete Selected <i className="bi bi-trash"></i>
  //         </span>
  //         <span className={styles.actionitem}>
  //           Change Owners <i className="bi bi-person"></i>
  //         </span>
  //       </ActionDropdown>
  //     </BulkActionButton>
  //   );
  // };

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
          deleteSelected={deleteSelected}
          // actions={}
        />
      )}
      <ReactModal
        show={show}
        // onClose={() => setShow(false)}
        // onSave={() => {
        //   handlePostProject();
        //   setShow(false);
        // }}
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
