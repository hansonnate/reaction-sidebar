import React from "react";
import styles from "./TextField.module.scss";

export function TextFieldSimple({ onChange, value, placeholder }) {

  function handleOnChange(e) {
    onChange(e);
  }

  return (
    <input type="text" onChange={handleOnChange} className={styles.textField} value={value} placeholder={placeholder}>
      
    </input>
  );
}

