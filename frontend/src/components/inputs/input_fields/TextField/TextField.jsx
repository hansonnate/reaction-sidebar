import React, { useState } from "react";

import styles from "./TextField.module.scss";

export const TextField = ({ value, placeholder, autosave, disabled }) => {
  const [val, setVal] = useState(value);

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  const handleFocusOut = (event) => {
    if (autosave) {
      console.log(`Auto-saving... val = ${event.target.value}`);
    }
  };

  return (
    <input
      className={`${styles.textField} ${disabled && styles.disabled}`}
      type="text"
      value={val}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleFocusOut}
      disabled={disabled}
    />
  );
};
