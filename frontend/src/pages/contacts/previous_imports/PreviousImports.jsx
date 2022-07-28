import { useFetchContactImportsGql } from "api/resources/contacts/contacts";
import Table from "components/tables/Table/Table";
import React from "react";
import { useNavigate } from "react-router-dom";

export function PreviousImports() {
  const contactImports = useFetchContactImportsGql();

  const headers = [
    {
      id: 0,
      name: "id",
      accessor: "id",
      objectAccessor: null,
      enabled: true,
      cell_style: null,
    },
    {
        id: 2,
        name: "Warnings",
        accessor: "total_warnings",
        objectAccessor: null,
        enabled: true,
        cell_style: null,
      },
    {
      id: 1,
      name: "Owner",
      accessor: "User",
      objectAccessor: "firstname",
      enabled: true,
      cell_style: null,
    },
    {
        id: 2,
        name: "Status",
        accessor: "status",
        objectAccessor: null,
        enabled: true,
        cell_style: null,
      },
    {
      id: 3,
      name: "Uploaded",
      accessor: "uploaded_at",
      objectAccessor: null,
      enabled: true,
      cell_style: null,
    },
  ];

  let navigate = useNavigate();
  const routeChangePath = (path) => {
    // let path = `addContacts`;
    navigate(path.id);
  };

  return (
    <div>
      {contactImports.isLoading && <p>Loading...</p>}
      {contactImports.isError && <p>{contactImports.error}</p>}
      {contactImports.isSuccess && (
        <>
          {console.log(contactImports)}
          <Table
            initHeaders={headers}
            data={contactImports.data.allContactimports}
            // createMethod={() => setNewAudience(true)}
            createTitle="New Import"
            // deleteSelected={deleteSelected}
            onRowClick={routeChangePath}
            search="import"
            // setPageNumber={handlePageChange}
            pageNumber={1}
          />
        </>
      )}
    </div>
  );
}
