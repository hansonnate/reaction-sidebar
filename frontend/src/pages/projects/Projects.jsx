// External
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Table from "../../components/BasicTable/Table.jsx"
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "../../components/BasicTable/ReactTable.jsx";
import styles from "./Projects.module.scss";
import ReactModal from "../../components/ReactModal/ReactModal.jsx";
// import FormInput from "../../components/FormInput/FormInput.jsx";
import ReactInput from "../../components/ReactInput/ReactInput.jsx";
// import ActionButton from "../../components/ActionButton/ActionButton.jsx";

// Internal
import { Header } from "components/layouts";
//import { useApi, ProjectsApi } from "api";
import { useCreateProject, useFetchProjects } from "api/resources/projects/projects";



//sample data
// const getData = () => [
//   {
//     name: "Doctors Opinion",
//     link: "survey1",
//     owner: "Mark Wagner",
//     status: "Open",
//     responses: 25,
//     modified: "Mar 3, 2022",
//     created: "Feb 1, 2022",
//   },
//   {
//     name: "Are Patients Sick?",
//     link: "survey1",
//     owner: "Nate Hanson",
//     status: "Closed",
//     responses: 1001,
//     modified: "Mar 10, 2022",
//     created: "Mar 1, 2022",
//   },
//   {
//     name: "Who Cares",
//     link: "survey1",
//     owner: "Jeremy Bikman",
//     status: "Open",
//     responses: 2,
//     modified: "Mar 21, 2022",
//     created: "Jan 2, 2022",
//   },
//   {
//     name: "Anotha one",
//     link: "survey1",
//     owner: "Nate Hanson",
//     status: "Closed",
//     responses: 34,
//     modified: "May 2, 2022",
//     created: "April 5, 2022",
//   },
//   {
//     name: "Do you like Jokes?",
//     link: "survey1",
//     owner: "Jeremy Bikman",
//     status: "Closed",
//     responses: 3078,
//     modified: "April 12, 2022",
//     created: "April 1, 2022",
//   },
// ];
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
        show: true,
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
        Cell: (e) => (
          <Link to={e.value} style={{ color: "black" }}>
            {" "}
            {e.value}{" "}
          </Link>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        show: true,
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
        show: true,
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Owner",
        accessor: "owner",
        show: true,
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Modified",
        accessor: "modified",
        show: true,
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Created",
        accessor: "created",
        show: true,
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
    ],
    []
  );

  // const getProjects = useApi(ProjectsApi.getProjects);
  // const postProject = useApi(ProjectsApi.postProject);

  const fetchProjectsQuery = useFetchProjects();
  const createProjectQuery = useCreateProject();

  // useEffect(() => {
  //   getProjects.request();
  // }, []);
  

  const [show, setShow] = useState(false);

  const handlePostProject = (projectName, owner, status, responses, created, modified) => {
    createProjectQuery.mutate({
      name: projectName,
      owner: owner,
      status: status,
      responses: responses,
      created: created,
      modified: modified
    });
  };


  return (
    <>
      <Header title="Projects" />
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
      {fetchProjectsQuery.isSuccess && <ReactTable columns={columns} data={fetchProjectsQuery.data} buttonMethod={() => setShow(true)} modalTitle="New Project"/>}
      <ReactModal show={show} onClose={() => setShow(false)} onSave={() => handlePostProject("New Project", "Jack Sparrow", "Closed", 0, Date.now(), Date.now())}>
        <div className="content">
          <h1>Create a New Project</h1>
          <div className="text">
            <ReactInput type="text" placeholder="Project Name"></ReactInput>
            <ReactInput type="text" placeholder="Description (optional)"></ReactInput>
            {/* <ActionButton functionality={() =>handlePostProject("New Project", "Jack Sparrow", "Closed", 0, Date.now(), Date.now())} title="Click me">Click me</ActionButton> */}
          </div>
        </div>
      </ReactModal>
    </>
  );
};
