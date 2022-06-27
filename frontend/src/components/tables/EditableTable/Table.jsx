import React, {useMemo} from "react";
import clsx from "clsx";
import {useTable, useFlexLayout, useResizeColumns, useSortBy} from "react-table";
import Cell from "./Cell";
import Header from "./Header";
import PlusIcon from "./img/Plus";
import styles from "./Table.module.scss"

const defaultColumn = {
  minWidth: 50,
  width: 150,
  maxWidth: 400,
  Cell: Cell,
  Header: Header,
  sortType: "alphanumericFalsyLast"
};

export default function Table({columns, data, dispatch: dataDispatch, skipReset}) {
  const sortTypes = useMemo(
    () => ({
      alphanumericFalsyLast(rowA, rowB, columnId, desc) {
        if (!rowA.values[columnId] && !rowB.values[columnId]) {
          return 0;
        }

        if (!rowA.values[columnId]) {
          return desc ? -1 : 1;
        }

        if (!rowB.values[columnId]) {
          return desc ? 1 : -1;
        }

        return isNaN(rowA.values[columnId])
          ? rowA.values[columnId].localeCompare(rowB.values[columnId])
          : rowA.values[columnId] - rowB.values[columnId];
      }
    }),
    []
  );

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable(
    {
      columns,
      data,
      defaultColumn,
      dataDispatch,
      autoResetSortBy: !skipReset,
      autoResetFilters: !skipReset,
      autoResetRowState: !skipReset,
      sortTypes
    },
    useFlexLayout,
    useResizeColumns,
    useSortBy
  );

  function isTableResizing() {
    for (let headerGroup of headerGroups) {
      for (let column of headerGroup.headers) {
        if (column.isResizing) {
          return true;
        }
      }
    }

    return false;
  }

  return (
    <>
      <div {...getTableProps()} className={clsx(styles.table, isTableResizing() && styles.noselect)}>
        <div>
          {headerGroups.map((headerGroup, i) => (
            <div {...headerGroup.getHeaderGroupProps()}  key={i} className={styles.firstrow}>
              {headerGroup.headers.map((column) => column.render("Header"))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className={styles.tablebody}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} key={i} className={styles.tr}>
                {row.cells.map((cell) => (
                  <div {...cell.getCellProps()} key={i} className={styles.td}>
                    {cell.render("Cell")}
                  </div>
                ))}
              </div>
            );
          })}
          <div className={`${styles.tr} ${styles.add_row}`} onClick={() => dataDispatch({type: "add_row"})}>
            <span className={`${styles.svg_icon} ${styles.svg_gray}`} style={{marginRight: 4}}>
              <PlusIcon />
            </span>
            New
          </div>
        </div>
      </div>
    </>
  );
}
