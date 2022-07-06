import React, { useState } from "react";
import styles from "./TextField.module.scss";

export const TextField = ({
  value,
  placeholder,
  label,
  onSave,
  disabled,
  inactive,
  align = "left",
  customStyles,
}) => {
  const [val, setVal] = useState(value);

  const handleChange = (event) => {
    setVal(event.target.value);
    if (onSave) {
      onSave(event.target.value);
    }
  };

  const handleFocusOut = (event) => {
    if (onSave) {
      onSave(event.target.value);
    }
  };

  return (
    <input type="text"></input>
  );
};
