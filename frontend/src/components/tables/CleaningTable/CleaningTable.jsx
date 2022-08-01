import Button from "components/buttons/Button/Button";
import React, { useState } from "react";
import styles from "./CleaningTable.module.scss";
import ReactModal from "components/ReactModal/ReactModal";
import { Form } from "components/inputs/ClickSaveForm/ClickSaveForm";
import { TextFieldSimple } from "components/inputs";
import Table from "../Table/Table";

export function CleaningTable({
  bad_contacts,
  clean_contacts,
  duplicates,
  importContact,
  revertImports,
  updateImport,
  viewImports,
  total_warnings,
}) {
  //States
  const [badContacts, setBadContacts] = useState(bad_contacts);
  const [cleanContacts, setCleanContacts] = useState(clean_contacts);
  //eslint-disable-next-line no-unused-vars
  const [duplicateContacts, setDuplicateContacts] = useState(duplicates);
  const [show, setShow] = useState(false);
  //eslint-disable-next-line no-unused-vars
  const [showImports, setShowImports] = useState(false);
  const [warningCount, setWarningCount] = useState(total_warnings);
  const [currContact, setCurrContact] = useState(0);

  //these are the headers for the warnigs table
  const headers = [
    {
      id: 0,
      name: "Record",
      accessor: "record",
      enabled: true,
      cell_style: null,
    },
    {
      id: 6,
      name: "First Name",
      accessor: "first_name",
      enabled: true,
      cell_style: null,
    },
    {
      id: 4,
      name: "Last Name",
      accessor: "last_name",
      enabled: true,
      cell_style: null,
    },
    {
      id: 5,
      name: "Email",
      accessor: "email",
      enabled: true,
      cell_style: null,
    },
    {
      id: 1,
      name: "Error",
      accessor: "error",
      enabled: true,
      cell_style: null,
    },
    {
      id: 3,
      name: "Action",
      accessor: "action",
      enabled: true,
      cell_style: null,
    },
  ];

  const headersSuccessImports = [
    {
      id: 0,
      name: "Email",
      accessor: "email",
      enabled: true,
      cell_style: null,
    },
    {
      id: 1,
      name: "First Name",
      accessor: "firstname",
      enabled: true,
      cell_style: null,
    },
    {
      id: 2,
      name: "Last Name",
      accessor: "lastname",
      enabled: true,
      cell_style: null,
    },
    {
      id: 3,
      name: "Position",
      accessor: "position",
      enabled: true,
      cell_style: null,
    },
    {
      id: 4,
      name: "Company",
      accessor: "company",
      enabled: true,
      cell_style: null,
    },
  ];

  //this function creates a csv string to be able to export the new Audience
  function toCSV(fullArray, columnDelimiter = ",", lineDelimiter = "\n") {
    let result, ctr, keys;

    if (fullArray === null || !fullArray.length) {
      return null;
    }

    keys = Object.keys(fullArray[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    fullArray.forEach((item) => {
      ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) {
          result += columnDelimiter;
        }

        result +=
          typeof item[key] === "string" && item[key].includes(columnDelimiter)
            ? `"${item[key]}"`
            : item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  //this function allows you to download the new CSV file
  function downloadCSVFile(array, fileName) {
    // Create CSV file object and feed our
    // csv_data into it
    let csvText = toCSV(array);
    let CSVFile = new Blob([csvText], { type: "text/csv" });

    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement("a");

    // Download csv file
    temp_link.download = fileName + ".csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
  }

  function handleRowClick(contact) {
    setCurrContact(contact);
    setShow(true);
    console.log(currContact);
  }

  function handleImportAnyways(contact, didEdit) {
    let newContact = {};
    if (didEdit) {
      newContact = currContact;
      newContact.firstname = contact.firstname;
      newContact.lastname = contact.lastname;
      newContact.email = contact.email;
    } else {
      newContact = contact;
    }
    setShow(false);
    importContact(newContact);
    let data = {};
    let tempArray = [...badContacts];
    let index = tempArray.indexOf(newContact);
    tempArray.splice(index, 1);
    let status = "Has Errors";
    if (tempArray.length === 0) {
      status = "Imported";
    }
    data.status = status;
    data.bad_contacts = tempArray;
    setBadContacts(tempArray);
    let newWarnings = warningCount - newContact.warnings.length;
    setWarningCount(newWarnings);
    data.total_warnings = newWarnings;
    tempArray = [...cleanContacts];
    tempArray.push(newContact);
    data.clean_contacts = tempArray;
    data.duplicates = duplicates;
    setCleanContacts(tempArray);
    updateImport(data);
    setCurrContact(0);
  }

  function handleRevertImports() {
    revertImports();
  }

  function handleViewImports() {
    //view successful imports
    setShowImports(true);
    viewImports();
  }

  return (
    <div className={styles.fullPage}>
      <div className={styles.topTable}>
        <h2>Import Errors</h2>
        <div className={styles.buttonsTopRight}>
          <Button gray onClick={() => handleRevertImports()}>
            Revert Imports
          </Button>
          <Button blue onClick={() => handleViewImports()}>
            View Successful Imports
          </Button>
        </div>
      </div>
      {badContacts.length > 0 && (
        <>
          <table className={`${styles.fulltable}`}>
            <thead>
              <tr className={`${styles.header}`}>
                {headers.map((header) => (
                  <th key={header.id}>{header.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {badContacts.map((contact) => (
                <tr key={contact.record} className={styles.rowData}>
                  <td onClick={() => handleRowClick(contact)}>
                    {contact.record}
                  </td>
                  <td onClick={() => handleRowClick(contact)}>
                    <div
                      className={`${
                        contact.warnings.includes(
                          "First Name is a single character"
                        )
                          ? styles.error
                          : ""
                      } ${
                        contact.warnings.includes("First Name has suffix")
                          ? styles.error
                          : ""
                      } ${
                        contact.warnings.includes("Prefix found in first name")
                          ? styles.error
                          : ""
                      }`}
                    >
                      {contact.firstname}
                    </div>
                  </td>
                  <td onClick={() => handleRowClick(contact)}>
                    <div
                      className={`${
                        contact.warnings.includes(
                          "Last Name is a single character"
                        )
                          ? styles.error
                          : ""
                      } ${
                        contact.warnings.includes("Last Name has suffix")
                          ? styles.error
                          : ""
                      } ${
                        contact.warnings.includes("Prefix found in last name")
                          ? styles.error
                          : ""
                      }`}
                    >
                      {contact.lastname}
                    </div>
                  </td>
                  <td onClick={() => handleRowClick(contact)}>
                    <div
                      className={`${
                        contact.warnings.includes("Invalid email domain")
                          ? styles.error
                          : ""
                      }${
                        contact.warnings.includes("No @ symbol in email")
                          ? styles.error
                          : ""
                      }`}
                    >
                      {contact.email}
                    </div>
                  </td>
                  <td onClick={() => handleRowClick(contact)}>
                    {contact.warnings.length > 1
                      ? "Multiple Errors"
                      : contact.warnings[0]}
                  </td>
                  <td className={styles.actionCell}>
                    <Button gray onClick={() => handleImportAnyways(contact)}>
                      Import Anyway
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactModal show={show}>
            <Form
              onClose={() => setShow(false)}
              onSave={(data) => handleImportAnyways(data, true)}
              saveText="Import"
              data={currContact}
            >
              <TextFieldSimple
                name="firstname"
                type="text"
                labelTop="First Name"
                placeholder="First Name"
                value={currContact.firstname}
              ></TextFieldSimple>
              <TextFieldSimple
                name="lastname"
                type="text"
                labelTop="Last Name"
                placeholder="Last Name"
                value={currContact.lastname}
              ></TextFieldSimple>
              <TextFieldSimple
                name="email"
                type="text"
                labelTop="Email"
                placeholder="Email"
                value={currContact.email}
              ></TextFieldSimple>
            </Form>
          </ReactModal>
        </>
      )}
      {cleanContacts.length > 0 && (
        <ReactModal show={showImports} onClose={() => setShowImports(false)}>
        <Table
          initHeaders={headersSuccessImports}
          data={cleanContacts}
          createMethod={() => revertImports()}
          createTitle="Revert Imports"
          // deleteSelected={deleteSelected}
          // onRowClick={routeChange}
          search="contact"
          // setPageNumber={handlePageChange}
          // pageNumber={pageNumber + 1}
          pageNumber={1}
          maxPage={5}
          // bottomLeft={<Button blue onClick={() => routeChangePath("/contacts/previous-imports")}>Previous Imports</Button>}
        />
        </ReactModal>
      )}
      {badContacts.length === 0 && (
        <div className={styles.noErrorsBox}>
          <div>
            No errors upon import. Congrats! Click{" "}
            <span onClick={() => handleViewImports()}>
              view successful imports
            </span>{" "}
            to see what you imported
          </div>
        </div>
      )}
      <div className={styles.buttonFooter}>
        <Button
          gray
          onClick={() => downloadCSVFile(badContacts, "bad_contacts")}
        >
          Download Bad Contacts
        </Button>
        <Button
          gray
          onClick={() => downloadCSVFile(cleanContacts, "clean_contacts")}
        >
          Download Imported Contacts
        </Button>
        <Button gray onClick={() => downloadCSVFile(duplicates, "duplicates")}>
          Download Duplicates
        </Button>
      </div>
    </div>
  );
}
