import React from "react";
// import AccordionItem from "./Settings/AccordionItem";
import { DataLabelSettings } from "./Settings/DataLabelSettings";
import { LegendSettings } from "./Settings/LegendSettings";
import { TitleSettings } from "./Settings/TitleSettings";
import { DataSettings } from "./Settings/DataSettings";
import styles from "./SettingsAccordion.module.scss";

export const SettingsAccordion = ({ item, questions, index, handleChartData}) => {
  return (
    <div className={styles.accordion}>
      <DataSettings item={item} title="Data Analysis" questions={questions} index={index} handleChartData={handleChartData}></DataSettings>
      <DataLabelSettings item={item} title="Data Labels"></DataLabelSettings>
      <TitleSettings item={item} title="Title"></TitleSettings>
      <LegendSettings item={item} title="Legend"></LegendSettings>
    </div>
  );
};
