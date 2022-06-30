import React, { useState } from "react";
import styles from "./ToggleSwitch.module.scss";

export const ToggleSwitch = ({ startChecked, handleCheck, id }) => {
  const [isChecked, setIsChecked] = useState(startChecked);

  const handleChange = () => {
    setIsChecked(!isChecked);
    if (handleCheck) {
      handleCheck(isChecked);
    }
  };

  return (
    <div>
      <label className={styles.switch}>
        <input type="checkbox" checked={isChecked} onChange={handleChange} id={id}/>
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
