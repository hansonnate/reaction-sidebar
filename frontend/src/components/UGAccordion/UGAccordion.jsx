import React from "react";
import AccordionItem from "./AccordionItem";
import styles from "./UGAccordion.module.scss";

export const UGAccordion = ({ data }) => {

  return (
    <div
      className={styles.accordion}
    >
      {" "}
      {data.map((item) => (
        <div key={item.name}>
          <AccordionItem item={item}></AccordionItem>
        </div>
      ))}
    </div>
  );
};
