// import React, { useState } from "react";
import React from "react";
import styles from "./Accordion.module.scss";
// let i = 1;
// i += 1;
const Accordion = (props) => {
  return (
    <div>
      <div className={styles.customaccordion}>
        {props.children}
      </div>
    </div>
  );
};




// const AccordionItem = ({ name, owner }) => {
//   const [visibility, setVisibility] = useState(false);

//   const toggleVisibility = () => {
//     setVisibility((v) => !v);
//   };
//   return (
//     <div
//       className={`${styles.card} ${visibility ? styles.accordionactive : ""}`}
//     >
//       <div className={styles.cardheader} onClick={toggleVisibility}>
//         {name}
//         <span className={styles.accordionicon}>▼</span>
//       </div>
//       <div className={styles.cardbody}>{owner}</div>
//     </div>
//   );
// };

export default Accordion;
