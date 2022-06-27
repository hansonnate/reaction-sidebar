import React, { useState } from "react";
import { TextField } from "..";
import styles from "./MultipleChoice.module.scss";

export const MultipleChoice = ({
  name,
  options,
  handleNameChange,
  handleChoiceChange,
  handleDelete,
  active,
  isMultiSelect,
  otherOption,
}) => {
  const [selected, setSelected] = useState();

  const handleOptionChange = (e) => {
    setSelected(e.target.value);
    if (handleChoiceChange) {
      handleChoiceChange(selected);
    }
  };

  const handleChoiceNameChange = (value, id) => {
    handleNameChange({ id: id, name: value });
  };

  const handleDeleteChoice = (id) => {
    handleDelete(id);
  };

  return (
    <>
      {options.map((option) => (
        <div key={option.id} className="d-flex mb-2">
          {!isMultiSelect && (
            <label className={styles.container}>
              <input
                id={option.id}
                type="radio"
                name={name}
                value={option.name}
                onChange={handleOptionChange}
              />
              <span className={styles.checkmark}></span>
            </label>
          )}
          {isMultiSelect && (
            <label className={styles.container}>
              <input
                id={option.id}
                type="checkbox"
                name={name}
                value={option.name}
                onChange={handleOptionChange}
              />
              <span className={`${styles.checkmark} ${styles.multi}`}></span>
            </label>
          )}
          <div className="flex-grow-1">
            <TextField
              value={option.name}
              placeholder="Enter choice text"
              onSave={(val) => handleChoiceNameChange(val, option.id)}
              inactive={!active}
            />
          </div>
          {active && (
            <div
              className={styles.deleteButton}
              onClick={handleDeleteChoice.bind(null, option.id)}
            >
              <i className="bi bi-dash-circle"></i>
            </div>
          )}
        </div>
      ))}
      {otherOption != null && (
        <div className="d-flex mb-2">
          {!isMultiSelect && (
            <label className={styles.container}>
              <input
                id={0}
                type="radio"
                name={name}
                value={"Other"}
                onChange={handleOptionChange}
              />
              <span className={styles.checkmark}></span>
            </label>
          )}
          {isMultiSelect && (
            <label className={styles.container}>
              <input
                id={0}
                type="checkbox"
                name={name}
                value={"Other"}
                onChange={handleOptionChange}
              />
              <span className={`${styles.checkmark} ${styles.multi}`}></span>
            </label>
          )}
          <div className="flex-grow-1">
            <TextField
              value={otherOption}
              placeholder="Enter other option placeholder"
              onSave={(val) => handleChoiceNameChange(val, 0)}
              inactive={!active}
            />
          </div>
        </div>
      )}
    </>
  );
};
