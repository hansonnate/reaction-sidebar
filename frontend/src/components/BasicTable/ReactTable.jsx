import React, { useState } from "react";
// import React from "react";
import { useTable, useGlobalFilter, useSortBy, useFilters } from "react-table";
import SearchFilter from "../SearchFilter/SearchFilter.jsx";
// import { Link } from "react-router-dom";
import styles from "./Table.module.scss";
import { useNavigate } from "react-router-dom";
import FilterMenu from "../FilterMenu/FilterMenu.jsx";
import DropdownMenu from "../FilterMenu/DropdownMenu.jsx";

// Define a default UI for filtering
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
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

  // Render a multi-select box
  return (
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
    //testing for checkboxes
    <div>
      {console.log(filterValue)}
      {options.map((option) => {
        return (
            <div key={option}className="flex items-center">
              <input
                type="checkbox"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                id={option}
                name={option}
                value={option}
                onChange={(e) => {
                //   setFilter(setFilteredParams(filterValue, e.target.value));
                setFilter(e.target.value || undefined);
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

function ReactTable({ columns, data }) {
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
    rows,
    prepareRow,
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
    useSortBy
  );

  //   const [open, setOpen] = useState(false);

  // Render the UI for your table
  return (
    <div>
      <div className={styles.searchfilter}>
        <SearchFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <FilterMenu>
          {console.log(data)}
          <DropdownMenu data={data}>
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
          </DropdownMenu>
        </FilterMenu>
        {/* <i className="bi bi-sliders"></i> */}
      </div>
      <table className={`${styles.fulltable}`} {...getTableProps()} border="1">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className={`${styles.header}`}
              key="thing"
              {...headerGroup.getHeaderGroupProps()}
            >
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
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            // console.log(row.values.name);
            return (
              <tr
                onClick={() => routeChange(row.values.name)}
                className="tbodyrow"
                key={i}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td key={i} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReactTable;
