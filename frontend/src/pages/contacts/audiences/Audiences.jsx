// External
import React, { useState } from "react"; 
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "../../../components/tables/BasicTable/ReactTable.jsx";
// import styles from "./AllContacts.module.scss";
import ReactModal from "../../../components/ReactModal/ReactModal.jsx";
// import ReactInput from "../../components/ReactInput/ReactInput.jsx";

// Internal
// import { Header } from "components/layouts";
import { useFetchAudiences } from "api/resources/contacts/audiences";

// Internal

export const Audiences = () => {
    const columns = React.useMemo(
        () => [
          {
            Header: "Audience Name",
            accessor: "name",
            Filter: SelectColumnFilter,
            filter: MultipleFilter,
          },
          {
            Header: "Members",
            accessor: "members",
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
            Header: "Created",
            accessor: "created",
            Filter: SelectColumnFilter,
            filter: MultipleFilter,
          },
        ],
        []
      );
    
      const fetchAudiencesQuery = useFetchAudiences();
    
      const [show, setShow] = useState(false);
    
      return (
        <>
          {fetchAudiencesQuery.isLoading && <p>Loading...</p>}
          {fetchAudiencesQuery.isError && <p>{fetchAudiencesQuery.error}</p>}
          {fetchAudiencesQuery.isSuccess && <ReactTable columns={columns} data={fetchAudiencesQuery.data} buttonMethod={() => setShow(true)} modalTitle="New Audience"/>}
          <ReactModal show={show} onClose={() => setShow(false)}>
            <div className="content">
              <h1>Create Audience</h1>
            </div>
          </ReactModal>
        </>
      );
}