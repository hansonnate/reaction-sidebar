import React from "react";
// import AccordionItem from "./AccordionItem";
import styles from "./UGAccordion.module.scss";

export const UGAccordion = ({children}) => {

    // eslint-disable-next-line


  return (
    <div
      className={styles.accordion}
    >
      {/* {console.log(value)} */}
      {/* {value.map((item) => (
        <div key={item.name}> */}
          {children}
          {/* <AccordionItem item={item} ></AccordionItem> */}
        {/* </div>
      ))} */}
    </div>
  );
};
