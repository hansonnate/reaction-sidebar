// External
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import Table from "../../components/BasicTable/Table.jsx"
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "../../components/BasicTable/ReactTable.jsx";
import styles from "./Projects.module.scss";

// Internal
import { Header } from "components/layouts";
import { useApi, ProjectsApi } from "api";

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
        Header: "created",
        accessor: "created",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
    ],
    []
  );

  const getProjects = useApi(ProjectsApi.getProjects);

  useEffect(() => {
    getProjects.request();
  }, []);

  return (
    <>
      <Header title="Projects" />
      {getProjects.loading && <p>Loading...</p>}
      {getProjects.error && <p>{getProjects.error}</p>}
      {/* {getProjects.data?.map((project) => (
        <div key={project.id}>
          <Link to={`${project.id}/`}>{project.name}</Link>
        </div>
        
      ))} */}
      {getProjects.data && <ReactTable columns={columns} data={getProjects.data} />}
    </>
  );
};
