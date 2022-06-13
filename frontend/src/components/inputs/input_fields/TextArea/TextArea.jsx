import React, { useState } from "react";

import styles from "./TextArea.module.scss";

export const TextArea = ({ value, placeholder, onSave, autosave, active, disabled }) => {
  const [val, setVal] = useState(value);

  const saveTimer = null;

  // TODO: add a save timer while focusing on the input
  const handleChange = (event) => {
    setVal(event.target.value);
    clearTimeout(saveTimer);
    setTimeout(onSave(event.target.value), 7000);
  };

  // TODO: call onSave method when user leaves the input
  const handleFocusOut = (event) => {
    if (autosave) {
      console.log(`saving... val = ${event.target.value}`);
      onSave(event.target.value);
    }
  };

  return (
    <textarea
      className={`${styles.textarea} ${active && styles.active} ${disabled && styles.disabled}`}
      type="text"
      value={val}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleFocusOut}
      disabled={disabled}
    />
  );
};