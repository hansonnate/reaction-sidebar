import React, { useState } from "react";
import styles from "./Accordion.module.scss";

//custom accordian
const AccordionItem = ({ name, body }) => {
    const [visibility, setVisibility] = useState(false);
  
    const toggleVisibility = () => {
      setVisibility((v) => !v);
    };
    return (
      <div
        className={`${styles.card} ${visibility ? styles.accordionactive : ""}`}
      >
        <div className={styles.cardheader} onClick={toggleVisibility}>
          {name}
          <span className={styles.accordionicon}>
            <i className="bi bi-chevron-left"></i>
          </span>
        </div>
        <div className={styles.cardbody}>{body}</div>
      </div>
    );
  };

  export default AccordionItem;