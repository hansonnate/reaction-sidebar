import React from "react";
import { SelectField } from "components/inputs";
import styles from "./VizSettings.module.scss";
import {SettingsAccordion} from "./SettingsAccordion/SettingsAccordion";
export const VizSettings = ({ item }) => {
//   const [dataLabels, setDataLabels] = useState(
//     item.design_settings.hasDataLabels
//   );
  //   const [chartType, setChartType] = useState(item.type);
  // function setDataLabels() {
  //     console.log(props.item.design_settings.hasDataLabels)
  //     props.item.design_settings.hasDataLabels = !props.item.design_settings.hasDataLabels;
  // }
  const options = [
    { value: "linechart", label: "Line Chart" },
    { value: "horizontalbarchart", label: "Horizontal Bar Chart" },
    { value: "verticalbarchart", label: "Vertical Bar Chart" },
    { value: "doughnutchart", label: "Doughnut Chart" },
  ];


  return (
    <div className={styles.settingscontainer}>
      <span className={styles.header}>Chart Design</span>
      <div className={styles.settingwithlabel}>
        <span>Chart Type</span>
        <SelectField
          defaultValue={item.type}
          onChange={(value) => {
            item.type = value;
          }}
          options={options}
        >
          {/* {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))} */}
        </SelectField>
      </div>
      <SettingsAccordion item={item}></SettingsAccordion>
    </div>
  );
};
