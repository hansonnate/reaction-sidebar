// External
import React, { useState } from "react";
// Internal
import styles from "./SelectFieldCustom.module.scss";

/**
 * A select input component
 * @class
 * @property {object} options: The options that will be in the select menu. Should be a list of objects with 'label' and 'value' attributes
 * @property {object} defaultValue: One of the options in the options list (object with 'label' and 'value' attributes)
 * @property {boolean} selectMultiple: Whether users should be able to select multiple items
 * @property {function} onChange: A function that will be called when the user changes the selection. The value of the option will be returned.
 * @returns {React.ReactElement} Select Field
 *
 * @example
 * <SelectField options={options} selectMultiple={false} />
 */
export const SelectFieldCustom = ({
  options,
  // defaultValue,
  value,
  // selectMultiple,
  onChange,
  // placeholder,
}) => {
  const [show, setShow] = useState(false);
  // const value = () => {
  //   let values = [];
  //   if (defaultValue) {
  //   // console.log(selectMultiple);
  //   for (let i = 0; i < options.length; i++) {
  //     if (selectMultiple) {
  //       for (let j = 0; j < defaultValue.length; j++) {
  //         if (options[i].value === defaultValue[j]) {
  //           values.push(options[i]);
  //         }
  //       }
  //     } else {
  //       if (options[i].value === defaultValue) {
  //         values.push(options[i]);
  //       }
  //     }
  //   }
  //   if (values.length === 1) {
  //     values = values[0];
  //   }
  // }
  //   return values;
  // };
  // const [val, setVal] = useState(value);

  const handleChange = (option) => {
    // setVal(option);
    if (onChange) {
      onChange(option.value);
    }
    // console.log(val);
  };
  return (
    <div className={styles.selectContainer}>
      <div className={styles.select} onClick={() => setShow(!show)}>
        <div className={styles.activeOption}>
          {value.icon}
          {value.value}
        </div>
        <i className="bi bi-chevron-down"></i>
      </div>
      {show && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <div key={value.value} className={`${styles.option} ${value === option ? styles.optionActive : ""}`} onClick={() => handleChange(option)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
