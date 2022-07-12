import React, { useState } from "react";
// import React from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  useFilters,
  usePagination,
} from "react-table";
import SearchFilter from "components/SearchFilter/SearchFilter";
// import { Link } from "react-router-dom";
import styles from "./Table.module.scss";
import { useNavigate } from "react-router-dom";
import FilterMenu from "components/FilterMenu/FilterMenu.jsx";
import DropdownMenu from "components/FilterMenu/DropdownMenu.jsx";
// import ActionButton from "../ActionButton/ActionButton.jsx";
import Button from "components/buttons/Button/Button.jsx";
import BulkActionButton from "components/buttons/BulkActionButton/BulkActionButton.jsx";
import { Accordion } from "components/layouts";
import { AccordionItem } from "components/layouts";
import Select from "react-select";
import ActionDropdown from "components/buttons/BulkActionButton/ActionDropdown";
import Checkbox from "components/inputs/input_fields/CheckboxAnimated/Checkbox";
// import Checkbox from "components/Checkbox/Checkbox.jsx";

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

// let setHiddenColumns = ["Project", "Modified"]

export const MultipleFilter = (rows, filler, filterValue) => {
  const arr = [];
  rows.forEach((val) => {
    let header = filler[0];
    if (filterValue.includes(val.original[header])) arr.push(val);
  });
  return arr;
};

function setFilteredParams(filterArr, val) {
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
              checked={filterValue.includes(option) ? true : false}
            ></input>
            {/* <Checkbox
              id={option}
              name={option}
              value={option}
              onChange={(e) => {
                setFilter(setFilteredParams(filterValue, e.target.value));
              }}
              checked={filterValue.includes(option) ? true : false}
            ></Checkbox> */}
            <label
              htmlFor={option}
              className="ml-1.5 font-medium text-gray-700"
            >
              {checkDate(option)}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export const ReactTable = ({
  columns,
  data,
  buttonMethod,
  modalTitle,
  deleteSelected
}) => {
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

  // Use the state and functions returned from useTable to build UI
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
    allColumns,
  } = useTable(
    {
      initialState: { pageIndex: 0 },
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const [List, setList] = useState(page);
  const [MasterChecked, setMasterChecked] = useState(false);
  // eslint-disable-next-line
  const [selectedList, setSelectedList] = useState([]);

  // Select/ UnSelect Table rows
  const onMasterCheck = (e) => {
    let tempList = page;
    // console.log(tempList);
    // Check/ UnCheck All Items
    tempList.map((row) => (row.selected = e.target.checked));

    //Update State
    setList(tempList);
    setMasterChecked(e.target.checked);
    setSelectedList(page.filter((e) => e.selected));
    console.log(selectedList);
    // this.setState({
    //   MasterChecked: e.target.checked,
    //   List: tempList,
    //   SelectedList: this.state.List.filter((e) => e.selected),
    // });
  };

  //Manually uncheck all
  function nextPageUncheck() {
    let tempList = page;
    // console.log(tempList);
    // Check/ UnCheck All Items
    tempList.map((row) => (row.selected = false));

    //Update State
    setList(tempList);
    setMasterChecked(false);
    setSelectedList([]);
  }
  // Update List Item's state and Master Checkbox State
  const onItemCheck = (e, item) => {
    let tempList = page;
    tempList.map((row) => {
      if (row.id === item.id) {
        row.selected = e.target.checked;
      }
      return row;
    });

    //To Control Master Checkbox State
    const totalItems = List.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    // Update State
    setList(tempList);
    setMasterChecked(totalItems === totalCheckedItems);
    setSelectedList(tempList.filter((e) => e.selected));
  };

  // Render the UI for your table
  return (
    <div>
      <div className={styles.topcontainer}>
        {/* {actions} */}
        {/* <Buttons onClick={()=> deleteSelected(selectedList)}>Delete Selected</Button> */}
        <BulkActionButton>
          <ActionDropdown>
            <span  onClick={()=> deleteSelected(selectedList)} className={styles.actionitem} >
              Delete Selected
            </span>
            <span className={styles.actionitem}>
              Change Owners 
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
                  {allColumns.map((column) =>
                    column.Filter ? (
                      <div key={column.id}>
                        {/* {console.log(column)} */}
                        <AccordionItem
                          key={column.id}
                          body={column.render("Filter")}
                          column={column}
                          checkbox={
                            <Checkbox
                              type="checkbox"
                              className={styles.accordioncheckbox}
                              {...column.getToggleHiddenProps()}
                            />
                          }
                        ></AccordionItem>
                      </div>
                    ) : null
                  )}
                </div>
              </Accordion>
            </DropdownMenu>
          </FilterMenu>
          <Button onClick={buttonMethod}>{modalTitle}</Button>
        </div>
      </div>
      <table className={`${styles.fulltable}`} {...getTableProps()} border="1">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className={`${styles.header}`}
              key={headerGroup.id}
              {...headerGroup.getHeaderGroupProps()}
            >
              <th>
                <Checkbox
                  type="checkbox"
                  className={styles.headercheckbox}
                  id="selectAll"
                  // onChange={handleChange}
                  // checked={checkList.length === page.length}
                  onChange={(e) => onMasterCheck(e)}
                  checked={MasterChecked}
                />
              </th>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={styles.th}
                >
                  <span>
                    {column.render("Header")}{" "}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="bi bi-chevron-down"></i>
                      ) : (
                        <i className="bi bi-chevron-up"></i>
                      )
                    ) : (
                      "-"
                    )}
                  </span>

                  {/* Add a sort direction indicator */}
                </th>
              ))}
              <th></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                className={styles.tbodyrow}
                key={row.id}
                {...row.getRowProps()}
              >
                <td className={styles.tabledimension}>
                  <Checkbox
                    className={styles.checkbox}
                    type="checkbox"
                    id={row.id}
                    // onChange={handleChange}
                    // checked={checkList.includes(row)}
                    onChange={(e) => onItemCheck(e, row)}
                    checked={row.selected}
                  />
                  {/* {console.log(row.original.id)} */}
                </td>
                {row.cells.map((cell) => {
                  return (
                    <td
                      onClick={() => routeChange(row.original.id.toString())}
                      key={row.original.id.toString()}
                      {...cell.getCellProps()}
                      className={styles.td}
                    >
                      {!isNaN(cell.value)
                        ? checkDate(cell.value)
                        : cell.render("Cell")}
                    </td>
                  );
                })}
                <td className={styles.editDots}>
                  <i className="bi bi-three-dots-vertical"></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button
          onClick={() => {
            previousPage();
            nextPageUncheck();
            // setList(page);
            // setCheckList(page);
          }}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          onClick={() => {
            // setCheckList(page);
            nextPage();
            nextPageUncheck();
            // setList(page);
            // setCheckList(page);
            // console.log(checkList);
          }}
          disabled={!canNextPage}
        >
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <select
          value={state.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 15].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ReactTable;

//eslint-disable-next-line
