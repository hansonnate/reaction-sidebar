import { SelectField, TextField } from "components/inputs";
import React from "react";
import { useParams } from "react-router-dom";

import styles from "./EditQuestionDialog.module.scss";
import { ToggleSwitch } from "components/inputs/input_fields/ToggleSwitch/ToggleSwitch";
import { useUpdateQuestion } from "api/resources/projects/questions";

export const EditQuestionDialog = ({ question, onTypeChange }) => {
  const { id } = useParams();
  const updateQuestionQuery = useUpdateQuestion(id);

  const questionTypes = {
    MultipleChoice: { label: "Multiple Choice", value: "MultipleChoice" },
    Text: { label: "Text", value: "Text" },
    NumberScale: { label: "Number Scale", value: "NumberScale" },
    NumberSlider: { label: "Number Slider", value: "NumberSlider" },
    Ranking: { label: "Ranking", value: "Ranking" },
    Matrix: { label: "Matrix", value: "Matrix" },
  };

  const handleMultiSelectToggle = () => {
    updateQuestionQuery.mutate({
      id: question.id,
      isMultiSelect: !question.isMultiSelect,
    });
  };

  const handleOtherOptionToggle = () => {
    updateQuestionQuery.mutate({
      id: question.id,
      otherOption: !question.otherOption,
      otherOptionText: ""
    });
  };

  const handleNaOptionToggle = () => {
    updateQuestionQuery.mutate({
      id: question.id,
      naOption: !question.naOption,
    });
  };

  const handleRandomizeOptionsToggle = () => {
    updateQuestionQuery.mutate({
      id: question.id,
      isRandomized: !question.isRandomized,
    });
  };

  const handleMinChange = (min) => {
    updateQuestionQuery.mutate({
      id: question.id,
      min: min,
    });
  };

  const handleMaxChange = (max) => {
    updateQuestionQuery.mutate({
      id: question.id,
      max: max,
    });
  };

  const handleStepChange = (step) => {
    updateQuestionQuery.mutate({
      id: question.id,
      step: step,
    });
  };

  return (
    <>
      {question != null && (
        <div className={`${styles.dialog}`}>
          <SelectField
            options={Object.values(questionTypes)}
            value={questionTypes[question.type]}
            handleSelection={onTypeChange}
          />

          {/* Other Option Toggle */}
          {question.type === "MultipleChoice" && (
            <>
              <div className="d-flex flex-row mt-3 align-items-center">
                <ToggleSwitch
                  handleCheck={handleMultiSelectToggle}
                  startChecked={question.isMultiSelect}
                />
                <p className={styles.label}>Select Multiple</p>
              </div>
              {question.isMultiSelect && (
                <div className="d-flex row w-40 align-items-center">
                  Max Selections
                  <TextField placeholder="Max" />
                </div>
              )}
            </>
          )}

          {/* Other Option Toggle */}
          {(question.type === "MultipleChoice" ||
            question.type === "Ranking") && (
            <div className="d-flex flex-row mt-3 align-items-center">
              <ToggleSwitch
                handleCheck={handleOtherOptionToggle}
                startChecked={question.otherOption}
              />
              <p className={styles.label}>Other Option</p>
            </div>
          )}

          {/* Randomize Options Toggle */}
          {(question.type === "MultipleChoice" ||
            question.type === "Ranking") && (
            <div className="d-flex flex-row mt-3 align-items-center">
              <ToggleSwitch
                handleCheck={handleRandomizeOptionsToggle}
                startChecked={question.isRandomized}
              />
              <p className={styles.label}>Randomize answers</p>
            </div>
          )}

          {/* NA Option Toggle */}
          <div className="d-flex flex-row mt-3 align-items-center">
            <ToggleSwitch
              handleCheck={handleNaOptionToggle}
              startChecked={question.naOption}
            />
            <p className={styles.label}>NA Option</p>
          </div>

          {/* Num scale min, max, and step */}
          {(question.type === "NumberScale" || question.type === "NumberSlider") && (
            <>
              <div className="d-flex flex-row mt-3 align-items-center">
                <div className="mr-1">
                  <TextField value={question.min} placeholder="Min" onSave={handleMinChange} />
                </div>
                <div className="ml-1">
                  <TextField value={question.max} placeholder="Max" onSave={handleMaxChange} />
                </div>
              </div>
              <div className="d-flex flex-row mt-2 align-items-center">
                <TextField value={question.step} placeholder="Step" onSave={handleStepChange} />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
