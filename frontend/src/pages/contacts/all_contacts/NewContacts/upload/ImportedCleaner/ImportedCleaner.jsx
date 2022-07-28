import { useFetchContactImportGql } from "api/resources/contacts/contacts";
import { CleaningTable } from "components/tables/CleaningTable/CleaningTable";
import React from "react";
import { useParams } from "react-router-dom";

export function ImportedCleaner() {
  const { id } = useParams();
  const fetchContactImport = useFetchContactImportGql(id);

  return (
    <>
      {fetchContactImport.isError && <div>Error</div>}
      {fetchContactImport.isLoading && <div>Loading...</div>}
      {fetchContactImport.isSuccess && (
        <>
        {console.log(fetchContactImport)}
          <CleaningTable
            bad_contacts={fetchContactImport.data.Contactimport.bad_contacts}
            clean_contacts={fetchContactImport.data.Contactimport.clean_contacts}
            duplicates={fetchContactImport.data.Contactimport.duplicates}
            total_warnings={fetchContactImport.data.Contactimport.total_warnings}
          ></CleaningTable>
        </>
      )}
    </>
  );
}

// export default ImportedCleaner
