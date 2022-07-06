// import React, { useState } from "react";
import React from "react";
import styles from "./Accordion.module.scss";
// let i = 1;
// i += 1;
export const Accordion = (props) => {
  return (
    <div>
      <div className={styles.customaccordion}>
        {props.children}
      </div>
    </div>
  );
};
