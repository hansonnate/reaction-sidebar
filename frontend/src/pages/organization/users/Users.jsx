// External
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "components/tables/BasicTable/ReactTable.jsx";
// import styles from "./Users.module.scss";
import ReactModal from "components/ReactModal/ReactModal.jsx";
import { SelectField, TextField } from "components/inputs";
import { Form } from "components/inputs/ClickSaveForm/ClickSaveForm.jsx";

// Internal
import { Header } from "components/layouts";
import {
  useCreateUserGql,
  useFetchUsersGql,
} from "api/resources/organization/users";

// import { useToken } from "components/Login/Login";

export const Users = () => {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstname",
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
        accessor: "lastname",
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
        Header: "Position",
        accessor: "position",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },

      {
        Header: "Last Sign In",
        accessor: "last_sign_in_at",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
    ],
    []
  );

  const fetchUsersQuery = useFetchUsersGql();
  const createUserQuery = useCreateUserGql();


  // const { token } = useToken();

  const handleCreateUser = (result) => {
    createUserQuery.mutate({
      organization_id: data[0].Organization.id,
      role_id: result.role,
      firstname: result.firstname,
      lastname: result.lastname,
      email: result.email,
      position: result.position,
      company: "peer60",
      created_at: "now",
      updated_at: "2020-01-01",
      last_sign_in_at: "now",
    });
    setShow(false);
  };

  const newUserClick = () => {
    setData(fetchUsersQuery.data.allUsers);
    setShow(true);
  };

  function getOptions(data) {
    if (data) {
      let roles = data[0].Organization.Roles;
      // console.log(roles);
      // console.log(roles.allUsers);
      let options = [];
      for (let i = 0; i < roles.length; i++) {
        options.push({
          value: roles[i].id,
          label: roles[i].name,
        });
      }
      // console.log(options);
      return options;
    } else {
      return [
        { value: "dynamic", label: "Dynamic" },
        { value: "fileupload", label: "File Upload" },
        { value: "entermanually", label: "Enter Manual" },
      ];
    }
  }
  // const options = [
  //   { value: "dynamic", label: "Dynamic" },
  //   { value: "fileupload", label: "File Upload" },
  //   { value: "entermanually", label: "Enter Manual" },
  // ];

  return (
    <>
      <Header title="Users" />
      {fetchUsersQuery.isLoading && <p>Loading...</p>}
      {fetchUsersQuery.isError && <p>Error</p>}
      {fetchUsersQuery.isSuccess && (
        <ReactTable
          columns={columns}
          data={fetchUsersQuery.data.allUsers}
          buttonMethod={newUserClick}
          modalTitle="New User"
        />
      )}
      <ReactModal show={show}>
        <div className="content">
          <h1>Create a New User</h1>
          <div className="text">
            <Form onSave={handleCreateUser} onClose={() => setShow(false)}>
              <TextField
                type="text"
                name="firstname"
                placeholder="First Name"
              ></TextField>
              <TextField
                type="text"
                name="lastname"
                placeholder="Last Name"
              ></TextField>
              <SelectField
                type="select"
                name="role"
                options={getOptions(data)}
              ></SelectField>
              <TextField
                type="text"
                name="email"
                placeholder="Email"
              ></TextField>
              <TextField
                type="text"
                name="position"
                placeholder="Position"
              ></TextField>
            </Form>
          </div>
        </div>
      </ReactModal>
    </>
  );
};
