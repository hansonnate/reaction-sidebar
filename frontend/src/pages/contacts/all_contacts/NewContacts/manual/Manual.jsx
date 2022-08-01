// import App from "components/EditableTable/App";
import React, { useState } from "react";
// import EditableTable from "../../../components/BasicTable/EditableTable.jsx";
import Editor from "components/tables/EditableTable/App.jsx";
// import { useCreateContactGql } from "api/resources/contacts/contacts";
// import Button from "components/buttons/Button/Button";
import styles from "./Manual.module.scss";
import {
  useCreateContactImportGql,
  useCreateManyContactGql,
} from "api/resources/contacts/contacts";
import { useNavigate } from "react-router-dom";
// import { ToggleSwitch } from "components/inputs/input_fields/ToggleSwitch/ToggleSwitch";

//org id will need to be passed in
export function Manual() {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonStatus, setButtonStatus] = useState("Save");
  // const [useCleaner, setUseCleaner] = useState(true);
  const createManyContact = useCreateManyContactGql();
  const createContactImport = useCreateContactImportGql();

  let navigate = useNavigate();
  const routeChangePath = (id) => {
    let path = id;
    navigate(path);
  };

    //creates a random short ID to be used
    function shortId() {
      return "_" + Math.random().toString(36).substr(2, 9);
    }
  

  const createContacts = (data) => {
    console.log(data);
    if (data.length > 0) {
      setIsLoading(true);
      //create each contact to be imported
      let contacts = [];
      data.map((contact) => {
        contacts.push({
          id: shortId(),
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
      });
      //create contacts and add them to database
      createManyContact.mutate({
        data: contacts,
      });
      //create the contact import here
      createContactImport.mutate({
        organization_id: "0684348415",
        user_id: "563",
        type: "Manual",
        clean_contacts: contacts,
        bad_contacts: [],
        duplicates: [],
        // warnings_map: fileContents.warnings_map,
        total_warnings: 0,
        status: "Imported",
        uploaded_at: "2020-01-01",
        audience: "none",
      });
    }
  };

  return (
    <div className={styles.manualPage}>
      {!isLoading && (
        <Editor
          buttonName={buttonStatus}
          setList={createContacts}
          changeButtonStatus={setButtonStatus}
        ></Editor>
      )}
      {createManyContact.isError || createContactImport.isError && (
        <div>
          Error...
        </div>
      )}
      {createManyContact.isLoading && createContactImport.isLoading && (
        <div>
          Your upload is being processed, we will notify you when it is
          finsished. You may leave this page if you so wish
        </div>
      )}
      {createContactImport.isSuccess && createManyContact.isSuccess && (
        <div>
          {routeChangePath(
            "/contacts/previous-imports/" +
              createContactImport.data.createContactimport.id
          )}
        </div>
      )}
      {/* <div className={styles.setting}>
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Use Contact Cleaner
        </label>
        <ToggleSwitch
          startChecked={useCleaner}
          handleCheck={() => setUseCleaner(!useCleaner)}
        />
      </div> */}
      {/* <button onClick={() => console.log(contacts)}>Log Data</button> */}
    </div>
  );
}
