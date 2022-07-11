import React, { useState } from "react";
import styles from "./UGAccordion.module.scss";

//custom accordian
const AccordionItem = ({ item, children }) => {
  const [visibility, setVisibility] = useState(false);
  // eslint-disable-next-line
  // const [permissions, setPermissions] = useState(item);

  const toggleVisibility = () => {
    setVisibility((v) => !v);
  };

  // const handleChange = (key) => {
  //   let array = permissions;
  //   array[key] = !array[key];
  //   setPermissions(array);
  // }

  return (
    <>
      <div
        key={item.name}
        className={`${styles.header} ${
          visibility ? styles.accordionactive : ""
        }`}
        onClick={toggleVisibility}
      >
        {item.name}
        <span className={styles.accordionicon}>
          <i className="bi bi-chevron-left"></i>
        </span>
      </div>
      {visibility && (
        <div className={styles.body}>
          {/* {console.log(item)} */}
          {children}
          {/* {Object.keys(item).map((key) => (
            <div key={key}>
              {key !== "name" && (
                <>
                  <input type="checkbox" checked={item[key] }></input><span>{key}</span>
                </>
              )}
            </div>
          ))} */}
        </div>
      )}
    </>
  );
};

export default AccordionItem;
