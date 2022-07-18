// External
import React from "react";
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "components/tables/BasicTable/ReactTable.jsx";
// import styles from "./AllContacts.module.scss";

import { useNavigate } from "react-router-dom";

// Internal

import { useFetchContacts } from "api/resources/contacts/contacts";

export const AllContacts = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/AddContacts`;
    navigate(path);
  };


  const columns = React.useMemo(
    () => [
      {
        Header: "Email",
        accessor: "email",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "First Name",
        accessor: "first_name",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Last Name",
        accessor: "last_name",
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
        Header: "Company",
        accessor: "company",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
    ],
    []
  );

  const fetchContactsQuery = useFetchContacts();

  return (
    <>
      {fetchContactsQuery.isLoading && <p>Loading...</p>}
      {fetchContactsQuery.isError && <p>{fetchContactsQuery.error}</p>}
      {fetchContactsQuery.isSuccess &&  (
        <ReactTable
          columns={columns}
          data={fetchContactsQuery.data.allContacts}
          buttonMethod={routeChange}
          modalTitle="New Contact(s)"
        />        
      )}
    </>
  );
};
