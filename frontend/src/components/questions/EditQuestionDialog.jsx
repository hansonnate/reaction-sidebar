import { SelectField, TextField } from "components/inputs";
import React from "react";
// import { useParams } from "react-router-dom";

import styles from "./EditQuestionDialog.module.scss";
import { ToggleSwitch } from "components/inputs/input_fields/ToggleSwitch/ToggleSwitch";
import {
  useUpdateQuestionConfig,
  useUpdateQuestionNAOption,
} from "api/resources/projects/questions";

export const EditQuestionDialog = ({ question, onTypeChange, refetch }) => {
  // const { id } = useParams();
  const updateQuestionQuery = useUpdateQuestionConfig();
  const updateQuestionNAOption = useUpdateQuestionNAOption();

  const questionTypes = {
    MultipleChoice: { label: "Multiple Choice", value: "MultipleChoice" },
    Text: { label: "Text", value: "Text" },
    NumberScale: { label: "Number Scale", value: "NumberScale" },
    NumberSlider: { label: "Number Slider", value: "NumberSlider" },
    Ranking: { label: "Ranking", value: "Ranking" },
    Matrix: { label: "Matrix", value: "Matrix" },
  };

  const handleMultiSelectToggle = (isMulti) => {
    updateQuestionQuery.mutate(
      {
        id: question.id,
        question_type_config: {
          choice_question: {
            isMultiSelect: !isMulti,
            isRandomized:
              question.question_type_config.choice_question.isRandomized,
            hasOtherOption:
              question.question_type_config.choice_question.hasOtherOption,
            otherOptionText:
              question.question_type_config.choice_question.otherOptionText,
            choices: question.question_type_config.choice_question.choices,
          },
        },
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleOtherOptionToggle = (hasOther) => {
    updateQuestionQuery.mutate(
      {
        id: question.id,
        question_type_config: {
          choice_question: {
            isMultiSelect:
              question.question_type_config.choice_question.isMultiSelect,
            isRandomized:
              question.question_type_config.choice_question.isRandomized,
            hasOtherOption: !hasOther,
            otherOptionText:
              question.question_type_config.choice_question.otherOptionText,
            choices: question.question_type_config.choice_question.choices,
          },
        },
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleNaOptionToggle = () => {
    updateQuestionNAOption.mutate({
      id: question.id,
      naOption: !question.naOption,
    });
  };

  const handleRandomizeOptionsToggle = (isRandomized) => {
    updateQuestionQuery.mutate({
      id: question.id,
      question_type_config: {
        choice_question: {
          isMultiSelect:
            question.question_type_config.choice_question.isMultiSelect,
          isRandomized: !isRandomized,
          hasOtherOption:
            question.question_type_config.choice_question.hasOtherOption,
          otherOptionText:
            question.question_type_config.choice_question.otherOptionText,
          choices: question.question_type_config.choice_question.choices,
        },
      },
    });
  };

  const handleMinChange = (min) => {
    updateQuestionQuery.mutate({
      id: question.id,
      question_type_config: {
        scale_question: {
          min: min,
          max: question.question_type_config.scale_question.max,
          min_description:
            question.question_type_config.scale_question.min_description,
          max_description:
            question.question_type_config.scale_question.max_description,
          step: question.question_type_config.scale_question.step,
        },
      },
    });
  };

  const handleMaxChange = (max) => {
    updateQuestionQuery.mutate({
      id: question.id,
      question_type_config: {
        scale_question: {
          min: question.question_type_config.scale_question.min,
          max: max,
          min_description:
            question.question_type_config.scale_question.min_description,
          max_description:
            question.question_type_config.scale_question.max_description,
          step: question.question_type_config.scale_question.step,
        },
      },
    });
  };

  const handleStepChange = (step) => {
    updateQuestionQuery.mutate({
      id: question.id,
      question_type_config: {
        scale_question: {
          min: question.question_type_config.scale_question.min,
          max: question.question_type_config.scale_question.max,
          min_description:
            question.question_type_config.scale_question.min_description,
          max_description:
            question.question_type_config.scale_question.max_description,
          step: step,
        },
      },
    });
  };

  return (
    <>
      {question != null && (
        <div className={`${styles.dialog}`}>
          <SelectField
            options={Object.values(questionTypes)}
            value={questionTypes[question.type]}
            onChange={onTypeChange}
          />

          {/* isMulti Option Toggle */}
          {question.type === "MultipleChoice" && (
            <>
              <div className="d-flex flex-row mt-3 align-items-center">
                <ToggleSwitch
                  handleCheck={handleMultiSelectToggle}
                  startChecked={
                    question.question_type_config.choice_question.isMultiSelect
                  }
                />
                <p className={styles.label}>Select Multiple</p>
              </div>
              {question.question_type_config.choice_question.isMultiSelect && (
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
                startChecked={
                  question.question_type_config.choice_question.hasOtherOption
                }
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
                startChecked={
                  question.question_type_config.choice_question.isRandomized
                }
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
          {(question.type === "NumberScale" ||
            question.type === "NumberSlider") && (
            <>
              <div className="d-flex flex-row mt-3 align-items-center">
                <div className="mr-1">
                  <TextField
                    value={question.question_type_config.scale_question.min}
                    placeholder="Min"
                    onSave={handleMinChange}
                  />
                </div>
                <div className="ml-1">
                  <TextField
                    value={question.question_type_config.scale_question.max}
                    placeholder="Max"
                    onSave={handleMaxChange}
                  />
                </div>
              </div>
              <div className="d-flex flex-row mt-2 align-items-center">
                <TextField
                  value={question.question_type_config.scale_question.step}
                  placeholder="Step"
                  onSave={handleStepChange}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
