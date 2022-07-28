import { ToggleSwitch } from "components/inputs/input_fields/ToggleSwitch/ToggleSwitch.jsx";
import { Label } from "components/layouts/Label/Label.jsx";
import React, { useState } from "react";
// import { submitted } from "./CleanerFunctionality.js";
// import { badContacts, capitalize, charCount, containsObject, csvToArray, dedupe, downloadCSVFile, duplicates, emailCheckAt, emailDomain, hasPrefix, hasSuffix, minusWarning, openIgnoreAlert, openSuccess, singleCharCount, spaceRemoval, warningsMap } from "components/ContactCleaner2.0/CleanerFunctionality.js";
import styles from "./ContactCleaner.module.scss";
// import ReactModal from "components/ReactModal/ReactModal";
// import { TextField } from "components/inputs/index.js";
// import Button from "components/buttons/Button/Button.jsx";
import {
  useCreateContactImportGql,
  useCreateManyContactGql,
} from "api/resources/contacts/contacts.js";
import { submitFile } from "./CleanerFunctionality";
import { useNavigate } from "react-router-dom";

export const ContactCleaner = () => {
  //States
  const [file, setFile] = useState();
  //eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState(false);
  const [showUploads, setShowUploads] = useState(true);
  //eslint-disable-next-line no-unused-vars
  const [errorList, setErrorList] = useState([]);
  //eslint-disable-next-line no-unused-vars
  const [waitingForFileUpload, setWaitingForFileUpload] = useState(false);
  // const [showErrors, setShowErrors] = useState(false);
  const [useCleaner, setUseCleaner] = useState(true);
  // const [finalList, setFinalList] = useState([]);
  const createManyContact = useCreateManyContactGql();
  const createContactImport = useCreateContactImportGql();

  //handle onChange when you upload file
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  let navigate = useNavigate();
  const routeChangePath = (id) => {
    let path = id;
    navigate(path);
  };

  //creates a random short ID to be used
  function shortId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  //function is called when you click submit to manipulate the data
  async function handleOnSubmit(e, file) {
    e.preventDefault();
    e.persist();
    if (!file) {
      return;
    }

    setWaitingForFileUpload(true);
    setShowUploads(false);
    setUseCleaner(false);

    let domain_checked = document.getElementById("domainCheck");
    let remove_duplicates_checked = document.getElementById("removeDupes");
    let prefix_checked = document.getElementById("prefixCheck");
    let suffix_checked = document.getElementById("suffixCheck");
    let find_replace_checked = document.getElementById("findandreplacecheck");
    let at_checked = document.getElementById("atCheck");
    let error_header = document.getElementById("errorHeader");
    // let download = document.getElementById("download");
    let char_length_checked = document.getElementById("charlengthCheck");
    let char_length_num = document.getElementById("charlengthnum");
    let single_char_checked = document.getElementById("singlechar");
    // let parOutput = document.getElementById("errorOutput");
    let checkedList = {
      domain_checked,
      remove_duplicates_checked,
      prefix_checked,
      suffix_checked,
      find_replace_checked,
      at_checked,
      error_header,
      char_length_checked,
      char_length_num,
      single_char_checked,
    };

    try {
      //this will all be replaced with a call the the server middleware that handles the cleaning
      const fileContents = await submitFile(file, checkedList);

      //create each contact to be imported
      let contacts = [];
      fileContents.finalArray.map((contact) => {
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
        clean_contacts: fileContents.finalArray,
        bad_contacts: fileContents.badContacts,
        duplicates: fileContents.duplicates,
        // warnings_map: fileContents.warnings_map,
        total_warnings: fileContents.warnCount,
        status: fileContents.warnCount > 0 ? "Has Errors" : "Imported",
        uploaded_at: "2020-01-01",
      });

      console.log("FileContents");
      console.log(fileContents);
      setWaitingForFileUpload(false);
      // routeChangePath("3424");
    } catch (e) {
      console.log(e);
      setWaitingForFileUpload(false);
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.aboutbox}>
        <div>
          {useCleaner && (
            <div className={styles.container1}>
              <h2>How to upload</h2>
              <p>
                ONLY IMPORT .csv FILES, ALL OTHER FILE TYPES WILL NOT WORK!
                <br /> First three header fields must be in the following
                format: firstname,lastname,email
              </p>
              <p>
                Please remove all quotation marks in your file. Example: William
                &quot;Bill&quot;
              </p>
            </div>
          )}
          {showUploads && (
            <div id="menubox" className={styles.menubox}>
              <div className={styles.uploadbox} id="uploadBoxid">
                <p>Upload File Here</p>
                <form id="myForm" className={styles.myForm}>
                  <input
                    type="file"
                    id="csvFile"
                    accept=".csv"
                    className={styles.csvFile}
                    onChange={handleOnChange}
                  />
                  <div className={styles.setting}>
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      Use Contact Cleaner
                    </label>
                    <ToggleSwitch
                      startChecked={useCleaner}
                      handleCheck={() => setUseCleaner(!useCleaner)}
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      handleOnSubmit(e, file);
                      // setFinalList(submitted(e, file, setShow));
                      // console.log(finalList);
                    }}
                    id="submitButton"
                    className={styles.submitButton}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        {useCleaner && (
          <div className={styles.settingsbox} id="settingsboxid">
            <div id="switchbox" className={styles.switchbox}>
              <h5>
                Contact Cleaner <i className="bi bi-question-circle"> </i>
              </h5>
              <div className={styles.charlengthbox}>
                <div className={styles.setting} id="charlength">
                  <ToggleSwitch id="charlengthCheck" startChecked />
                  <Label
                    className={styles.charlengthtext}
                    htmlFor="flexSwitchCheckDefault"
                    id="charlengthtext"
                  >
                    Character length over:
                  </Label>
                  <input
                    type="number"
                    min="0"
                    className={styles.charlengthnum}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="#"
                    id="charlengthnum"
                    defaultValue={20}
                  />
                </div>
              </div>
              <div className={styles.setting}>
                <ToggleSwitch startChecked id="singlechar" />
                <Label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Single character or letter
                </Label>
              </div>
              <div className={styles.setting}>
                <ToggleSwitch startChecked id="atCheck" />
                <Label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Look for @ symbol
                </Label>
              </div>
              <div className={styles.setting}>
                <ToggleSwitch startChecked id="domainCheck" />
                <Label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Verify domian
                </Label>
              </div>
              <div className={styles.setting}>
                <ToggleSwitch startChecked id="removeDupes" />
                <Label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Remove duplicates by email
                </Label>
              </div>
              <div className={styles.setting}>
                <ToggleSwitch startChecked id="prefixCheck" />
                <Label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Check for prefixes
                </Label>
              </div>
              <div className={styles.setting}>
                <ToggleSwitch startChecked id="suffixCheck" />
                <Label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Check for suffixes
                </Label>
              </div>
              <div className={styles.setting}>
                <ToggleSwitch startChecked id="findandreplacecheck" />
                <Label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                  id="findreplacelabel"
                >
                  Find and Replace{" "}
                  <button
                    id="configurefar"
                    type="button"
                    className={`${styles.configurefar}`}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalCenter"
                  >
                    <u>configure</u>
                  </button>
                </Label>
              </div>
            </div>
          </div>
        )}
        {waitingForFileUpload && (
          <div>
            Your upload is being processed, we will notify you when it is
            finsished. You may leave this page if you so wish
          </div>
        )}
      </div>

      {createContactImport.isSuccess && createManyContact && (
        <div>
          {routeChangePath(
            "/contacts/previous-imports/" +
              createContactImport.data.createContactimport.id
          )}
        </div>
      )}
    </div>
  );
};
