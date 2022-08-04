import { TextField, SelectFieldCustom } from "components/inputs";
import React from "react";
// import { useParams } from "react-router-dom";

import styles from "./EditQuestionDialog.module.scss";
import { ToggleSwitch } from "components/inputs/input_fields/ToggleSwitch/ToggleSwitch";
import {
  useDeleteQuestion,
  useUpdateQuestionConfig,
  useUpdateQuestionNAOption,
} from "api/resources/projects/questions";
import Button from "components/buttons/Button/Button";
// import { SelectFieldCustom } from "components/inputs/input_fields/SelectFieldCustom/SelectFieldCustom";

export const EditQuestionDialog = ({ question, onTypeChange, refetch }) => {
  // const { id } = useParams();
  const updateQuestionQuery = useUpdateQuestionConfig();
  const updateQuestionNAOption = useUpdateQuestionNAOption();
  const deleteQuestion = useDeleteQuestion();

  const questionTypes = {
    MultipleChoice: {
      label: "Multiple Choice",
      value: "MultipleChoice",
      icon: <i className="bi bi-list-check"></i>,
    },
    Text: {
      label: "Text",
      value: "Text",
      icon: <i className="bi bi-chat-left-text"></i>,
    },
    NumberScale: {
      label: "Number Scale",
      value: "NumberScale",
      icon: <i className="bi bi-123"></i>,
    },
    NumberSlider: {
      label: "Number Slider",
      value: "NumberSlider",
      icon: <i className="bi bi-sliders"></i>,
    },
    Ranking: {
      label: "Ranking",
      value: "Ranking",
      icon: <i className="bi bi-list-ol"></i>,
    },
    Matrix: {
      label: "Matrix",
      value: "Matrix",
      icon: <i className="bi bi-grid-3x3"></i>,
    },
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

  const handleDeleteQuestion = () => {
    deleteQuestion.mutate({
      id: question.id
    },
    {
      onSuccess: () => {
        refetch();
      },
    })
  }

  return (
    <>
      {question != null && (
        <div className={`${styles.dialog}`}>
          <SelectFieldCustom
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
              <p className={styles.label}>Include &quot;Other&quot; Option</p>
            </div>
          )}

          {/* NA Option Toggle */}
          <div className="d-flex flex-row mt-3 align-items-center">
            <ToggleSwitch
              handleCheck={handleNaOptionToggle}
              startChecked={question.naOption}
            />
            <p className={styles.label}>Include &quot;N/A&quot; Option</p>
          </div>

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

          <div className={styles.dialogButtons}>
            <Button width="110px" gray>
              <i className="bi bi-layers"></i> Duplicate
            </Button>
            <Button width="110px" red onClick={handleDeleteQuestion}>
              <i className="bi bi-trash"></i> Delete
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
