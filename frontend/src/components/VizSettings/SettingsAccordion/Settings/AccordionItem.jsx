import React, { useState } from "react";
import styles from "../SettingsAccordion.module.scss";

//custom accordian
const AccordionItem = ({ item, title }) => {
  const [visibility, setVisibility] = useState(false);
  const [dataLabels, setDataLabels] = useState(
    item.design_settings.hasDataLabels
  );

  const toggleVisibility = () => {
    setVisibility((v) => !v);
  };

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
        </div>
      )}
    </>
  );
};

export default AccordionItem;
