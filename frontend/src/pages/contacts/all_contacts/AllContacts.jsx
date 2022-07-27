// External
import React from "react";
// import ReactTable, {
//   SelectColumnFilter,
//   MultipleFilter,
// } from "components/tables/BasicTable/ReactTable.jsx";
// import styles from "./AllContacts.module.scss";

import { useNavigate } from "react-router-dom";

// Internal

import { useFetchContacts } from "api/resources/contacts/contacts";
import Table from "components/tables/Table/Table";
import styles from "./AllContacts.module.scss";

export const AllContacts = () => {
  let navigate = useNavigate();
  const routeChangeContacts = () => {
    let path = `addContacts`;
    navigate(path);
  };
  const routeChange = (row) => {
    // console.log(path);
    navigate(row.id);
  };

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "Email",
  //       accessor: "email",
  //       Filter: SelectColumnFilter,
  //       filter: MultipleFilter,
  //     },
  //     {
  //       Header: "First Name",
  //       accessor: "first_name",
  //       Filter: SelectColumnFilter,
  //       filter: MultipleFilter,
  //     },
  //     {
  //       Header: "Last Name",
  //       accessor: "last_name",
  //       Filter: SelectColumnFilter,
  //       filter: MultipleFilter,
  //     },
  //     {
  //       Header: "Position",
  //       accessor: "position",
  //       Filter: SelectColumnFilter,
  //       filter: MultipleFilter,
  //     },
  //     {
  //       Header: "Company",
  //       accessor: "company",
  //       Filter: SelectColumnFilter,
  //       filter: MultipleFilter,
  //     },
  //   ],
  //   []
  // );

  const headers = [
    {
      id: 0,
      name: "Email",
      accessor: "email",
      enabled: true,
      cell_style: null,
    },
    {
      id: 1,
      name: "First Name",
      accessor: "first_name",
      enabled: true,
      cell_style: null,
    },
    {
      id: 2,
      name: "Last Name",
      accessor: "last_name",
      enabled: true,
      cell_style: null,
    },
    {
      id: 3,
      name: "Position",
      accessor: "position",
      enabled: true,
      cell_style: null,
    },
    {
      id: 4,
      name: "Company",
      accessor: "company",
      enabled: true,
      cell_style: null,
    },
  ];

  const fetchContactsQuery = useFetchContacts();

  return (
    <>
      {fetchContactsQuery.isLoading && <p>Loading...</p>}
      {fetchContactsQuery.isError && <p>{fetchContactsQuery.error}</p>}
      {fetchContactsQuery.isSuccess && (
        <>
        <Table
          initHeaders={headers}
          data={fetchContactsQuery.data.allContacts}
          createMethod={routeChangeContacts}
          createTitle="Add Contact(s)"
          // deleteSelected={deleteSelected}
          onRowClick={routeChange}
          search="contact"
          // setPageNumber={handlePageChange}
          pageNumber={1}
        />
        <div className={styles.footer}>
          <i className="bi bi-life-preserver"></i> Need Help?{" "}
          <a href="">Learn More</a> about adding and uploading contacts
        </div>
      </>
      )}
    </>
  );
};