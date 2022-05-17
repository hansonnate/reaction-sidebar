// External
import React from "react";
import { Link } from "react-router-dom";
// import Table from "../../components/BasicTable/Table.jsx"
import ReactTable from "../../components/BasicTable/ReactTable.jsx"
import styles from "./Projects.module.scss";

// Internal
import { Header } from "../../layouts";

//sample data
const getData = () => [
  {
    name: "Doctors Opinion",
    link: "survey1",
    owner: "Mark Wagner",
    status: "Open",
    responses: 25,
    modified: "Mar 3, 2022",
    created: "Feb 1, 2022",
  },
  {
    name: "Are Patients Sick?",
    link: "survey1",
    owner: "Nate Hanson",
    status: "Closed",
    responses: 1001,
    modified: "Mar 10, 2022",
    created: "Mar 1, 2022",
  },
  {
    name: "Who Cares",
    link: "survey1",
    owner: "Jeremy Bikman",
    status: "Open",
    responses: 2,
    modified: "Mar 21, 2022",
    created: "Jan 2, 2022",
  },
  {
    name: "Anotha one",
    link: "survey1",
    owner: "Nate Hanson",
    status: "Closed",
    responses: 34,
    modified: "May 2, 2022",
    created: "April 5, 2022",
  },
  {
    name: "Do you like Jokes?",
    link: "survey1",
    owner: "Jeremy Bikman",
    status: "Closed",
    responses: 3078,
    modified: "April 12, 2022",
    created: "April 1, 2022",
  },


];
function isOpen(value) {
  if (value.value == "Open") {
    return(true)
  }
  else {
    return false
  }
}


export const Projects = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Project",
        accessor: "name",
        Cell: e =><Link to={e.value} style={{color: "black" }}> {e.value} </Link>
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: e =><span className={`${styles.status} ${isOpen(e) ? `${styles.isopen}` : `${styles.isclosed}`}`}>{e.value} </span>
      },
      {
        Header: "Responses",
        accessor: "responses",
      },
      {
        Header: "Owner",
        accessor: "owner",
      },
      {
        Header: "Modified",
        accessor: "modified",
      },
      {
        Header: "created",
        accessor: "created",
      },
    ],
    []
  );

  const data = React.useMemo(() => getData(), []);
  return (
    <>
      <Header title="Projects" />
      {/* <Table/> */}
      <ReactTable columns={columns} data={data}/>
      {/* <Link to="survey1">Survey 1</Link> */}
    </>
  );
};
