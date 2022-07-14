// External
import React, { useState } from "react";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
// Internal
import styles from "./SelectField.module.scss";

const customStyles = {
  option: (provided) => ({
    ...provided,

    padding: 20,
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused || state.hover ? "green" : "",
    boxShadow: "none",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const animatedComponents = makeAnimated();

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
export const SelectField = ({
  options,
  defaultValue,
  selectMultiple,
  onChange,
  placeholder,
}) => {
  const value = () => {
    let values = [];
    if (defaultValue) {
    // console.log(selectMultiple);
    for (let i = 0; i < options.length; i++) {
      if (selectMultiple) {
        for (let j = 0; j < defaultValue.length; j++) {
          if (options[i].value === defaultValue[j]) {
            values.push(options[i]);
          }
        }
      } else {
        if (options[i].value === defaultValue) {
          values.push(options[i]);
        }
      }
    }
    if (values.length === 1) {
      values = values[0];
    }
  } 
    return values;
  };
  const [val, setVal] = useState(value);

  const handleChange = (option) => {
    setVal(option);
    if (onChange) {
      onChange(option.value);
    }
    // console.log(val);
  };

  return (
    <div className={styles.select}>
      <CreatableSelect
        styles={customStyles}
        className={``}
        options={options}
        value={val}
        isMulti={selectMultiple}
        onChange={handleChange}
        components={animatedComponents}
        placeholder={placeholder}
      />
    </div>
  );
};
