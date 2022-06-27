import React, { useState } from "react";
import _ from "lodash";
import styles from "./NumChoices.module.scss";

export const NumChoices = ({ min, max, step, onChange }) => {
  const [active, setActive] = useState(min);
  const range = _.range(min, max + 1, step);

  const handleChange = (value) => {
    setActive(value);
    if (onChange) {
        onChange(value);
    }
  };

  return (
    <div className={styles.itemContainer}>
      {range.map((value, index) => {
        return (
          <div
            key={index}
            className={`${styles.item} ${value == active && styles.active}`}
            onClick={handleChange.bind(null, value)}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
};
