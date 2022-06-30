import React, { useState } from "react";
import styles from "./NumberInput.module.scss";

export const NumberInput = ({ startNumber, handleNumberChange }) => {
  const [number, setNumber] = useState(startNumber)

  const handleChange = (value) => {
    setNumber(value);
    if (handleNumberChange) {
      handleNumberChange(number);
    }
  };

  return (
    <div className={styles.numberbox}>
        <input type="number" value={number} onChange={(e) => handleChange(e.target.value)} min={0}/>
    </div>
  );
};
