import React from "react";
import styles from "./BulkActionButton.module.scss";
// import ActionDropdown from "./ActionDropdown.jsx";

function BulkActionButton({ title, functionality, body }) {
  return (
    <div className={styles.mainbutton}>
      <button onClick={functionality}>
        {title}
        {body}{" "}
        <i className="bi bi-chevron-down"></i>
        {/* <ActionDropdown>This is a dropdown</ActionDropdown> */}
      </button>
    </div>
  );
}

export default BulkActionButton;
