import Button from "components/buttons/Button/Button";
import React, { useState } from "react";
import styles from "./CleaningTable.module.scss";
import ReactModal from "components/ReactModal/ReactModal";
import { Form } from "components/inputs/ClickSaveForm/ClickSaveForm";
import { TextFieldSimple } from "components/inputs";

export function CleaningTable({ bad_contacts, clean_contacts, duplicates }) {
  //States
  //eslint-disable-next-line no-unused-vars
  const [badContacts, setBadContacts] = useState(bad_contacts);
  //eslint-disable-next-line no-unused-vars
  const [cleanContacts, setCleanContacts] = useState(clean_contacts);
  //eslint-disable-next-line no-unused-vars
  const [duplicateContacts, setDuplicateContacts] = useState(duplicates);
  const [show, setShow] = useState(false);
  //eslint-disable-next-line no-unused-vars
  const [currContact, setCurrContact] = useState(bad_contacts[0]);

  //these are the headers for the table
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

  function handleImportAnyways() {
    alert("There are some errors but we are importing anyways")
  }

  return (
    <div className={styles.fullPage}>
      <div className={styles.topTable}>
        <h2>Import Errors</h2>
        <div className={styles.buttonsTopRight}>
          <Button
            gray
            //   onClick={() => downloadCSVFile(badContacts, "bad_contacts")}
          >
            Revert Imports
          </Button>
          <Button
            blue
            //   onClick={() => downloadCSVFile(badContacts, "bad_contacts")}
          >
            View Successful Imports
          </Button>
        </div>
      </div>
      {badContacts.length > 0 && (
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
              <tr
                key={contact.record}
                className={styles.rowData}
                
              >
                <td onClick={() => handleRowClick(contact)}>{contact.record}</td>
                <td onClick={() => handleRowClick(contact)}><div className={`${contact.warnings.includes("First Name is a single character") ? styles.error : ""} ${contact.warnings.includes("First Name has suffix") ? styles.error : ""} ${contact.warnings.includes("Prefix found in first name") ? styles.error : ""}`}>{contact.firstname}</div></td>
                <td onClick={() => handleRowClick(contact)}><div className={`${contact.warnings.includes("Last Name is a single character") ? styles.error : ""} ${contact.warnings.includes("Last Name has suffix") ? styles.error : ""} ${contact.warnings.includes("Prefix found in last name") ? styles.error : ""}`}>{contact.lastname}</div></td>
                <td onClick={() => handleRowClick(contact)}><div className={`${contact.warnings.includes("Invalid email domain") ? styles.error : ""}${contact.warnings.includes("No @ symbol in email") ? styles.error : ""}`}>{contact.email}</div></td>
                <td onClick={() => handleRowClick(contact)}>
                  {contact.warnings.length > 1
                    ? "Multiple Errors"
                    : contact.warnings[0]}
                </td>
                <td className={styles.actionCell} ><Button gray onClick={() => handleImportAnyways()}>Import Anyways</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
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
      <ReactModal show={show}>
        <Form onClose={() => setShow(false)} onSave={() => setShow(false)} saveText="Import">
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
    </div>
  );
}
