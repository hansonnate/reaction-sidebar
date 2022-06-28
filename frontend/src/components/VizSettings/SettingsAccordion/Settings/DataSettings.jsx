// import { NumberInput } from "components/inputs/input_fields/NumberInput/NumberInput";
// import { ToggleSwitch } from "components/inputs/input_fields/ToggleSwitch/ToggleSwitch";
import { SelectField } from "components/inputs";
import React, { useState } from "react";
import styles from "../SettingsAccordion.module.scss";

//custom accordian
export const DataSettings = ({ item, title, questions, handleChartData, index }) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility((v) => !v);
  };

  const options = [
    { value: "linechart", label: "Line Chart" },
    { value: "horizontalbarchart", label: "Horizontal Bar Chart" },
    { value: "verticalbarchart", label: "Vertical Bar Chart" },
    { value: "doughnutchart", label: "Doughnut Chart" },
    { value: "numbercount", label: "Answer Count" },
  ];

  //this is a list of all the fields of the participants
  const filterOptions = [
    { value: "bynone", label: "None" },
    { value: "byproduct", label: "Product" },
    { value: "bydoctor", label: "Doctor" },
    { value: "bylocation", label: "Location" },
    { value: "byposition", label: "Position" },
    { value: "byname", label: "Name" },
  ];

  const questionOptions = [];
  questions.map((question) => {
    let option = { value: question.id, label: question.titleLabel };
    questionOptions.push(option);
  });

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
          <div className={styles.settingwithlabel}>
            <span>Data</span>
            <SelectField
              defaultValue={item.type}
              onChange={(e) => {
                console.log(e);
                handleChartData(e, index);
              }}
              options={questionOptions}
              placeholder="Select..."
            ></SelectField>
          </div>
          <div className={styles.settingwithlabel}>
            <span>Chart Type</span>
            <SelectField
              defaultValue={item.type}
              onChange={(value) => {
                item.type = value;
              }}
              options={options}
              placeholder={item.type}
            ></SelectField>
          </div>
          <div className={styles.settingwithlabel}>
            <span>Filter By</span>
            <SelectField
              // defaultValue={}
              // onChange={(value) => {
              //   item.type = value;
              // }}
              options={filterOptions}
              placeholder="Select..."
            ></SelectField>
          </div>
        </div>
      )}
    </>
  );
};

