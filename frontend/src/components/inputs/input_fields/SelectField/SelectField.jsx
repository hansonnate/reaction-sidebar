// External
import React from "react";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
// Internal
//import styles from "./SelectField.module.scss";

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
 * @property {boolean} selectMultiple: Whether users should be able to select multiple items
 * @returns {React.ReactElement} Select Field
 *
 * @example
 * <SelectField options={options} selectMultiple={false} />
 */
export const SelectField = ({
  options,
  value,
  selectMultiple,
  handleSelection
  //   autosave = false,
}) => {
  const handleChange = (option, actionMeta) => {
    console.log(option.value)
    handleSelection(option.value);
    console.log(actionMeta);
  };
  const handleInputChange = (inputValue) => {
    console.log("inputValue=" + inputValue)
  };

  //console.log(options);
  //console.log(value);

  return (
    <CreatableSelect
      styles={customStyles}
      className={``}
      options={options}
      value={value}
      isMulti={selectMultiple}
      onChange={handleChange}
      onInputChange={handleInputChange}
      components={animatedComponents}
    />
  );
};
