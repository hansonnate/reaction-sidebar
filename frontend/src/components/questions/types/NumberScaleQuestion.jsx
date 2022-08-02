import React from "react";
import { NumChoices } from "components/inputs/input_fields/NumChoices/NumChoices";
import { TextField } from "components/inputs";
import { useUpdateQuestionConfig } from "api/resources/projects/questions";

export const NumberScaleQuestion = ({ question, active }) => {
  const updateQuestionQuery = useUpdateQuestionConfig();

  const showMinDescription = () => {
    return question.minDescription || active;
  };

  const showMaxDescription = () => {
    return question.maxDescription || active;
  };

  const handleMinDescriptionChange = (min) => {
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

  const handleMaxDescriptionChange = (max) => {
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
  return (
    <>
      <div className="d-flex mb-3">
        <NumChoices
          value={0}
          min={Number(question.question_type_config.scale_question.min)}
          max={Number(question.question_type_config.scale_question.max)}
          step={Number(question.question_type_config.scale_question.step)}
        />
      </div>

      <div className="d-flex justify-content-between">
        <div className="w-60 mr-3">
          {showMinDescription() && (
            <TextField
              value={
                question.question_type_config.scale_question.min_description
              }
              placeholder={"Min Description"}
              inactive={!active}
              onSave={handleMinDescriptionChange}
            />
          )}
        </div>
        <div className="w-60 ml-3">
          {showMaxDescription() && (
            <TextField
              value={
                question.question_type_config.scale_question.max_description
              }
              placeholder={"Max Description"}
              inactive={!active}
              align="right"
              onSave={handleMaxDescriptionChange}
            />
          )}
        </div>
      </div>
    </>
  );
};
