// External
import React, { useState } from "react";
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "components/tables/BasicTable/ReactTable.jsx";
// import styles from "./AllContacts.module.scss";
import ReactModal from "components/ReactModal/ReactModal.jsx";
// import ReactInput from "../../components/ReactInput/ReactInput.jsx";
import { useNavigate } from "react-router-dom";

// Internal
import { TabBar } from "components/layouts";
import { useFetchContacts } from "api/resources/contacts/contacts";


export const AllContacts = () => {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/AddContacts`; 
      navigate(path);
    }

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
        accessor: "firstname",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Last Name",
        accessor: "lastname",
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

  const [show, setShow] = useState(false);
  const menuItems = [
    {
        id: 0,
        name: "Upload Contacts",
        to: `upload`,
      },
    {
      id: 1,
      name: "Add Manually",
      to: `manual`,
    }
  ];
  const [active, setActive] = useState(0);
  const handleActiveUpdate = (item) => {
    setActive(item);
  };

  return (
    <>
      {fetchContactsQuery.isLoading && <p>Loading...</p>}
      {fetchContactsQuery.isError && <p>{fetchContactsQuery.error}</p>}
      {fetchContactsQuery.isSuccess && (
        <ReactTable
          columns={columns}
          data={fetchContactsQuery.data}
          buttonMethod={routeChange}
          modalTitle="New Contact(s)"
        />
      )}
      <ReactModal show={show} onClose={() => setShow(false)}>
        <TabBar tabBarItems={menuItems} active={active} updateActive={handleActiveUpdate}></TabBar>
        <div className="content">
          <h1>Import Contacts</h1>
        </div>
      </ReactModal>
    </>
  );
};
