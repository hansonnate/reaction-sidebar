import React from "react";
import AccordionItem from "./Settings/AccordionItem";
import { DataLabelSettings } from "./Settings/DataLabelSettings";
import styles from "./SettingsAccordion.module.scss";

export const SettingsAccordion = ({ item }) => {
  return (
    <div className={styles.accordion}>
      <DataLabelSettings item={item} title="Data Labels"></DataLabelSettings>
      <AccordionItem item={item} title="Title"></AccordionItem>
      <AccordionItem item={item} title="Legend"></AccordionItem>
    </div>
  );
};
