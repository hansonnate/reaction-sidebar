import { NumberInput } from "components/inputs/input_fields/NumberInput/NumberInput";
import { ToggleSwitch } from "components/inputs/input_fields/ToggleSwitch/ToggleSwitch";
import { SelectField } from "components/inputs";
import React, { useState } from "react";
import styles from "../SettingsAccordion.module.scss";

//custom accordian
export const DataLabelSettings = ({ item, title }) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility((v) => !v);
  };
  const dataLabelFontSize = (value) => {
    item.design_settings.dataLabelFontSize = value;
  };
  const handleSignificantFigures = (value) => {
    console.log(value);
    item.design_settings.dataLabelSigFig = value;
  };

  const handleHasDataLabels = () => {
    item.design_settings.hasDataLabels = !item.design_settings.hasDataLabels;
  };
  const handleDataLabelPercentages= () => {
    item.design_settings.dataLabelPercentages = !item.design_settings.dataLabelPercentages;
  };

  const positionOptions = [
    { value: "start", label: "Start" },
    { value: "center", label: "Center" },
    { value: "end", label: "End" },
  ];
  const alignmentOptions = [
    { value: "right", label: "Right" },
    { value: "center", label: "Center" },
    { value: "left", label: "Left" },
  ];

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
            <span>Data Labels</span>
            <ToggleSwitch
              startChecked={item.design_settings.hasDataLabels}
              handleCheck={handleHasDataLabels}
            ></ToggleSwitch>
          </div>
          <div className={styles.setting}>
            <span>Percentages</span>
            <ToggleSwitch
              startChecked={item.design_settings.dataLabelPercentages}
              handleCheck={handleDataLabelPercentages}
            ></ToggleSwitch>
          </div>
          <div className={styles.settingwithlabel}>
            <span>Position</span>
            <SelectField
              onChange={(value) => {
                item.design_settings.dataLabelPosition = value;
              }}
              options={positionOptions}
            ></SelectField>
          </div>
          <div className={styles.settingwithlabel}>
            <span>Alignment</span>
            <SelectField
              onChange={(value) => {
                item.design_settings.dataLabelAlignment = value;
              }}
              options={alignmentOptions}
            ></SelectField>
          </div>
          <div className={styles.setting}>
            <span>Font Size </span>
            <NumberInput
              startNumber={item.design_settings.dataLabelFontSize}
              handleNumberChange={dataLabelFontSize}
            ></NumberInput>
          </div>
          <div className={styles.setting}>
            <span>Sig Figs </span>
            <NumberInput
              startNumber={item.design_settings.dataLabelSigFig}
              handleNumberChange={handleSignificantFigures}
            ></NumberInput>
          </div>
        </div>
      )}
    </>
  );
};
