import React, { useState } from "react";
import styles from "./Accordion.module.scss";

//custom accordian
export const AccordionItem = ({ body, column, checkbox }) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility((v) => !v);
  };

  return (
    <div
      className={`${styles.card} ${visibility ? styles.accordionactive : ""}`}
    >
      <div className={styles.cardcontainer}>
        {checkbox}
        <div className={styles.cardheader} onClick={toggleVisibility}>
          <span>{column.Header}</span>
          <span className={styles.accordionicon}>
            <i className="bi bi-chevron-left"></i>
          </span>
        </div>
      </div>
      <div className={styles.cardbody}>{body}</div>
    </div>
  );
};

