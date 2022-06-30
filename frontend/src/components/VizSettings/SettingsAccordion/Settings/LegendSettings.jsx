import { NumberInput } from "components/inputs/input_fields/NumberInput/NumberInput";
import { ToggleSwitch } from "components/inputs/input_fields/ToggleSwitch/ToggleSwitch";
import { SelectField } from "components/inputs";
import React, { useState } from "react";
import styles from "../SettingsAccordion.module.scss";

//custom accordian
export const LegendSettings = ({ item, title }) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility((v) => !v);
  };
  const legendFontSize = (value) => {
    item.design_settings.legendFontSize = value;
  };

  const handleHasLegend = () => {
    item.design_settings.hasLegend = !item.design_settings.hasLegend;
  };
  const handleLegendPointStyle = () => {
    item.design_settings.legendPointStyle = !item.design_settings.legendPointStyle;
  };

  const positionOptions = [
    { value: "top", label: "Top" },
    { value: "center", label: "Center" },
    { value: "bottom", label: "Bottom" },
  ];
  // const alignmentOptions = [
  //   { value: "right", label: "Right" },
  //   { value: "center", label: "Center" },
  //   { value: "left", label: "Left" },
  // ];

  return (
    <>
      <div
        key={item.name}
        className={`${styles.header} ${
          visibility ? styles.accordionactive : ""
        }`}
        onClick={toggleVisibility}
      >
        {title}
        <span className={styles.accordionicon}>
          <i className="bi bi-chevron-left"></i>
        </span>
      </div>
      {visibility && (
        <div className={styles.body}>
          <div className={styles.setting}>
            <span>Legend</span>
            <ToggleSwitch
              startChecked={item.design_settings.hasLegend}
              handleCheck={handleHasLegend}
            ></ToggleSwitch>
          </div>
          <div className={styles.setting}>
            <span>Use Points</span>
            <ToggleSwitch
              startChecked={item.design_settings.legendPointStyle}
              handleCheck={handleLegendPointStyle}
            ></ToggleSwitch>
          </div>
          <div className={styles.settingwithlabel}>
            <span>Position</span>
            <SelectField
              onChange={(value) => {
                item.design_settings.legendPosition = value;
              }}
              options={positionOptions}
            ></SelectField>
          </div>
          <div className={styles.setting}>
            <span>Font Size </span>
            <NumberInput
              startNumber={item.design_settings.legendFontSize}
              handleNumberChange={legendFontSize}
            ></NumberInput>
          </div>
        </div>
      )}
    </>
  );
};
