// import App from "components/EditableTable/App";
import React, { useState } from "react";
// import EditableTable from "../../../components/BasicTable/EditableTable.jsx";
import Editor from "components/tables/EditableTable/App.jsx";
import { useCreateContactGql } from "api/resources/contacts/contacts";
// import Button from "components/buttons/Button/Button";
import styles from "./Manual.module.scss";

//org id will need to be passed in
export function Manual() {
  // const [isLoading, setIsLoading] = useState(false);
  const [buttonStatus, setButtonStatus] = useState("Save");
  const createContact = useCreateContactGql();

  const createContacts = (data) => {
    if (data.length > 0) {
      data.map((contact) =>
        createContact.mutate({
          organization_id: "0684348415",
          survey_participation_count: 0,
          survey_completion_count: 0,
          survey_noncompletion_count: 0,
          last_surveyed_at: "never",
          created_at: "2020-01-01",
          updated_at: "2020-01-01",
          prefix: contact.prefix,
          first_name: contact.firstName,
          middle_name: contact.middleName ? contact.middleName : "none",
          last_name: contact.lastName,
          email: contact.email,
          gender: contact.gender ? contact.gender : "none",
          locale: contact.locale ? contact.locale : "en",
          company: contact.company,
          position: contact.position,
          position_category: contact.positioncategory
            ? contact.positioncategory
            : "none",
          date_of_birth: contact.dateofbirth ? contact.dateofbirth : "none",
          last_survey_completed: "never",
          last_survey_invitation: "never",
        })
      );
      if (createContact.isLoading) {
        setButtonStatus("Saving");
        alert("loading")
      }
      if (createContact.isSuccess) {
        setButtonStatus("Saved");
        // alert("success")
      }
    } else {
      alert("Click + New to add a new row")
    }

  };

  return (
    <div className={styles.manualPage}>
      <Editor buttonName={buttonStatus} setList={createContacts} changeButtonStatus={setButtonStatus}></Editor>
      {/* <button onClick={() => console.log(contacts)}>Log Data</button> */}
    </div>
  );
}
