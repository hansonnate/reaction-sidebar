import React from "react";
import styles from "./ContactCleaner.module.scss";
// import exampleFile from "./Images/fileFormat.png";
// import {submitted} from "./CleanerFunctionality.js"

function ContactCleaner() {
  return (
    <div className={styles.body}>
      {/* <!-- success alert --> */}
      {/* <div className={`${styles.alert} ${styles.success}`} id="successalert">
        <strong>Success!</strong> Contact has been added to the final list and
        removed from error list
      </div> */}
      {/* <!-- ignored alert --> */}
      {/* <div className={`${styles.alert} ${styles.success}`} id="ignorealert">
        <strong>Success!</strong> Contact warnings have been ignored and added
        to clean list
      </div> */}
      {/* <script text="type/javascript" src={functionality}></script> */}

      <div className={styles.aboutbox}>
        <div className={styles.container1}>
          <h2>Before Upload...</h2>
          <p>
            ONLY IMPORT .csv FILES, ALL OTHER FILE TYPES WILL NOT WORK! <br />{" "}
            File should be adjusted to the following format:
            firstname,lastname,email
          </p>
          <p>
            Remove all quotation marks in your file. Example: William
            &quot;Bill&quot;
          </p>
          <p>
            Configure the settings below to change how annoying you want this
            program to be. Click the switches to turn a setting on or off. All
            settings are initially enabled. Each setting, when enabled, will
            flag each row that has those issues and will remove them from the
            final clean audience until those issues are fixed
          </p>
        </div>
        {/* <div className={styles.container2}>
          <p>Example in excel: </p>
          <img
            src={exampleFile}
            alt="firstname,lastname,email"
            id="exampleImage"
          />
          <p>
            Click <a href="#">here</a> to see full explations of each setting.
          </p>
        </div> */}
        <div className={styles.settingsbox} id="settingsboxid">
          <div id="switchbox" className={styles.switchbox}>
            <h5>
              Contact Cleaner <i className="bi bi-question-circle"> </i>
            </h5>
            <div className={styles.charlengthbox}>
              <div className="form-check form-switch" id="charlength">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="charlengthCheck"
                />
                <label
                  className={styles.charlengthtext}
                  htmlFor="flexSwitchCheckDefault"
                  id="charlengthtext"
                >
                  Character length over:
                </label>
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
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="singlechar"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Single character or letter
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="atCheck"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Look for @ symbol
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="domainCheck"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Verify domian
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="removeDupes"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Remove duplicates by email
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="prefixCheck"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Check for prefixes
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="suffixCheck"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Check for suffixes
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="findandreplacecheck"
              />
              <label
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
              </label>
            </div>
          </div>
        </div>
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
            />
            <div className="form-switch form-check">
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Use Contact Cleaner
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                id="useCleaner"
              />
            </div>
            <input
              type="submit"
              value="Submit"
              id="submitButton"
              className={styles.submitButton}
            />
          </form>
        </div>
      </div>
      {/* <div className={styles.bodybox} id="outputbox">
        <p id="arrayOutput"></p>
        <div id="warningBox">
          <h5 id="changeHeader"></h5>
          <p id="changes"></p>
          <h5 id="errorHeader"></h5>
          <p id="errorOutput"></p>
          <p id="download"></p>
        </div>
      </div> */}
    </div>
  );
}

export default ContactCleaner;
