import React, { useState, useEffect } from "react";
// import React from "react";
import { useTable, useGlobalFilter, useSortBy, useFilters, usePagination } from "react-table";
import SearchFilter from "../SearchFilter/SearchFilter.jsx";
// import { Link } from "react-router-dom";
import styles from "./Table.module.scss";
import { useNavigate } from "react-router-dom";
import FilterMenu from "../FilterMenu/FilterMenu.jsx";
import DropdownMenu from "../FilterMenu/DropdownMenu.jsx";
import ActionButton from "../ActionButton/ActionButton.jsx";
import BulkActionButton from "../BulkActionButton/BulkActionButton.jsx";
import Accordion from "../Accordion/Accordion.jsx";
import Select from "react-select";
import ActionDropdown from "../BulkActionButton/ActionDropdown.jsx";

export const MultipleFilter = (rows, filler, filterValue) => {
  const arr = [];
  rows.forEach((val) => {
    console.log(filterValue);
    let header = filler[0];
    if (filterValue.includes(val.original[header])) arr.push(val);
    console.log(filler);
    console.log(val);
  });
  //   console.log(arr);
  return arr;
};

function setFilteredParams(filterArr, val) {
  //   console.log(filterArr);
  //   console.log(val);
  // if (val === undefined) return undefined;
  if (filterArr.includes(val)) {
    filterArr = filterArr.filter((n) => {
      return n !== val;
    });
  } else filterArr.push(val);

  if (filterArr.length === 0) filterArr = undefined;
  return filterArr;
}

// Define a default UI for filtering
export function SelectColumnFilter({
  column: { filterValue = [], setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    //Code for select box if it is wanted
    // <select
    //   name={id}
    //   id={id}
    //   value={filterValue}
    //   onChange={(e) => {
    //     setFilter(e.target.value || undefined);
    //   }}
    // >
    //   <option value="">All</option>
    //   {options.map((option, i) => (
    //     <option key={i} value={option}>
    //       {option}
    //     </option>
    //   ))}
    // </select>

    //Filter checkkboxes
    <div>
      {options.map((option) => {
        return (
          <div key={option} className="flex items-center">
            {console.log(filterValue)}
            <input
              type="checkbox"
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              id={option}
              name={option}
              value={option}
              onChange={(e) => {
                setFilter(setFilteredParams(filterValue, e.target.value));
                // setFilter(e.target.value || undefined);
              }}
            ></input>
            <label
              htmlFor={option}
              className="ml-1.5 font-medium text-gray-700"
            >
              {option}
            </label>
          </div>
        );
      })}
    </div>
  );
}

//custom accordian
const AccordionItem = ({ name, body }) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility((v) => !v);
  };
  return (
    <div
      className={`${styles.card} ${visibility ? styles.accordionactive : ""}`}
    >
      <div className={styles.cardheader} onClick={toggleVisibility}>
        {name}
        <span className={styles.accordionicon}>
          <i className="bi bi-chevron-left"></i>
        </span>
      </div>
      <div className={styles.cardbody}>{body}</div>
    </div>
  );
};

function ReactTable({ columns, data, buttonMethod }) {
  //dropdown menu views
  const isDisabled = false;
  const isLoading = false;
  const isSearchable = true;
  const isClearable = true;
  const isRtl = false;
  const options = [
    { value: "view1", label: "View 1" },
    { value: "view2", label: "View 2" },
    { value: "view3", label: "View 3" },
  ];

  // Use the state and functions returned from useTable to build your UI
  let navigate = useNavigate();
  const routeChange = (path) => {
    // console.log(path);
    navigate(path);
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  //   const [isSelected, select] = useState();
  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
    setCheckList(rows);
  }, []);

  const handleChange = (e) => {
    const { id, checked } = e.target;
    if (id === "selectAll") {
      let tempList = checkList.map((row) => {
        return { ...row, isChecked: checked };
      });
      setCheckList(tempList);
      console.log(checkList);
    } else {
      let tempList = checkList.map((row) =>
        row.id === id ? { ...row, isChecked: checked } : row
      );
      setCheckList(tempList);
      console.log(checkList);
    }
  };

  //Date calculations
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  function checkDate(value) {
    if (value > 100000000000) {
      const date = new Date(value); //new Intl.DateTimeFormat('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(value)
      return (
        monthNames[date.getMonth()] +
        " " +
        date.getDate() +
        ", " +
        date.getFullYear()
      );
    } else {
      return value;
    }
  }
  //   let currentTimestamp = Date.now()
  //   console.log(currentTimestamp);
  //   let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
  //   console.log(date);

  // Render the UI for your table
  return (
    <div>
      <div className={styles.topcontainer}>
        <BulkActionButton>
          <ActionDropdown>
            <span className={styles.actionitem}>
              Delete Selected <i className="bi bi-trash"></i>
            </span>
            <span className={styles.actionitem}>
              Change Owners <i className="bi bi-person"></i>
            </span>
          </ActionDropdown>
        </BulkActionButton>
        <div className={styles.searchfilter}>
          <SearchFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <FilterMenu>
            {/* {console.log(data)} */}
            <DropdownMenu data={data}>
              <div className={styles.heading}>
                <span className={styles.header}>Filters</span>
                <span className={styles.saveview}>Save view</span>
              </div>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={options[0]}
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                isSearchable={isSearchable}
                name="color"
                options={options}
              />
              <Accordion>
                <div className={styles.customaccordion}>
                  {" "}
                  {headerGroups.map((headerGroup) =>
                    headerGroup.headers.map((column) =>
                      column.Filter ? (
                        <AccordionItem
                          key={column.id}
                          body={column.render("Filter")}
                          name={column.render("Header")}
                        >
                          {/* <label htmlFor={column.id}>
                        {column.render("Header")}:{" "}
                      </label> */}
                          {/* {column.render("Filter")} */}
                        </AccordionItem>
                      ) : null
                    )
                  )}
                </div>
              </Accordion>
            </DropdownMenu>
          </FilterMenu>
          <ActionButton
            title="New Project"
            functionality={buttonMethod}
          ></ActionButton>
        </div>
      </div>
      <table className={`${styles.fulltable}`} {...getTableProps()} border="1">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className={`${styles.header}`}
              key="thing"
              {...headerGroup.getHeaderGroupProps()}
            >
              <th>
                <input
                  type="checkbox"
                  className={styles.headercheckbox}
                  id="selectAll"
                  onChange={handleChange}
                  checked={!checkList.some((row) => row?.isChecked !== true)}
                ></input>
              </th>
              {headerGroup.headers.map((column) => (
                <th
                  key="thing"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " ↓"
                        : " ↑"
                      : " -"}
                  </span>
                </th>
              ))}
              <th></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr className="tbodyrow" key={i} {...row.getRowProps()}>
                <td className={styles.tabledimension}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    id={row.index}
                    onChange={handleChange}
                    checked={checkList[row.index]?.isChecked || false}
                  ></input>
                </td>
                {row.cells.map((cell) => {
                  return (
                    <td
                      onClick={() => routeChange(row.original.name)}
                      key={i}
                      {...cell.getCellProps()}
                    >
                      {/* {cell.render("Cell")} */}
                      {!isNaN(cell.value)
                        ? checkDate(cell.value)
                        : cell.render("Cell")}
                    </td>
                  );
                })}
                <td>
                  <i className="bi bi-three-dots-vertical"></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={state.pageSize}
          onChange={e => {
              setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20].map(pageSize => (
              <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ReactTable;

//eslint-disable-next-line
