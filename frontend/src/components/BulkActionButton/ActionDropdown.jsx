import React from "react";
import styles from "./BulkActionButton.module.scss";

function ActionDropdown(props) {

  return (
    <div className={styles.dropdown}>
      {props.children}
    </div>
  );
}
export default ActionDropdown;
