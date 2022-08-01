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
  maxPage,
}) {
  //if they dont have any data yet display no data page
  let array = [];
  if (data.length === 0) {
    //no d
    data.push({
      id: "0",
      organization_id: "0684348415",
      name: "NONE",
      description: "This is project 1",
      created_at: "NONE",
      updated_at: "NONE",
      status: "Closed",
      responses: 3,
      owner: "NONE",
      default_language: "en",
      supported_languages: ["en", "sp"],
      accessgroup_ids: ["552224"],
    });
  }
  data.map((row) => array.push({ id: row.id, checked: false }));
  //set headers
  // eslint-disable-next-line no-unused-vars
  const [currPage, setCurrPage] = useState(pageNumber);
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(pageNumber);
  // eslint-disable-next-line no-unused-vars
  const [page2, setPage2] = useState(
    pageNumber + 1 > maxPage ? null : pageNumber + 1
  );
  // eslint-disable-next-line no-unused-vars
  const [page3, setPage3] = useState(
    pageNumber + 2 > maxPage ? null : pageNumber + 2
  );
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
    if (currPage === maxPage) {
      //do nothing
    } else {
      if (currPage === page3) {
        setPage(page3 + 1);
        setPage2(page3 + 2 > maxPage ? null : page3 + 2);
        setPage3(page3 + 3 > maxPage ? null : page3 + 3);
      }
      setPageNumber(currPage + 1);
      setCurrPage(currPage + 1);
    }
  }
  function previousPage(pageNum) {
    if (currPage === 1) {
      //do nothing
    } else {
      if (pageNum === currPage) {
        if (currPage === page) {
          console.log(page);
          console.log(page2);
          console.log(page3);
          setPage(page - 3);
          setPage2(page - 2 > maxPage ? null : page - 2);
          setPage3(page - 1 > maxPage ? null : page - 1);
        }
        setPageNumber(currPage - 1);
        setCurrPage(currPage - 1);
      }
    }
  }
  function onPageClick(pageNum) {
    if (pageNum === currPage) {
      if (currPage === page3) {
        setPage(page3 + 1);
        setPage2(page3 + 2 > maxPage ? null : page3 + 2);
        setPage3(page3 + 3 > maxPage ? null : page3 + 3);
      }
      setPageNumber(currPage + 1);
      setCurrPage(currPage + 1);
    } else if (pageNum === page) {
      setCurrPage(page);
      setPageNumber(page);
    } else if (pageNum === page2) {
      setCurrPage(page2);
      setPageNumber(page2);
    } else if (pageNum === page3) {
      setCurrPage(page3);
      setPageNumber(page3);
    }
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
          {createTitle && (
            <Button blue onClick={createMethod}>
              {createTitle}
            </Button>
          )}
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
                      <Checkbox
                        checked={headers.includes(head)}
                        onChange={() => handleEditHeader(head)}
                      ></Checkbox>
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
                  {head.objectAccessor &&
                    rowdata[head.accessor][head.objectAccessor]}
                  {head.cell_style &&
                    !head.objectAccessor &&
                    head.cell_style(rowdata[head.accessor])}
                  {!head.cell_style &&
                    !head.objectAccessor &&
                    rowdata[head.accessor]}
                </td>
              ))}
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.underTable}>
        <div style={{ height: "100%" }}>{bottomLeft && bottomLeft}</div>
        <div className={styles.pages}>
          {bottomRight && bottomRight}
          {/* <span>1-5 of 10</span> */}
          <button
            className={styles.nextButton}
            onClick={() => previousPage(currPage)}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          {page && (
            <button
              className={`${styles.pageButton} ${
                currPage === page ? styles.currPage : ""
              }`}
              onClick={() => onPageClick(page)}
            >
              {page}
            </button>
          )}
          {page2 && (
            <button
              className={`${styles.pageButton} ${
                currPage === page2 ? styles.currPage : ""
              }`}
              onClick={() => onPageClick(page2)}
            >
              {page2}
            </button>
          )}
          {page3 && (
            <button
              className={`${styles.pageButton} ${
                currPage === page3 ? styles.currPage : ""
              }`}
              onClick={() => onPageClick(page3)}
            >
              {page3}
            </button>
          )}
          <a>...</a>
          <button
            className={styles.pageButton}
            onClick={() => onPageClick(maxPage)}
          >
            {maxPage}
          </button>
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
