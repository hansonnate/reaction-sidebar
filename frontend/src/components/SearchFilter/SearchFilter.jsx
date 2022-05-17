import React from "react";
import { useAsyncDebounce } from 'react-table';
import styles from "./SearchFilter.module.scss"

// Define a default UI for filtering
function SearchFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <div className={styles.searchbar}>
      {/* <i className="bi bi-search"></i> */}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </div>
  )
}

export default SearchFilter;