import React from "react";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";

//import styles from "./SelectField.module.scss";

const customStyles = {
  option: (provided) => ({
    ...provided,
    
    padding: 20,
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused || state.hover ? 'green' : '',
    boxShadow: "none"
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

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
      styles={customStyles}
      className={``}
      options={options}
      isMulti={selectMultiple}
      onChange={handleChange}
      onInputChange={handleInputChange}
      components={animatedComponents}
    />
  );
};
