import React from "react";
import AccordionItem from "./AccordionItem";
import styles from "./SettingsAccordion.module.scss";

export const SettingsAccordion = ({ item }) => {
  return (
    <div className={styles.accordion}>
      <AccordionItem item={item} title="Data Labels"></AccordionItem>
      <AccordionItem item={item} title="Title"></AccordionItem>
      <AccordionItem item={item} title="Legend"></AccordionItem>
    </div>
  );
};
