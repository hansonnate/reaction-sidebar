import React from "react";
import styles from "./Checkbox.module.scss";

const Checkbox = ({functionality}) => {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" {...functionality} />
      <span className={styles.checkmark}></span>
    </label>
  );
}

export default Checkbox;
