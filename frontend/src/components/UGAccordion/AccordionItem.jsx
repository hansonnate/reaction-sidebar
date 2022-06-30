import React, { useState } from "react";
import styles from "./UGAccordion.module.scss";

//custom accordian
const AccordionItem = ({ item }) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility((v) => !v);
  };

  

  return (
    <>
      <div
        key={item.name}
        className={`${styles.header} ${
          visibility ? styles.accordionactive : ""
        }`}
        onClick={toggleVisibility}
      >
        {item.name}
        <span className={styles.accordionicon}>
          <i className="bi bi-chevron-left"></i>
        </span>
      </div>
      {visibility && <div className={styles.body}>
        {console.log(item)}
        {Object.keys(item).map((key) => <div key={key}>
          {console.log(key)}
          <span>{item[key].toString()}</span>
        </div>)}
        </div>}
    </>
  );
};

export default AccordionItem;
