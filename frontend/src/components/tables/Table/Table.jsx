import Button from "components/buttons/Button/Button";
import Checkbox from "components/inputs/input_fields/CheckboxAnimated/Checkbox";
import { SearchField } from "components/inputs/input_fields/SearchField/SearchField";
import React, { useRef, useState, useEffect } from "react";
import styles from "./Table.module.scss";

function Table({
  initHeaders,
  createTitle,
  createMethod,
  data,
  onRowClick,
  setPageNumber,
  pageNumber,
  bottomLeft,
  bottomRight,
}) {
  //if they dont have any data yet display no data page
  if (data.length === 0) {
    return <div>No Data</div>;
  }
  let array = [];
  data.map((row) => array.push({ id: row.id, checked: false }));
  //set headers

  // const [page, setPage] = useState(pageNumber);
  // eslint-disable-next-line no-unused-vars
  const [headers, setHeaders] = useState(initHeaders);
  const [editHeaders, setEditHeaders] = useState(false);
  // eslint-disable-next-line no-unused-vars
  // const [rows, setRows] = useState(data);
  const [checkboxes, setCheckboxes] = useState([]);
  const [MasterChecked, setMasterChecked] = useState(false);
  // console.log(data);
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
  const ref = useRef();
  //handling the clicking outside of elements
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setEditHeaders(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

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

  function nextPage() {
    // let newPage = page + 1;
    // setPage(newPage);

    setPageNumber(1);
    // let tempList = [...checkboxes];
    // setCheckboxes(tempList);
    // setRows(data);
  }
  function previousPage() {
    // let newPage = pageNumber - 1;
    // setPage(page - 1);
    setPageNumber(-1);
    // setRows(data);
  }

  function handleEditHeader(head) {
    let tempList = [...headers];
    if (tempList.includes(head)) {
      //remove from list
      var index = tempList.indexOf(head);
      // console.log(index);
      tempList.splice(index, 1);
      setHeaders(tempList);
    } else {
      //add to list
      // tempList.push(head);
      tempList.splice(head.index, 0, head);
      setHeaders(tempList);
    }
  }
  console.log(headers);
  return (
    <div className={styles.fullPage}>
      <div className={styles.tableOptions}>
        <Button gray>
          Actions <i className="bi bi-chevron-down"></i>
        </Button>
        <div className={styles.tableOption}>
          <Button gray>
            <i className="bi bi-funnel"></i> Filter
          </Button>
          <SearchField
            placeholder="Search..."
            searchType={"project"}
          ></SearchField>
          <Button blue onClick={createMethod}>
            {createTitle}
          </Button>
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
            <th ref={ref}>
              <i
                className="bi bi-three-dots-vertical"
                onClick={() => setEditHeaders(!editHeaders)}
              ></i>
              {editHeaders && (
                <div className={styles.editHeaders}>
                  {initHeaders.map((head) => (
                    <div className={styles.editableHeader} key={head.id}>
                      <Checkbox checked={headers.includes(head)} onChange={() => handleEditHeader(head)}></Checkbox>
                      <div>{head.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((rowdata) => (
            <tr key={rowdata.id} className={styles.rowData}>
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
                  {head.objectAccessor && rowdata[head.accessor][head.objectAccessor]}
                  {head.cell_style && !head.objectAccessor && head.cell_style(rowdata[head.accessor])}
                  {!head.cell_style && !head.objectAccessor && rowdata[head.accessor]}
                </td>
              ))}
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.underTable}>
        {bottomLeft && (bottomLeft)}
        <div className={styles.pages}>
        {bottomRight && (bottomRight)}
          <button className={styles.nextButton} onClick={() => previousPage()}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className={styles.pageButton}>{pageNumber}</button>
          <button className={styles.pageButton}>...</button>
          <button className={styles.pageButton}>10</button>
          <button className={styles.nextButton} onClick={() => nextPage()}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
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
