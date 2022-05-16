import React from "react";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";

// import styles from "./SelectField.module.scss";

const animatedComponents = makeAnimated();

export const SelectField = ({
  options,
  selectMultiple,
  //   autosave = false,
}) => {
  const handleChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  const handleInputChange = (inputValue, actionMeta) => {
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  return (
    <CreatableSelect
      options={options}
      isMulti={selectMultiple}
      onChange={handleChange}
      onInputChange={handleInputChange}
      components={animatedComponents}
    />
  );
};
