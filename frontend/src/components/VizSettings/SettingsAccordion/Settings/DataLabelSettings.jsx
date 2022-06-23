import React, { useState } from "react";
import styles from "../SettingsAccordion.module.scss";

//custom accordian
export const DataLabelSettings = ({ item, title }) => {
  const [visibility, setVisibility] = useState(false);
  const [dataLabels, setDataLabels] = useState(
    item.design_settings.hasDataLabels
  );
  const [dataLabelsFontSize, setDataLabelsFontSize] = useState(
    item.design_settings.dataLabelFontSize
  );
  

  const toggleVisibility = () => {
    setVisibility((v) => !v);
  };
  const dataLabelFontSize = (value) => {
    item.design_settings.dataLabelFontSize = value;
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
          {console.log(item)}
          {/* {Object.keys(item).map((key) => <div key={key}>
          {console.log(key)}
          <span>{item[key].toString()}</span>
        </div>)} */}
          <div className={styles.setting}>
            <span>Data Labels</span>
            <input
              type="checkbox"
              onChange={() => {
                setDataLabels(!dataLabels);
                item.design_settings.hasDataLabels =
                  !item.design_settings.hasDataLabels;
              }}
              checked={dataLabels}
            ></input>
          </div>
          <div className={styles.setting}>
            <span>Font Size: </span>
            <input
              type="number"
              onChange={(e) => {
                dataLabelFontSize(e.target.value)
                setDataLabelsFontSize(e.target.value)
              }}
              value={dataLabelsFontSize}
            ></input>
          </div>
        </div>
      )}
    </>
  );
};

