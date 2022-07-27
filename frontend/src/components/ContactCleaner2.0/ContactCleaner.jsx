import { ToggleSwitch } from "components/inputs/input_fields/ToggleSwitch/ToggleSwitch.jsx";
import { Label } from "components/layouts/Label/Label.jsx";
import React, { useState } from "react";
// import { submitted } from "./CleanerFunctionality.js";
// import { badContacts, capitalize, charCount, containsObject, csvToArray, dedupe, downloadCSVFile, duplicates, emailCheckAt, emailDomain, hasPrefix, hasSuffix, minusWarning, openIgnoreAlert, openSuccess, singleCharCount, spaceRemoval, warningsMap } from "components/ContactCleaner2.0/CleanerFunctionality.js";
import styles from "./ContactCleaner.module.scss";
// import ReactModal from "components/ReactModal/ReactModal";
// import { TextField } from "components/inputs/index.js";
import Button from "components/buttons/Button/Button.jsx";
import { useCreateContactImportGql, useCreateManyContactGql } from "api/resources/contacts/contacts.js";
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

  //function creates a short ID to use
  function shortId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  //create contacts in query
  function handleCreateContacts(data) {
    console.log(data);
    if (data.length > 0) {
      //if there is no data don't do anything and prompt user to add a new row for contacts
      // console.log(data);
      let contacts = [];
      //take the given contacts and format them to be right for the query
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
          prefix: contact.prefix,
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
      console.log(contacts);
      //create contacts and add them to database
      createManyContact.mutate({
        data: contacts,
      });
    }
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
    }


    try {
      //this will all be replaced with a call the the server middleware that handles the cleaning
      const fileContents = await submitFile(file, checkedList);
      //create the contact import here
      createContactImport.mutate({
        organization_id: "0684348415",
        user_id: "563",
        clean_contacts: fileContents.finalArray,
        bad_contacts: fileContents.badContacts,
        duplicates: fileContents.duplicates,
        warnings_map: fileContents.warnings_map,
        total_warnings: fileContents.warnCount,
      });
      console.log("FileContents");
      console.log(fileContents);
      setWaitingForFileUpload(false);
      routeChangePath("3424");

    } catch (e) {
      console.log(e);
      setWaitingForFileUpload(false);

    }

  }

  return (
    <div className={styles.body}>
      {/* <!-- success alert --> */}
      {/* <div
            className={`${styles.alert} ${styles.success}`}
            id="successalert"
          >
            <strong>Success!</strong> Changes have been saved and the contact
            was added to the clean list and removed from error list
          </div> */}
      {/* <!-- ignored alert --> */}
      {/* <div className={`${styles.alert} ${styles.success}`} id="ignorealert">
            <strong>Success!</strong> Contact warnings have been ignored and
            added to clean list
          </div> */}
      {/* <!-- Modal --> */}
      {/* <ReactModal
            show={show}
            onClose={() => setShow(false)}
            onSave={() => {
              setShow(false);
            }}
            saveID="savebutton"
          >
            <h5 className="modal-title" id="staticBackdropLabel">
              Modal title
            </h5>

            <div className="modal-body">
              <div className={styles.modalcontent} id="modalinfo"></div>
              <Label>First Name:</Label>
              <TextField inputID="editFName"></TextField>
              <Label>Last Name:</Label>
              <TextField inputID="editLName"></TextField>
              <Label>Email:</Label>
              <TextField inputID="editEmail"></TextField>
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                id="ignoremodalbutton"
                onClick={() => setShow(false)}
              >
                <u>Ignore Errors</u>
              </button>
            </div>
          </ReactModal> */}
      {/* <!-- Modal configure --> */}
      {/* <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex="-1"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Find and Replace Settings
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-bodyfar" id="modalfindreplace">
                  <div className="modalbox" id="modalboxheader">
                    <input
                      className="farinput"
                      id="farHeader"
                      type="text"
                      placeholder="Header"
                      aria-label="default input example"
                    />
                    <button
                      type="button"
                      id="addheader"
                      className="btn btn-primary"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      id="removeheader"
                      className="btn btn-primary"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="modalbox" id="moreheaders"></div>
                  <div className="modalbox">
                    <input
                      className="farinput"
                      id="findinput"
                      type="text"
                      placeholder="Find"
                      aria-label="default input example"
                    />
                    <input
                      className="farinput"
                      id="replaceinput"
                      type="text"
                      placeholder="Replace"
                      aria-label="default input example"
                    />
                    <button
                      type="button"
                      id="addreplace"
                      className="btn btn-primary"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      id="removereplace"
                      className="btn btn-primary"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="modalbox" id="moreFars"></div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div> */}

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
        {waitingForFileUpload && (<div>Your upload is being processed, we will notify you when it is finsished. You may leave this page if you so wish</div>)}
      </div>
      <div className={styles.bodybox} id="outputbox">
        <p id="arrayOutput"></p>
        <div id="warningBox">
          <h5 id="changeHeader"></h5>
          <p id="changes"></p>
          <h5 id="errorHeader"></h5>
          <div id="errorOutput"></div>
          <div id="download" className={styles.footer}>
            <Button id="uploadCleanList" onClick={handleCreateContacts}>
              {" "}
              Upload Clean List
            </Button>
            <Button id="cleanList" blue></Button>
            <Button id="badList"></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
