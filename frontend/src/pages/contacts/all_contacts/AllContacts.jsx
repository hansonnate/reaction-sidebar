// External
import React, { useEffect, useState } from "react";
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "../../../components/BasicTable/ReactTable.jsx";
// import styles from "./AllContacts.module.scss";
import ReactModal from "../../../components/ReactModal/ReactModal.jsx";
// import ReactInput from "../../components/ReactInput/ReactInput.jsx";
import { useNavigate } from "react-router-dom";

// Internal
import { TabBar } from "components/layouts";
import { useApi, ContactsApi } from "api";

// Internal

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

  const getContacts = useApi(ContactsApi.getContacts);
  //   const postProject = useApi(ProjectsApi.postProject);

  useEffect(() => {
    getContacts.request();
  }, []);

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
      {getContacts.loading && <p>Loading...</p>}
      {getContacts.error && <p>{getContacts.error}</p>}
      {getContacts.data && (
        <ReactTable
          columns={columns}
          data={getContacts.data}
          buttonMethod={routeChange}
          modalTitle="New Contact(s)"
        />
      )}
      <ReactModal show={show} onClose={() => setShow(false)}>
          {console.log(menuItems)}
        <TabBar tabBarItems={menuItems} active={active} updateActive={handleActiveUpdate}></TabBar>
        <div className="content">
          <h1>Import Contacts</h1>
        </div>
      </ReactModal>
    </>
  );
};
