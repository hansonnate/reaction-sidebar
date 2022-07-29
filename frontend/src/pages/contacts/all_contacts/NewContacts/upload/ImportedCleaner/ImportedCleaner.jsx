import {
  useCreateContactGql,
  useFetchContactImportGql,
  useUpdateContactImportGql,
} from "api/resources/contacts/contacts";
import { CleaningTable } from "components/tables/CleaningTable/CleaningTable";
import React from "react";
import { useParams } from "react-router-dom";
import styles from "./ImportedCleaner.module.scss";

export function ImportedCleaner() {
  const { id } = useParams();
  const fetchContactImport = useFetchContactImportGql(id);
  const createContact = useCreateContactGql();
  const updateImport = useUpdateContactImportGql();


  function handleCreateContact(contact) {
    createContact.mutate({
      organization_id: "0684348415",
      survey_participation_count: 0,
      survey_completion_count: 0,
      survey_noncompletion_count: 0,
      last_surveyed_at: "never",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      prefix: contact.prefix ? contact.prefix : "none",
      first_name: contact.firstname,
      middle_name: contact.middlename ? contact.middlename : "none",
      last_name: contact.lastname,
      email: contact.email,
      gender: contact.gender ? contact.gender : "none",
      locale: contact.locale ? contact.locale : "en",
      company: contact.company ? contact.company : "none",
      position: contact.position ? contact.position : "none",
      position_category: contact.positioncategory
        ? contact.positioncategory
        : "none",
      date_of_birth: contact.dateofbirth ? contact.dateofbirth : "none",
      last_survey_completed: "never",
      last_survey_invitation: "never",
    });
  }

  function handleUpdateImport(data) {
    console.log("New Import")
    console.log(data);
    updateImport.mutate({
      id: fetchContactImport.data.Contactimport.id,
      organization_id: "0684348415",
      user_id: fetchContactImport.data.Contactimport.User.id,
      clean_contacts: data.clean_contacts,
      bad_contacts: data.bad_contacts,
      duplicates: data.duplicates,
      total_warnings: data.total_warnings,
      status: data.status,
      uploaded_at: fetchContactImport.data.Contactimport.uploaded_at,
    });

  }

  return (
    <>
      {fetchContactImport.isError && <div>Error</div>}
      {fetchContactImport.isLoading && <div>Loading...</div>}
      {fetchContactImport.isSuccess && (
        <>
          {console.log(fetchContactImport)}
          <CleaningTable
            bad_contacts={fetchContactImport.data.Contactimport.bad_contacts}
            clean_contacts={
              fetchContactImport.data.Contactimport.clean_contacts
            }
            duplicates={fetchContactImport.data.Contactimport.duplicates}
            total_warnings={
              fetchContactImport.data.Contactimport.total_warnings
            }
            importContact={handleCreateContact}
            updateImport={handleUpdateImport}
          ></CleaningTable>
        </>
      )}
      {createContact.isSuccess && updateImport.isSuccess && <div className={styles.createContactSuccess}>Success!</div>}
    </>
  );
}

// export default ImportedCleaner
