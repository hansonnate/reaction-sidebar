import React, {useState} from "react";
// import React from "react";
import { useTable } from "react-table";
// import { Link } from "react-router-dom";
import styles from "./EditableTable.module.scss";
import { useNavigate } from "react-router-dom";

//Date calculations
// var monthNames = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];
// function checkDate(value) {
//   if (value > 100000000000) {
//     const date = new Date(value); //new Intl.DateTimeFormat('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(value)
//     return (
//       monthNames[date.getMonth()] +
//       " " +
//       date.getDate() +
//       ", " +
//       date.getFullYear()
//     );
//   } else {
//     return value;
//   }
// }
// const initialContact = {
//   email: '',
//   firstname: '',
//   lastname: '',
//   locale: '',
//   company: '',
// }
// let data=[];



function ReactTable({ columns }) {
  const [data, setInfo] = useState([]);
  const handleChange = (e) => {
    let tempData = data;
    tempData.push(e.target.value);
    setInfo(tempData);
  }
  const handleNewRow = () => {
    console.log(data);
  }
  // Use the state and functions returned from useTable to build your UI
  let navigate = useNavigate();
  const routeChange = (path) => {
    // console.log(path);
    navigate(path);
  };
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <div>
      <table className={`${styles.fulltable}`} {...getTableProps()} border="1">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className={`${styles.header}`}
              key="thing"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th key="thing" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
              <th><button>+ Add Field</button></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr className="tbodyrow" key={i} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      onClick={() => routeChange(row.original.name)}
                      key={i}
                      {...cell.getCellProps()}
                    >
                      <input defaultValue={cell.value}></input>
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {/* add contact */}
          {headerGroups.map((headerGroup, i) => (
            <tr
              key="thing"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <td key="thing" {...column.getHeaderProps()}>
                  <input key={i + "input"} id={i} placeholder={column.render("Header")} className={styles.addInputBox} onChange={(e)=>handleChange(e)}></input>
                  
                </td>
              ))}
              <td><button className={styles.newrow} onClick={handleNewRow()}>New Row</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReactTable;

//eslint-disable-next-line
