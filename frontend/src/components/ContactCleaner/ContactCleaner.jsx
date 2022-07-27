import { ToggleSwitch } from "components/inputs/input_fields/ToggleSwitch/ToggleSwitch.jsx";
import { Label } from "components/layouts/Label/Label.jsx";
import React, { useState } from "react";
import { submitted } from "./CleanerFunctionality.js";
import styles from "./ContactCleaner.module.scss";
import "./style.css";
import ReactModal from "components/ReactModal/ReactModal";
import { TextField } from "components/inputs/index.js";
import Button from "components/buttons/Button/Button.jsx";
import { useCreateManyContactGql } from "api/resources/contacts/contacts.js";
// import exampleFile from "./Images/fileFormat.png";
// import {submitted} from "./CleanerFunctionality.js"

export const ContactCleaner = () => {
  const [file, setFile] = useState();
  const [show, setShow] = useState(false);
  const [useCleaner, setUseCleaner] = useState(true);
  const [finalList, setFinalList] = useState([]);
  // const fileReader = new FileReader();

  const handleOnChange = (e) => {
    console.log(file);
    setFile(e.target.files[0]);
  };

  const createManyContact = useCreateManyContactGql();

  function shortId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  //create contacts in query
  function handleCreateContacts() {
    console.log(finalList);
    if (finalList.length > 0) {
      //if there is no data don't do anything and prompt user to add a new row for contacts
      // console.log(data);
      let contacts = [];
      //take the given contacts and format them to be right for the query
      finalList.map((contact) => {
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
          company: contact.company,
          position: contact.position,
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
    }
  }

  function handleOnSubmit(e, file) {
    let finalArray = submitted(e, file, setShow);
    console.log("File Passed through: ");
    console.log(finalArray);
    setFinalList(finalArray);
  }

  // const handleOnSubmit = (e) => {
  //     e.preventDefault();

  //     if (file) {
  //         fileReader.onload = function (event) {
  //             const csvOutput = event.target.result;
  //             console.log(csvOutput);
  //         };

  //         fileReader.readAsText(file);
  //     }
  // };

  return (
    <div className={styles.body}>
      {useCleaner && (
        <>
          {/* <!-- success alert --> */}
          <div
            className={`${styles.alert} ${styles.success}`}
            id="successalert"
          >
            <strong>Success!</strong> Changes have been saved and the contact
            was added to the clean list and removed from error list
          </div>
          {/* <!-- ignored alert --> */}
          <div className={`${styles.alert} ${styles.success}`} id="ignorealert">
            <strong>Success!</strong> Contact warnings have been ignored and
            added to clean list
          </div>
          {/* <!-- Modal --> */}
          <ReactModal
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
          </ReactModal>
          {/* <!-- Modal configure --> */}
          <div
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
          </div>

          <div className={styles.aboutbox}>
            <div>
              <div className={styles.container1}>
                <h2>How to upload</h2>
                <p>
                  ONLY IMPORT .csv FILES, ALL OTHER FILE TYPES WILL NOT WORK!
                  <br /> First three header fields must be in the following
                  format: firstname,lastname,email
                </p>
                <p>
                  Please remove all quotation marks in your file. Example:
                  William &quot;Bill&quot;
                </p>
              </div>
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
                        handleCheck={setUseCleaner}
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        handleOnSubmit(e, file)
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
            </div>
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
          </div>
        </>
      )}
      <div className={styles.bodybox} id="outputbox">
        <p id="arrayOutput"></p>
        <div id="warningBox">
          <h5 id="changeHeader"></h5>
          <p id="changes"></p>
          <h5 id="errorHeader"></h5>
          <p id="errorOutput"></p>
          <div id="download" className={styles.footer}>
            <Button id="uploadCleanList" onClick={handleCreateContacts}> Upload Clean List</Button>
            <Button id="cleanList" blue></Button>
            <Button id="badList"></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
