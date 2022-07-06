// External
import React, {useState} from "react";
import { Link } from "react-router-dom";
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "components/tables/BasicTable/ReactTable.jsx";
// import styles from "./Users.module.scss";
import ReactModal from "components/ReactModal/ReactModal.jsx";
import ReactInput from "components/ReactInput/ReactInput.jsx";


// Internal
import { Header } from "components/layouts";
//import { useApi, ProjectsApi } from "api";
import {
  useFetchUsersGql,
} from "api/resources/organization/users";
// import { useToken } from "components/Login/Login";


export const Users = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
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
        Header: "Last Name",
        accessor: "lastName",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Email",
        accessor: "email",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Role",
        accessor: "role",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Last Sign In",
        accessor: "lastSignInAt",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
    ],
    []
  );

  const fetchUsersQuery = useFetchUsersGql();
  // const { token } = useToken();
  const [show, setShow] = useState(false);
  // const [projectName, setProjectName] = useState("New Project");
  // const [description, setDescription] = useState("");

  // const handlePostProject = () => {
  //   createProjectQuery.mutate({
  //     input: {
  //       name: projectName,
  //       description: description,
  //     },
  //     token: token
  //   }
  //   );
  // };

  return (
    <>
      <Header title="Users" />
      {fetchUsersQuery.isLoading && <p>Loading...</p>}
      {fetchUsersQuery.isError && <p>Error</p>}
      {fetchUsersQuery.isSuccess && (
        <ReactTable
          columns={columns}
          data={fetchUsersQuery.data.users}
          buttonMethod={() => setShow(true)}
          modalTitle="New Project"
        />
      )}
      <ReactModal
        show={show}
        onClose={() => setShow(false)}
        onSave={() => {
          // handlePostProject(
          //   projectName,
          //   "Jack Sparrow",
          //   "Closed",
          //   0,
          //   Date.now(),
          //   Date.now(),
          //   description
          // );
          setShow(false);
        }}
      >
        <div className="content">
          <h1>Create a New Project</h1>
          <div className="text">
            <ReactInput
              type="text"
              placeholder="Project Name"
              // onChange={(e) => setProjectName(e.target.value)}
            ></ReactInput>
            <ReactInput
              type="text"
              placeholder="Description (optional)"
              // onChange={(e) => setDescription(e.target.value)}
            ></ReactInput>
          </div>
        </div>
      </ReactModal>
    </>
  );
};
