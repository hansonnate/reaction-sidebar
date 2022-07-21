import Button from "components/buttons/Button/Button";
import Checkbox from "components/inputs/input_fields/CheckboxAnimated/Checkbox";
import { SearchField } from "components/inputs/input_fields/SearchField/SearchField";
import React, { useState } from "react";
import styles from "./Table.module.scss";

function Table({ initHeaders, createTitle, createMethod, data, onRowClick }) {


  //if they dont have any data yet display no data page
  if (data.length === 0) {
    return <div>No Data</div>;
  }
  let array = [];
  data.map((row) => array.push({ id: row.id, checked: false }));
  //set headers
  // eslint-disable-next-line no-unused-vars
  const [headers, setHeaders] = useState(initHeaders);
  const [checkboxes, setCheckboxes] = useState([]);
  const [MasterChecked, setMasterChecked] = useState(false);

  // Update List Item's state and Master Checkbox State
  const onItemCheck = (id) => {
    let tempList = [...checkboxes];
    // console.log(tempList.includes(id));
    if (!tempList.includes(id)) {
      tempList.push(id);
      setCheckboxes(tempList);
      // setMasterChecked(true);
      console.log(MasterChecked);
    } else {
      console.log(id);
      var index = tempList.indexOf(id);
      // console.log(index);
      tempList.splice(index, 1);
      setCheckboxes(tempList);
      // setMasterChecked(true);
      console.log(MasterChecked);
    }
    if (tempList.length === data.length) {
      setMasterChecked(true);
    } else {
      setMasterChecked(false);
    }
    console.log(checkboxes);
  };

  // Select/ UnSelect Table rows
  const onMasterCheck = (e) => {
    let tempList = [];
    // Check/ UnCheck All Items
    if (e.target.checked) {
      data.map((row) => tempList.push(row.id));
      setCheckboxes(tempList);
    } else {
      setCheckboxes(tempList);
    }
    //Update State
    setMasterChecked(e.target.checked);
  };

  return (
    <div className={styles.fullPage}>
      <div className={styles.tableOptions}>
        <Button gray>Actions <i className="bi bi-chevron-down"></i></Button>
        <div className={styles.tableOption}>
          <Button gray><i className="bi bi-funnel"></i> Filter</Button>
          <SearchField placeholder="Search..."></SearchField>
          <Button blue onClick={createMethod}>{createTitle}</Button>
        </div>
      </div>
      <table className={`${styles.fulltable}`}>
        <thead>
          <tr className={`${styles.header}`}>
            <th>
              <Checkbox
                type="checkbox"
                id="masterCheckbox"
                onChange={(e) => onMasterCheck(e)}
                checked={MasterChecked}
              ></Checkbox>
            </th>
            {headers.map((head) => (
              <th key={head.id}>{head.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((rowdata) => (
            <tr key={rowdata.id} className={styles.rowData} >
              <td>
                <Checkbox
                  type="checkbox"
                  id={rowdata.name}
                  onChange={() => onItemCheck(rowdata.id)}
                  checked={checkboxes.includes(rowdata.id)}
                ></Checkbox>
              </td>
              {headers.map((head) => (
                <td key={head.id} onClick={() => onRowClick(rowdata)}>
                  {head.cell_style && head.cell_style(rowdata[head.accessor])}
                  {!head.cell_style && rowdata[head.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.underTable}>
        <div className={styles.pages}>
                <button className={styles.nextButton}><i className="bi bi-chevron-left"></i></button>
                <button className={styles.pageButton}>1</button>
                <button className={styles.pageButton}>2</button>
                <button className={styles.pageButton}>...</button>
                <button className={styles.pageButton}>10</button>
                <button className={styles.nextButton}><i className="bi bi-chevron-right"></i></button>
        </div>
      </div>
      <div className={styles.footer}><i className="bi bi-life-preserver"></i> Need Help? <a href="">Learn More</a> about creating a project</div>
    </div>
  );
}

export default Table;

// Example of the header format to pass into props
// const headers = [
//     {
//         id: 0,
//         name: "Project",
//         accessor: "project",
//         enabled: true,
//     },
//     {
//         id: 1,
//         name: "Status",
//         accessor: "status",
//         enabled: true,
//     },
//     {
//         id: 2,
//         name: "Responses",
//         accessor: "responses",
//         enabled: true,
//     },
//     {
//         id: 3,
//         name: "Owner",
//         accessor: "owner",
//         enabled: true,
//     },
//     {
//         id: 4,
//         name: "Created",
//         accessor: "created_at",
//         enabled: true,
//     },
//     {
//         id: 5,
//         name: "Modified",
//         accessor: "updated_at",
//         enabled: true,
//     },
// ]
