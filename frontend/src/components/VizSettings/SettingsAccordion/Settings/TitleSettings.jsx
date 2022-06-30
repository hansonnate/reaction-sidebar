import { NumberInput } from "components/inputs/input_fields/NumberInput/NumberInput";
import { ToggleSwitch } from "components/inputs/input_fields/ToggleSwitch/ToggleSwitch";
import { SelectField, TextField } from "components/inputs";
import React, { useState } from "react";
import styles from "../SettingsAccordion.module.scss";

//custom accordian
export const TitleSettings = ({ item, title }) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility((v) => !v);
  };
  const titleFontSize = (value) => {
    item.design_settings.titleFontSize = value;
  };

  const handleHasTitle = () => {
    item.design_settings.hasTitle = !item.design_settings.hasTitle;
  };

  const alignmentOptions = [
    { value: "start", label: "Start" },
    { value: "center", label: "Center" },
    { value: "end", label: "End" },
  ];
  // const alignmentOptions = [
  //   { value: "right", label: "Right" },
  //   { value: "center", label: "Center" },
  //   { value: "left", label: "Left" },
  // ];
  function textFieldChange(value) {
    item.titleLabel = value;
  }

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
            <span>Title</span>
            <ToggleSwitch
              startChecked={item.design_settings.hasTitle}
              handleCheck={handleHasTitle}
            ></ToggleSwitch>
          </div>
          <div className={styles.settingwithlabel}>
            <span>Title Name</span>
            <TextField
              onSave={textFieldChange}
              value = {item.titleLabel}
            ></TextField>
          </div>
          <div className={styles.settingwithlabel}>
            <span>Alignment</span>
            <SelectField
              onChange={(value) => {
                item.design_settings.titleAlignment = value;
              }}
              options={alignmentOptions}
            ></SelectField>
          </div>
          <div className={styles.setting}>
            <span>Font Size </span>
            <NumberInput
              startNumber={item.design_settings.titleFontSize}
              handleNumberChange={titleFontSize}
            ></NumberInput>
          </div>
        </div>
      )}
    </>
  );
};
