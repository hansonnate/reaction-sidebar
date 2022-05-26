// External
import React, { useEffect, useState } from "react"; 
import ReactTable, {
  SelectColumnFilter,
  MultipleFilter,
} from "../../../components/BasicTable/ReactTable.jsx";
// import styles from "./AllContacts.module.scss";
import ReactModal from "../../../components/ReactModal/ReactModal.jsx";
// import ReactInput from "../../components/ReactInput/ReactInput.jsx";

// Internal
// import { Header } from "components/layouts";
import { useApi, AudiencesApi } from "api";

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
    
      const getAudiences = useApi(AudiencesApi.getAudiences);
    //   const postProject = useApi(ProjectsApi.postProject);
    
      useEffect(() => {
        getAudiences.request();
      }, []);
    
      const [show, setShow] = useState(false);
    
      return (
        <>
          {getAudiences.loading && <p>Loading...</p>}
          {getAudiences.error && <p>{getAudiences.error}</p>}
          {getAudiences.data && <ReactTable columns={columns} data={getAudiences.data} buttonMethod={() => setShow(true)} modalTitle="New Audience"/>}
          <ReactModal show={show} onClose={() => setShow(false)}>
            <div className="content">
              <h1>Create Audience</h1>
            </div>
          </ReactModal>
        </>
      );
}